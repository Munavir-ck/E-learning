import express from 'express';
import dotenv from "dotenv";
import db from "./model/db_connection.js"
import cors from "cors"
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
import bodyParser from "body-parser"
const port = process.env.PORT
import user from "./routes/user.js"
import passport from 'passport';
import passportSetup from  "./utilities/passport.js"
import session from 'express-session';
import adminRouter from './routes/admin.js';
import tutorRouter from './routes/tutor.js';
import { instrument } from "@socket.io/admin-ui";

import flash from  "connect-flash"
import ffmpeg from 'fluent-ffmpeg';
import { Server } from "socket.io";

const app = express();

const server = app.listen(port,()=>{
    console.log(`server listening at http://127.0.0.1:${port}`);
});

const io = new Server(server, {
  cors: {
    origin:['http://localhost:3000','https://admin.socket.io'],
    credentials: true
  }
});

app.use(cors({
    origin: ['http://localhost:3000'],
    methods:["GET","POST"],
    credentials:true,
}))

app.use(express.static('media'))


db(()=>{})
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

  app.use(flash());
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({limit: '400kb'}));

app.use("/tutor",tutorRouter )
app.use("/admin",adminRouter )
app.use("/",user)

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();


io.on("connection", (socket) => {

  

    socket.on('student:initial-connection',({student_id})=>{
        
        console.log(student_id,'student initial connection success');
        socket.join(student_id)
      })

     
  socket.on('display-notification',({studentId})=>{
    console.log('display-notification');
    console.log(studentId,'this is room');
    io.to(studentId).emit('student:notification');
  })
  
 socket.on("room:joinchat",(data)=>{

  socket.emit("user:joined",data)
    // if (existingRooms.includes(data)) {
    //     socket.emit("roomAlreadyExists",data);
    //   } else {
    //     existingRooms.push(data);
    //             socket.join(data)
    //         io.to(data).emit("user:joined",data)
       
    //   }
 })

 socket.on("user:message",({data,studentId})=>{

  console.log(data,studentId,"user:messagecommmmmmmmmmmmm");
 
  socket.broadcast.emit("new:message",data)
 })


  socket.on("room:join", (data) => {
    console.log(data);
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

socket.on("user:chatInvideo",({to,chat})=>{
  console.log(chat);
  io.to(to).emit("user:displaychat", { to,chat });
  
})


  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});

instrument(io,{auth:false})

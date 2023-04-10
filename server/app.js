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

import flash from  "connect-flash"
import ffmpeg from 'fluent-ffmpeg';


const app = express();



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
app.listen(port,()=>{
    console.log(`server listening at http://127.0.0.1:${port}`);
});


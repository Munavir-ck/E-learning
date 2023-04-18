import React, { useEffect, useState, useMemo,useCallback} from "react";
import { GoVerified } from "react-icons/go";
import { GiCancel } from "react-icons/gi";
import { BsFillChatFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../axios/axios";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRoom} from "../../Store/Slice/socketSlice";
import {io} from 'socket.io-client'
import { useSelector } from 'react-redux'
import { useSocket } from "../../contex/socketProvider";
import { setTeacher } from "../../Store/Slice/teacherSlice";


const List_bookings = () => {
  const dispatch=useDispatch()
  const socket = useSocket();
  const [notification, setNotification] = useState(false);
  const navigate = useNavigate();

 
  const email = useSelector(state => state.student.email);
  const room = useSelector(state => state.room.room);


const handlechat=(studentId,teacherId)=>{

 
  socket.emit("room:joinchat",studentId)

  dispatch(
    setTeacher({
      teacherId:teacherId
    })
  )
}


const handlejoinChatRoom=(data)=>{
  navigate(`/chat_room/${data}`)
   }

   useEffect(() => {
    socket.on("roomAlreadyExists",handlejoinChatRoom);
    socket.on("user:joined",handlejoinChatRoom)

    return () => {
      socket.off("roomAlreadyExists",handlejoinChatRoom);
      socket.off("user:joined",handlejoinChatRoom)
    };
  }, [socket]);

 const handleOnclick=()=>{
       socket.emit('room:join',{email,room})  

      
      notification&&toast.error("ready")
     
   }


   console.log(notification,"my notify");

   const handleNotification=(data)=>{
    setNotification(true);
   
     toast.success("iam waitiiiiiiiiiiiiing")
    Notification.requestPermission().then(perm=>{

      if(perm === 'granted' ){

        const notification =   new Notification("Incoming Video call",{
          body:"You have a video call",
          icon:'assets/icons/help-question-svgrepo-com.svg',
          tag:'video call',
          vibrate: [200, 100, 200]
        })
        notification.addEventListener('click',()=>{
            
          // this.route.navigate(['/video-room',roomParams,user])
        })
      }

    })


   }
const handlejoinRoom=useCallback((data)=>{
  const{email,room}=data
  navigate(`/room/${room}`)
 
},[navigate])



useEffect(()=>{
  
  socket.on('student:notification',handleNotification)
  return ()=>{
    setNotification(false);
    socket.off('student:notification',handleNotification)
  } 
},[handleNotification])


useEffect(()=>{
  
  
  socket.on('room:join',handlejoinRoom) 
 

  return ()=>{
    socket.off('room:join',handlejoinRoom)
  }
})



  const [bookings, setBookings] = useState([]);
  const now = new Date();

  const currentTime = new Date(now.getTime());
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  const time =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0");
  const futureTime = new Date(now.getTime() + 10 * 60000);
  const future_hours = futureTime.getHours();
  const future_minutes = futureTime.getMinutes();
  console.log(time,"cuttern");
  const future_time =
    future_hours.toString().padStart(2, "0") +
    ":" +
    future_minutes.toString().padStart(2, "0");
  console.log(future_time,"future");
  useEffect(() => {
    axios
      .get("/get_bookings", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
       
        setBookings(res.data.result);
      });
  }, []);

  // bookings.map((item)=>{
  //   console.log(item.slot.startTime,"start time");
  //   console.log(time>item.slot.startTime&&time<item.slot.endTime);
  // })




  const handleActions = (slot_id, order_id) => {
    axios
      .post(
        "/cancel_booking",
        { slot_id, order_id },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          toast.success("Suuccefully Updated");
          let newObj = [];

          bookings.forEach((item) => {
            console.log(item);
            if (item._id === order_id) {
              console.log(3232323);
              if (item.slot._id === slot_id) {
                item.slot.booking_status = "Cancelled";
              }
            }
            newObj.push(item);
          });
          console.log(newObj);

          setBookings(newObj);
        }
      });

    console.log(slot_id, order_id);
  };
  return (
    <>
      <div id="app" className="bg-white">
        <div className="container mx-auto">
          <ToastContainer />
          <div className="py-20">
            <div className="flex items-center px-5 py-2">
              <span className="w-1/6 text-center">
                <input type="checkbox" />
              </span>
              <span className="w-1/2">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Teacher Info
                </span>
              </span>
              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Time
                </span>
              </span>
              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Date
                </span>
              </span>
              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Status
                </span>
              </span>
              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Fee
                </span>
              </span>
              <span className="w-1/4">
                <span className="text-xs uppercase text-gray-600 font-bold">
                  Actions
                </span>
              </span>
            </div>
            {bookings.map((item) => (
              <div className="hover:bg-mycolors cursor-pointer bg-white shadow flex p-5 items-center mb-5 rounded-lg">
                <div className="w-1/6 text-center">
                  <input type="checkbox" v-model="contact.selected" />
                </div>
                <div className="w-1/2">
                  <div className="flex items-center">
                    <img
                      className="rounded-full w-14"
                      src={
                        item.teacher[0].image
                          ? item.teacher[0].image
                          : "../../../avatar.png"
                      }
                    />
                    <div className="ml-4">
                      <span className="capitalize block text-gray-800 font-semibold">
                        {item.teacher[0].name}
                      </span>
                      <span className="text-sm block text-gray-600">
                        {item.teacher[0].subject}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-1/4">
                  <span className="capitalize w-10 text-white bg-green-800 rounded-md text-sm">
                    {item.slot.endTime}--{item.slot.startTime}
                  </span>
                </div>
                <div className="w-1/4">
                  <span className="capitalize text-gray-600 text-sm font-semibold">
                    {" "}
                    {moment(item.slot.date).format("MMMM Do YYYY")}
                  </span>
                </div>
                <div className="w-1/4">
                  <span className="text-gray-600 text-sm font-semibold">
                    {item.slot.booking_status}
                  </span>
                </div>
                <div className="w-1/4">
                  <span className="text-gray-600 text-sm">{item.amount}</span>
                </div>
                <div className="w-1/4">
                  <span className="text-gray-600 text-sm">
                    {" "}
                    {item.slot.booking_status === "Cancelled" ? (
                      <div></div>
                    ) : (
                    
                       
                       
                        (time>item.slot.startTime&&time<item.slot.endTime)? 
                          <button
                          onClick={()=>handleOnclick()}
                          className="bg-red-600">Join Now</button>: 
                          <button
                          className="hover:bg-zinc-700"
                          onClick={() => handleActions(item.slot._id, item._id)}
                          //   data-id={item.slot._id}
                          //   data-order_id={item._id}
                          //   data-value="decline"
                        >
                          <GiCancel size={20} color="red" />
                        </button>
                   
                        
                        
                      
                     
                    )}
                     <button onClick={()=>handlechat(item.student,item.teacher[0]._id)}>
                                <BsFillChatFill size={20} color="blue" />
                              </button>
                   
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default List_bookings;

import React, { useEffect, useState, useCallback } from "react";
import axios from "../../axios/axios";
import { GoVerified } from "react-icons/go";
import { GiCancel } from "react-icons/gi";
import { BsFillChatFill } from "react-icons/bs";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useSocket } from "../../contex/socketProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setRoom } from "../../Store/Slice/socketSlice";
import { setStudentId } from "../../Store/Slice/studentIdSlice";

function Booking_list() {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const socket = useSocket();
  const navigate = useNavigate();
  const email = useSelector((state) => state.tutor.email);

  const now = new Date();

  const currentTime = new Date(now.getTime());
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  const time =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0");


    const handlechat=(studentId)=>{


      socket.emit("room:joinchat",studentId)
      dispatch(
        setStudentId({
          studentId:studentId
        })
      )
    }
    
    
    const handlejoinChatRoom=(data)=>{
      navigate(`/chat_room_tutor/${data}`)
       }


    
       useEffect(() => {
        socket.on("roomAlreadyExists",handlejoinChatRoom);
        socket.on("user:joined",handlejoinChatRoom)
    
        return () => {
          socket.off("roomAlreadyExists",handlejoinChatRoom);
          socket.off("user:joined",handlejoinChatRoom)
        };
      }, [socket]);
  

  const handleOnclick = (studentId) => {



    const room = studentId
    console.log(room,2222);
    // dispatch(
    //   setRoom({
    //     room: room,
    //   })
    // );

    socket.emit("room:join", { email,room });
    socket.emit("display-notification", { studentId }, studentId);
  };

  const handlejoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handlejoinRoom);
   

    return () => {
      socket.off("room:join", handlejoinRoom);
   
    };
  }, [socket]);

  useEffect(() => {
    axios
      .get("/tutor/get_bookings", {
        headers: {
          Authorization: localStorage.getItem("tutortoken"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setBookings(res.data.result);
      });
  }, []);

  const handleActions = (e) => {
    const order_id = e.currentTarget.dataset.order_id;

    const value = e.currentTarget.dataset.value;

    const slot_id = e.currentTarget.dataset.id;

    console.log(order_id, value, slot_id);

    axios
      .post(
        "/tutor/booking_actions",
        { value, order_id, slot_id },
        {
          headers: {
            Authorization: localStorage.getItem("tutortoken"),
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
              if (item.slot._id === slot_id) {
                item.slot.booking_status =
                  item.slot.booking_status === "success" ? "failed" : "success";
              }
            }
            newObj.push(item);
          });
          console.log(newObj);

          setBookings(newObj);
        }
      });
  };
  // bookings.map((item) => {
  //   console.log(item.slot.booking_status, "start time");
  //   console.log(time > item.slot.startTime && time < item.slot.startTime);
  // });

 
  return (
    <div className="h-screen overflow-y-auto">
      <div className="bg-white p-8 rounded-md w-full">
        <ToastContainer />
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold">Products Oder</h2>
            <span className="text-xs">All products item</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex bg-gray-50 items-center p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                className="bg-gray-50 outline-none ml-1 block "
                type="text"
                name=""
                id=""
                placeholder="search..."
              />
            </div>
            <div className="lg:ml-40 ml-10 space-x-8">
              <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                New Report
              </button>
              <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                Create
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Slot
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created at
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Booking Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((items) => {
                    return (
                      <tr>
                        <td className="px-5 py-5 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-full h-full rounded-full"
                                src="https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {items.student[0].name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {items.slot.endTime}--{items.slot.startTime}
                          </p>
                        </td>
                        <td className="px-5 py-5 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {items.slot.date}
                          </p>
                        </td>
                        <td className="px-5 py-5 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">
                              {items.slot.booking_status}
                            </span>
                          </span>
                        </td>
                        <td className="px-5 py-5 bg-white text-sm flex justify-around">
                          {time > items.slot.startTime &&
                          time < items.slot.endTime &&
                          items.slot.booking_status !== "Cancelled" ? (
                            <button
                              onClick={() =>
                                handleOnclick(items.student[0]._id)
                              }
                              className="bg-green-700"
                            >
                              Join
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={handleActions}
                                data-id={items.slot._id}
                                data-order_id={items._id}
                                data-value="accept"
                              >
                                <GoVerified size={20} color="green" />
                              </button>

                              <button
                                onClick={handleActions}
                                data-id={items.slot._id}
                                data-order_id={items._id}
                                data-value="decline"
                              >
                                <GiCancel size={20} color="red" />
                              </button>
                              <button onClick={()=>handlechat(items.student[0]._id)}>
                                <BsFillChatFill size={20} color="blue" />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* <div
						className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
						<span className="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 4 of 50 Entries
                        </span>
						<div className="inline-flex mt-2 xs:mt-0">
							<button
                                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                Prev
                            </button>
							&nbsp; &nbsp;
							<button
                                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                Next
                            </button>
						</div>
					</div> */}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking_list;

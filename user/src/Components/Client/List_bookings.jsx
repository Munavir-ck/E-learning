import React, { useEffect, useState } from "react";
import { GoVerified } from "react-icons/go";
import { GiCancel } from "react-icons/gi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../axios/axios";
import moment from "moment";

const List_bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("/get_bookings", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setBookings(res.data.result);
      });
  }, []);

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

        if(res.data.status){

           
            toast.success("Suuccefully Updated");
            let newObj = [];
           
            bookings.forEach((item) => {
              console.log(item);
              if (item._id === order_id) {
                console.log(3232323);
                if (item.slot._id === slot_id) {
                
                    item.slot.booking_status = "Cancelled" 
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
            <ToastContainer/>
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

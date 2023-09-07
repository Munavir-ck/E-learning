import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";

function DayReport() {
  const [todayTotal, setTodayTotal] = useState(0);
  const [todaySlots, setTodaySlot] = useState(0);
  const [booking, setBooking] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    axios
      .get("/tutor/get_report", {
        headers: {
          Authorization: localStorage.getItem("tutortoken"),
        },

        params: {
          selectedDate,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTodayTotal(res.data.totalAmount);
        setTodaySlot(res.data.totalSlot);
        setBooking(res.data.totalOrder);
      });
  }, [selectedDate]);

  return (
    <div className="container mx-auto mt-12">
      <div className="relative mt-4 w-56">
        <DatePicker
          maxDate={new Date()}
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          className="w-full text-gray-700 py-2 px-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 truncate">
            <div className="relative mt-4 w-56"></div>
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">
            ${todayTotal}
          </div>
        </div>
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 truncate">
            Today Booking
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">
            {booking}
          </div>
        </div>
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 truncate">
            Total Slots Booked
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">
            {todaySlots}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DayReport;

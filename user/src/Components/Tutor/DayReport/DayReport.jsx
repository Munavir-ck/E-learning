import React, { useEffect, useState } from 'react'
import axios from "../../../axios/axios"

function DayReport() {

    const[todayTotal,setTodayTotal]=useState(20)
    const[todaySlots,setTodaySlot]=useState(499)
    const[booking,setBooking]=useState(599)


useEffect(()=>{

    axios.get( "/tutor/get_dailyReport",{
        headers: {
          Authorization: localStorage.getItem("tutortoken"),
        },
      }).then((res)=>{
        console.log(res.data);
        setTodayTotal(res.data.totalAmount)
        setTodaySlot(res.data.totalSlot)
        setBooking(res.data.totalOrder)

    })


},[])




  return (
   
      <div className="container mx-auto mt-12">
                <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Today Profit
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
   
  )
}

export default  DayReport
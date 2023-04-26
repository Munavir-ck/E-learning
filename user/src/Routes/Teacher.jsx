import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import TutorHome from "../pages/Tutor/TutorHome";
import TeacherLogin from "../Components/Tutor/TeacherLogin";
import TutorProfilePage from "../pages/Tutor/TutorProfilePage";
import Time_managePage from "../pages/Tutor/Time_managePage";
import BookingList_page from "../pages/Tutor/BookingList_page";
import ChatRoomTutorPage from "../pages/Tutor/ChatRoomPage";
import RoomPage from "../Components/screen/Room";



function Teacher() {
  const teacherToken = localStorage.getItem("tutortoken");


  return (
    <>
      <Routes>
        <Route  path="/tutor" element={ <TeacherLogin />} />

        <Route path="/tutor/home" element={teacherToken?<TutorHome />:<Navigate to={"/tutor"}/>} />
        <Route  path="/tutor/profile" element={teacherToken?<TutorProfilePage />:<Navigate to={"/tutor"}/> } />

        <Route path="/tutor/manage_time" element={teacherToken? <Time_managePage />:<Navigate to={"/tutor"}/>} />
        <Route path="/tutor/booking_list" element={teacherToken?<BookingList_page />:<Navigate to={"/tutor"}/>} />
        <Route path="/chat_room_tutor/:id" element={teacherToken?<ChatRoomTutorPage />:<Navigate to={"/tutor"}/>} />
      </Routes>
    </>
  );
}

export default Teacher;

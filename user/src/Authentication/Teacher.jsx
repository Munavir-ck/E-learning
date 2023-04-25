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
  const teacherToken = Boolean(localStorage.getItem("tutortoken"));
  console.log(teacherToken);

  

  return (
    <>
      <Routes>
        <Route exact path="/tutor" element={<TeacherLogin />} />

        <Route
          path="/tutor/home"
          element= {<TutorHome />}
        />
        <Route
          exact
          path="/tutor/profile"
          element={
            <TutorProfilePage /> 
          }
        />

        <Route
          path="/tutor/manage_time"
          element={
            <Time_managePage /> 
          }
        />
        <Route
          path="/tutor/booking_list"
          element={
         <BookingList_page />
          }
        />
        <Route
          path="/chat_room_tutor/:id"
          element={
           <ChatRoomTutorPage />  
          }
        />
   
      </Routes>
    </>
  );
}

export default Teacher;

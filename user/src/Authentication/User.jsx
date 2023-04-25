import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Client/Home";
import Demo_classes from "../pages/Client/Demo_classes";
import TeachersPage from "../pages/Client/TeachersPage";
import Login from "../Components/Client/Login";
import Signup from "../Components/Client/Signup";
import Book_teachers from "../pages/Client/Book_teachers";
import ChatPage from "../pages/Client/ChatPage";
import RoomPage from "../Components/screen/Room";
import List_booking_page from "../pages/Client/List_booking_page";
import TeacherDetailPage from "../pages/Client/TeacherDetailPage";
import ReservationPage from "../pages/Client/ReservationPage";
import Profile_page from "../pages/Client/Profile_page";

function User() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classes" element={<Demo_classes />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/book_teacher" element={<Book_teachers />} />
        <Route path="/profile" element={<Profile_page />} />
        <Route path="/teacher_details/:id" element={<TeacherDetailPage />} />
        <Route path="/reservation/:id" element={<ReservationPage />} />
        <Route path="/list_booking" element={<List_booking_page />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="/chat_room/:id" element={<ChatPage />} />
      </Routes>
    </>
  );
}

export default User;

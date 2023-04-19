
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import { useSocket } from "../src/contex/socketProvider";
import './App.css';
import { useState,useEffect } from 'react';
import Home from './pages/Client/Home';
import Demo_classes from './pages/Client/Demo_classes';
import  TeachersPage from './pages/Client/TeachersPage';
import Login from './Components/Client/Login';
import Signup from './Components/Client/Signup';
import Book_teachers from './pages/Client/Book_teachers';
import AdminHome from './pages/Admin/AdminHome';
import AdminLogin from './Components/Admin/AdminLogin';
import AddTeacher from './pages/Admin/AddTeacher';
import TeachersList from './pages/Admin/TeachersList';
import Upload from './pages/Admin/Upload';
import TeacherLogin from './Components/Tutor/TeacherLogin';
import TutorHome from './pages/Tutor/TutorHome';
 import TutorProfilePage from './pages/Tutor/TutorProfilePage';
 import Add_subjectPage from './pages/Admin/Add_subjectPage';
 import Profile_page from './pages/Client/Profile_page';
 import TeacherDetailPage from './pages/Client/TeacherDetailPage';
import ReservationPage from './pages/Client/ReservationPage';
import Time_managePage from './pages/Tutor/Time_managePage';
import BookingList_page from './pages/Tutor/BookingList_page';
import List_booking_page from './pages/Client/List_booking_page';
import RoomPage from './Components/screen/Room';
import ChatPage from './pages/Client/ChatPage';
import ChatRoomTutorPage from './pages/Tutor/ChatRoomPage';
import Transaction_page from './pages/Admin/Transaction_page';



function App() {
  const socket = useSocket();
  const [notification, setNotification] = useState(false);
  const handleNotification = (data) => {


    setNotification(true);

    toast.success("iam waitiiiiiiiiiiiiing");
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        const notification = new Notification("Incoming Video call", {
          body: "You have a video call",
          icon: "assets/icons/help-question-svgrepo-com.svg",
          tag: "video call",
          vibrate: [200, 100, 200],
        });
        notification.addEventListener("click", () => {
          // this.route.navigate(['/video-room',roomParams,user])
        });
      }
    });
  };



  useEffect(() => {
    socket.on("student:notification", handleNotification);
    return () => {
      setNotification(false);
      socket.off("student:notification", handleNotification);
    };
  }, []);
  return (
    <div >
       <ToastContainer/>
   <BrowserRouter>
    <Routes>

      
    
   

      <Route path='/' element={  <Home/>}/>
      <Route path='/classes' element={  <Demo_classes/>}/>
      <Route path='/teachers' element={<TeachersPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/book_teacher' element={<Book_teachers/>}/>
      <Route path='/profile' element={< Profile_page/>}/>
      <Route path='/teacher_details/:id' element={<TeacherDetailPage/>}/>
      <Route path='/reservation/:id' element={<ReservationPage/>}/>
      <Route path='/list_booking' element={<List_booking_page />}/>
      <Route path='/room/:roomId' element={<RoomPage/>}/>
      <Route path='/chat_room/:id' element={<ChatPage/>}/>


      <Route path='/admin' element={<AdminHome/>}/>
      <Route path='/admin/login' element={<AdminLogin/>}/>
      <Route path='/admin/addTeachers' element={<AddTeacher/>}/>
      <Route path='/admin/teachers' element={<TeachersList/>}/>
      <Route path='/admin/uploadclass' element={<Upload/>}/>
      <Route path='/admin/add_subject' element={<Add_subjectPage/>}/>
      <Route path='/admin/transactions' element={<Transaction_page/>}/>
    




      <Route path='/tutor' element={<TeacherLogin/>}/>
      <Route path='/tutor/home' element={<TutorHome/>}/>
      <Route path='/tutor/profile' element={<TutorProfilePage/>}/>
      <Route path='/tutor/manage_time' element={<Time_managePage />}/>
      <Route path='/tutor/booking_list' element={<BookingList_page/>}/>
      <Route path='/chat_room_tutor/:id' element={<ChatRoomTutorPage/>}/>
     
      
    </Routes>
   </BrowserRouter>
  
    </div>
  );
}

export default App;

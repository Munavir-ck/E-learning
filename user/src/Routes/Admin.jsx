import React from 'react'
import AdminHome from '../pages/Admin/AdminHome';
import AdminLogin from '../Components/Admin/AdminLogin';
import AddTeacher from '../pages/Admin/AddTeacher';
import TeachersList from '../pages/Admin/TeachersList';
import Upload from '../pages/Admin/Upload';
import Add_subjectPage from '../pages/Admin/Add_subjectPage';
import Transaction_page from '../pages/Admin/Transaction_page';
import { Navigate } from 'react-router-dom';

import { Route,Routes} from 'react-router-dom';

function Admin() {

  const isAuth=localStorage.getItem("admintoken")

  console.log(isAuth);
  return (
    <div>
       <Routes>
      <Route path='/admin/login' element={<AdminLogin/>}/>
      <Route path='/admin' element={isAuth?<AdminHome/>:<Navigate to={'/admin/login'} />}/>
      <Route path='/admin/addTeachers' element={isAuth?<AddTeacher/>:<Navigate to={'/admin/login'} />}/>
      <Route path='/admin/teachers' element={isAuth?<TeachersList/>:<Navigate to={'/admin/login'} />}/>
      <Route path='/admin/uploadclass' element={isAuth?<Upload/>:<Navigate to={'/admin/login'} />}/>
      <Route path='/admin/add_subject' element={isAuth?<Add_subjectPage/>:<Navigate to={'/admin/login'} />}/>
      <Route path='/admin/transactions' element={isAuth?<Transaction_page/>:<Navigate to={'/admin/login'} />}/>
      </Routes>
    </div>
  )
}

export default Admin

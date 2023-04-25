import React from 'react'
import AdminHome from '../pages/Admin/AdminHome';
import AdminLogin from '../Components/Admin/AdminLogin';
import AddTeacher from '../pages/Admin/AddTeacher';
import TeachersList from '../pages/Admin/TeachersList';
import Upload from '../pages/Admin/Upload';
import Add_subjectPage from '../pages/Admin/Add_subjectPage';
import Transaction_page from '../pages/Admin/Transaction_page';

import { Route,Routes} from 'react-router-dom';

function Admin() {
  return (
    <div>
       <Routes>
      <Route path='/admin' element={<AdminHome/>}/>
      <Route path='/admin/login' element={<AdminLogin/>}/>
      <Route path='/admin/addTeachers' element={<AddTeacher/>}/>
      <Route path='/admin/teachers' element={<TeachersList/>}/>
      <Route path='/admin/uploadclass' element={<Upload/>}/>
      <Route path='/admin/add_subject' element={<Add_subjectPage/>}/>
      <Route path='/admin/transactions' element={<Transaction_page/>}/>
      </Routes>
    </div>
  )
}

export default Admin

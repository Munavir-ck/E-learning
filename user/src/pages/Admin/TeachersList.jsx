import { Fragment } from "react";
import Sidebar from "../../Components/Admin/Sidebar";
import Teachers_list from "../../Components/Admin/Teachers_list";

import React from 'react'

function TeachersList() {
  return (
  <Fragment>
    <div className="flex ">
   <Sidebar/>
   <div className=" w-full ">
   <Teachers_list />

   </div>
 </div>

  </Fragment>
  )
}

export default TeachersList

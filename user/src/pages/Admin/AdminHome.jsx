import Sidebar from "../../Components/Admin/Sidebar";
import Linechart from "../../Components/Admin/Linechart";
import AdminData from "../../Components/Admin/AdminData";
import { Fragment } from "react";

import React from 'react'

function AdminHome() {
  return (
    <Fragment>
    <div className="flex ">
      <Sidebar/>
      <div className="flex-col w-full h-500">
      <AdminData/>
      <div className="">
      <Linechart/>
      </div>
      </div>
    </div>
    </Fragment>
  )
}

export default AdminHome

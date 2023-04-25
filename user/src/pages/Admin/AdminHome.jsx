import Sidebar from "../../Components/Admin/Sidebar";
import Linechart from "../../Components/Admin/Linechart";
import AdminData from "../../Components/Admin/AdminData";
import LineChart from "../../Components/Admin/Chart/LineChart";
import { Fragment } from "react";
import PieChart from "../../Components/Admin/Chart/PieChart";

import React from "react";

function AdminHome() {
  return (
    <div className="flex w-full ">
      <div className="flex  w-full ">
        <Sidebar />
        <div className="flex flex-col w-full overflow-y-auto h-screen">
          <AdminData />
          <div className=" flex flex-col md:flex-row md:justify-between ">
            <div className="w-full md:w-1/2">
              <LineChart />
            </div>
            <div className="w-full md:w-1/2">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;


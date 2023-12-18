import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="  flex  bg-[#21262e]  ">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;

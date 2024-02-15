import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
function Layout()
{
    return(
        <div style={{height:"100vh"}}>
      <Navbar />
      <div className="main-content d-flex align-items-center">
        <Outlet />
      </div>
    </div>

    )
}
export default Layout;
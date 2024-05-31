// pages/dashboard/layout.js
import React from "react";

import MyNav from "../components/myNav";
import SideNav from "../components/sideNav";
const DashboardLayout = ({ children }) => {
  return (
    <>
    
        <MyNav></MyNav>
        <main>{children}</main>
  
    </>
  );
};

export default DashboardLayout;

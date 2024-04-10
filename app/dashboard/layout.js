// pages/dashboard/layout.js
import React from 'react';

import MyNav from '../components/myNav';
const DashboardLayout = ({ children }) => {
  return (
    <>
    <MyNav/>
    <main className="flex-1 p-4">{children}</main>
 
      
    </>
  );
};

export default DashboardLayout;
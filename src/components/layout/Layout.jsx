import React, { Suspense } from "react";
import Sidebar from "../common/Sidebar";
import { Outlet } from "react-router-dom";
import Loader from "../common/Loader";

function Layout() {
  return (
    <>
      <div className="flex h-screen bg-gray-100 text-gray-100 overflow-hidden">
        {/* <div className="flex h-screen bg-red-950 text-gray-100 overflow-hidden"> */}
        {/* BG */}
        {/* <div className="fixed inset-0 z-0"> */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-inherit" />
          {/* <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-red-800 to-red-950 opacity-90" /> */}
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        <Sidebar />
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}

export default Layout;

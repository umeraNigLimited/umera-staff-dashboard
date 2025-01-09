import React, { useState } from "react";

import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import TasksPage from "./pages/TasksPage";
import ProductivityPage from "./pages/ProductivityPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import SignIn from "./components/auth/SignIn";
import CreatePassword from "./components/auth/CreatePassword";

function App() {
  const [user, setUser] = useState(true);
  return (
    <>
      {user ? (
        <div className="flex h-screen bg-red-950 text-gray-100 overflow-hidden">
          {/* BG */}
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-red-800 to-red-950 opacity-90" />
            <div className="absolute inset-0 backdrop-blur-sm" />
          </div>

          <Sidebar />
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/productivity" element={<ProductivityPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/create_password" element={<CreatePassword />} />
        </Routes>
      )}
    </>
  );
}

export default App;

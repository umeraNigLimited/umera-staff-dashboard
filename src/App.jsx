import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { useTasksContext } from "./components/hooks/useTasksContext";
import { useAuthContext } from "./components/hooks/useAuthContext";
import Loader from "./components/common/Loader";

// Lazy-loaded components
const OverviewPage = lazy(() => import("./pages/OverviewPage"));
const TasksPage = lazy(() => import("./pages/TasksPage"));
const ProductivityPage = lazy(() => import("./pages/ProductivityPage"));
const SalesPage = lazy(() => import("./pages/SalesPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const BroadcastPage = lazy(() => import("./pages/BroadcastPage"));
const SignIn = lazy(() => import("./components/auth/SignIn"));
const CreatePassword = lazy(() => import("./components/auth/CreatePassword"));

function App() {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch("http://localhost:29199/api/task/", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_TASK", payload: data.data });
          console.log(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (user) {
      fetchTask();
    }
  }, [dispatch, user]);

  // useEffect(() => {
  //   const validateToken = async () => {
  //     try {
  //       const response = await fetch("http://localhost:29199/api/validate", {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Invalid token");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       localStorage.removeItem("user"); // Remove invalid token
  //       dispatch({ type: "LOGOUT" });
  //     }
  //   };

  //   if (user) {
  //     validateToken();
  //   }
  // }, [user, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Protected Routes */}
          <Route
            path="/overview"
            element={user ? <OverviewPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/tasks"
            element={user ? <TasksPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/reports"
            element={user ? <ReportsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/productivity"
            element={user ? <ProductivityPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/sales"
            element={user ? <SalesPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders"
            element={user ? <OrdersPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/broadcast"
            element={user ? <BroadcastPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={user ? <SettingsPage /> : <Navigate to="/login" />}
          />
        </Route>

        {/* Authentication Routes */}
        <Route
          path="/login"
          element={!user ? <SignIn /> : <Navigate to="/overview" />}
        />
        <Route path="/create_password" element={<CreatePassword />} />

        {/* Catch-All Route */}
        <Route
          path="*"
          element={<Navigate to={user ? "/overview" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

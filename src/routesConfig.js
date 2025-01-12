import React from "react";
import OverviewPage from "./pages/OverviewPage";
import TasksPage from "./pages/TasksPage";
import ProductivityPage from "./pages/ProductivityPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import BroadcastPage from "./pages/BroadcastPage";

export const routesConfig = {
  protected: [
    { path: "/", element: <OverviewPage /> },
    { path: "/tasks", element: <TasksPage /> },
    { path: "/reports", element: <ReportsPage /> },
    { path: "/productivity", element: <ProductivityPage /> },
    { path: "/sales", element: <SalesPage /> },
    { path: "/orders", element: <OrdersPage /> },
    { path: "/broadcast", element: <BroadcastPage /> },
    { path: "/settings", element: <SettingsPage /> },
  ],
  public: [
    { path: "/login", element: <SignIn /> },
    { path: "/create_password", element: <CreatePassword /> },
  ],
};

export default routesConfig;

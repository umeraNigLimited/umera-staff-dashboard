import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { TasksContextProvider } from "./components/context/TasksContext.jsx";
import { AuthContextProvider } from "./components/context/AuthContext.jsx";
import { LeaveContextProvider } from "./components/context/LeaveContext.jsx";
import { QueryContextProvider } from "./components/context/QueryContext.jsx";
import { ReportContextProvider } from "./components/context/ReportContext.jsx";
import { AnnouncementContextProvider } from "./components/context/AnnouncementContext.jsx";
import { ImageContextProvider } from "./components/context/ImageContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ImageContextProvider>
        <LeaveContextProvider>
          <QueryContextProvider>
            <ReportContextProvider>
              <AnnouncementContextProvider>
                <TasksContextProvider>
                  <App />
                  <ToastContainer />
                </TasksContextProvider>
              </AnnouncementContextProvider>
            </ReportContextProvider>
          </QueryContextProvider>
        </LeaveContextProvider>
      </ImageContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

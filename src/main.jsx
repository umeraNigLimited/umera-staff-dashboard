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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <TasksContextProvider>
        <LeaveContextProvider>
          <QueryContextProvider>
            <ReportContextProvider>
              <AnnouncementContextProvider>
                <App />
              </AnnouncementContextProvider>
            </ReportContextProvider>
          </QueryContextProvider>
        </LeaveContextProvider>
      </TasksContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

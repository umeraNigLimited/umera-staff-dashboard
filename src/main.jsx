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

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/service-worker.js")
//     .then((registration) => {
//       console.log("Service Worker registered with scope:", registration.scope);
//     })
//     .catch((error) =>
//       console.error("Service Worker registration failed:", error)
//     );
// }

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

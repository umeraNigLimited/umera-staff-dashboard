import React, { createContext, useEffect, useReducer } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const AnnouncementContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

const announcementReducer = (state, action) => {
  switch (action.type) {
    case "SET_ANNOUNCEMENT":
      return {
        annoucements: action.payload,
      };
    case "ADD_ANNOUNCEMENT":
      return {
        annoucements: [action.payload, ...state.annoucements],
      };
    default:
      return state;
  }
};

export const AnnouncementContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(announcementReducer, {
    annoucements: [], // Initialize with an empty array for announcements
  });

  const { user } = useAuthContext();

  useEffect(() => {
    // Notification.requestPermission().then((permission) => {
    //   if (permission === "granted") {
    //     console.log("Notification permission granted.");
    //   } else {
    //     console.error("Notification permission denied.");
    //   }
    // });

    // Socket connection
    const socket = io(`${API_URL}`, {
      withCredentials: true, // Required if using cookies
    });

    socket.on("broadcast_announcement", (announcement) => {
      dispatch({ type: "ADD_ANNOUNCEMENT", payload: announcement });

      // if ("serviceWorker" in navigator) {
      //   navigator.serviceWorker.ready.then((registration) => {
      //     registration.showNotification(announcement.title, {
      //       body: announcement.body,
      //       // icon: data.icon,
      //       // actions: data.actions,
      //       // data: data.url,
      //     });
      //   });
      // } else {
      //   new Notification(data.title, {
      //     body: data.body,
      //     // icon: data.icon,
      //   });
      // }
      // console.log("From socket io", announcement);
    });

    // Fetch initial announcements
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch(`${API_URL}/api/announcement/`, {
          headers: {
            Authorization: `Bearer ${user?.token}`, // Ensure token is available
          },
        });
        const data = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_ANNOUNCEMENT", payload: data.data });
          // console.log("from backend announcement", data.data);
        }
      } catch (err) {
        // console.error("Error fetching announcements:", err);
      }
    };

    // Only fetch announcements if the user is logged in
    if (user) {
      fetchAnnouncement();
    }

    return () => {
      socket.disconnect(); // Cleanup on unmount
    };
  }, [dispatch, user]);
  // console.log({ AnnoucementContext: state });

  return (
    <AnnouncementContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AnnouncementContext.Provider>
  );
};

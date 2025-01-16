import React, { createContext, useEffect, useReducer } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const AnnouncementContext = createContext();

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
    // Socket connection
    const socket = io("http://localhost:29199");

    socket.on("broadcast_announcement", (announcement) => {
      dispatch({ type: "ADD_ANNOUNCEMENT", payload: announcement });
      console.log("From socket io", announcement);
    });

    // Fetch initial announcements
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch(
          "http://localhost:29199/api/announcement/",
          {
            headers: {
              Authorization: `Bearer ${user?.token}`, // Ensure token is available
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_ANNOUNCEMENT", payload: data.data });
          console.log("from backend announcement", data.data);
        }
      } catch (err) {
        console.error("Error fetching announcements:", err);
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
  console.log({ AnnoucementContext: state });

  return (
    <AnnouncementContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AnnouncementContext.Provider>
  );
};

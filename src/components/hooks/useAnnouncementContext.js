import { AnnouncementContext } from "../context/AnnouncementContext";
import { useContext } from "react";

export const useAnnouncementContext = () => {
  const context = useContext(AnnouncementContext);

  if (!context) {
    throw new Error(
      "useAnnouncementContext must be used in announcementContextProvider"
    );
  }
  return context;
};

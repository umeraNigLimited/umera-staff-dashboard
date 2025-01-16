import { useAnnouncementContext } from "./useAnnouncementContext";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useSendAnnouncement = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAnnouncementContext();
  const { user } = useAuthContext();

  const sendAnnouncement = async (annoucement) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:29199/api/announcement/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(annoucement),
      });

      console.log(annoucement);

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(json.error || "An error occurred during Login.");
      }

      if (response.ok) {
        //update Report Context
        dispatch({ type: "SET_ANNOUNCEMENT", payload: json.data });
        console.log("json data", json.data);

        setLoading(false);
      }
    } catch (err) {
      // Catch network or unexpected errors
      setLoading(false);
      setError("Unable to create password. Please try again later.");
      console.log(err);
    }
  };

  return { sendAnnouncement, error, loading, setError };
};

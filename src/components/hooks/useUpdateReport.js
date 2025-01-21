import { useReportContext } from "./useReportContext";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useUpdateReport = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useReportContext();
  const { user } = useAuthContext();

  const updateReport = async (report_id, updates) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:29199/report/${report_id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...updates }),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(json.error || "An error occurred during Login.");
      }

      if (response.ok) {
        //update Report Context
        dispatch({ type: "SET_REPORT", payload: json.data });

        setLoading(false);
      }
    } catch (err) {
      // Catch network or unexpected errors
      setLoading(false);
      setError("Unable to create password. Please try again later.");
      console.log(err);
    }
  };

  return { updateReport, error, loading, setError };
};

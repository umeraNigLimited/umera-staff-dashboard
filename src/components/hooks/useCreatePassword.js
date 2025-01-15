import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useCreatePassword = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const createPassword = async (staff_id, password) => {
    // console.log(staff_id, confirm_password, password);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:29199/api/staff/create_password" ||
          "https://ebc0-160-152-14-7.ngrok-free.app/api/create_password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ staff_id, password }),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(
          json.error || "An error occurred while creating the password."
        );
      }

      if (response.ok) {
        //save user to local storage
        localStorage.setItem("user", JSON.stringify(json));

        //update Auth Context
        dispatch({ type: "LOGIN", payload: json });

        setLoading(false);
      }
    } catch (err) {
      // Catch network or unexpected errors
      setLoading(false);
      setError("Unable to create password. Please try again later.");
      console.log(err);
    }
  };

  return { createPassword, error, loading, setError };
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useCreatePassword = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const createPassword = async (staff_id, password) => {
    // console.log(staff_id, confirm_password, password);
    setLoading(true);
    setError(null);

    // console.log(staff_id, password);
    try {
      const response = await fetch(`${API_URL}/api/staff/create_password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ staff_id: staff_id, password: password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(
          json.error || "An error occurred while creating the password."
        );
      }

      if (response.ok) {
        //save user to local storage
        // localStorage.setItem("user", JSON.stringify(json));

        navigate("/login");

        //update Auth Context
        // dispatch({ type: "LOGIN", payload: json });

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

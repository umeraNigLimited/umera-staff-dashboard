import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignIn = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signIn = async (staff_id, office_email, password) => {
    // console.log(staff_id, confirm_password, password);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://2332-160-152-196-95.ngrok-free.app/api/staff/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ staff_id, office_email, password }),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(json.error || "An error occurred during Login.");
      }

      if (response.ok) {
        //save user to local storage
        localStorage.setItem("user", JSON.stringify(json.data));

        //update Auth Context
        dispatch({ type: "LOGIN", payload: json.data });

        setLoading(false);
      }
    } catch (err) {
      // Catch network or unexpected errors
      setLoading(false);
      setError("Unable Sign in. Please try again later.");
      console.log(err);
    }
  };

  return { signIn, error, loading, setError };
};

import { useState } from "react";
import { useImageContext } from "./useImageContext";

export const useImageUpload = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useImageContext();

  const uploadImage = async (image) => {
    // console.log(staff_id, confirm_password, password);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:29199/api/image/upload", {
        method: "POST",
        body: JSON.stringify(image),
      });

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(json.error || "An error occurred during Login.");
      }

      if (response.ok) {
        //update Auth Context
        // dispatch({ type: "ADD_IMAGE", payload: json.data });

        setLoading(false);
      }
    } catch (err) {
      // Catch network or unexpected errors
      setLoading(false);
      setError("Unable Sign in. Please try again later.");
      console.log(err);
    }
  };

  return { uploadImage, error, loading, setError };
};

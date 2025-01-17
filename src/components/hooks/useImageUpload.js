import { useState } from "react";
import { useImageContext } from "./useImageContext";
import { useAuthContext } from "./useAuthContext";

export const useImageUpload = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const { dispatch } = useImageContext();

  const uploadImage = async (image) => {
    // console.log(staff_id, confirm_password, password);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://59c4-102-89-82-105.ngrok-free.app/api/image/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
          body: image,
        }
      );

      const json = await response.json();
      console.log(json);

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

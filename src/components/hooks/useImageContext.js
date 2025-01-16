import { ImageContext } from "../context/ImageContext";
import { useContext } from "react";

export const useImageContext = () => {
  const context = useContext(ImageContext);

  if (!context) {
    throw new Error("useImageContext must be used in imageContextProvider");
  }
  return context;
};

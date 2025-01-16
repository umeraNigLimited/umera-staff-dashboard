import React, { createContext, useReducer, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const ImageContext = createContext();

const imageReducer = (state, action) => {
  switch (action.type) {
    case "SET_IMAGE":
      return {
        image: action.payload,
      };
    case "ADD_IMAGE":
      return {
        image: action.payload,
      };
    default:
      return state;
  }
};

export const ImageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(imageReducer, {
    image: null,
  });

  const { user } = useAuthContext();

  useEffect(() => {
    // const fetchImage = async () => {
    //   try {
    //     const response = await fetch(
    //       "http://localhost:29199/api/image/upload",
    //       {
    //         headers: {
    //           Authorization: `Bearer ${user.token}`,
    //         },
    //       }
    //     );
    //     const data = await response.json();
    //     if (response.ok) {
    //       dispatch({ type: "SET_IMAGE", payload: data.data });
    //       console.log(data.data);
    //     }
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };
    // if (user) {
    //   fetchImage();
    // }
  }, [dispatch, user]);

  console.log("This is it", state.image);

  return (
    <ImageContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ImageContext.Provider>
  );
};

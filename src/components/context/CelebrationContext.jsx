import React, { createContext, useReducer } from "react";

const CelebrationContext = createContext();

const celebrationReducer = (state, action) => {
  switch (action.type) {
    case "SET_CELEBRATION":
      return {
        celebration: action.payload,
      };
    case "CREATE_CELEBRATION":
      return {
        celebration: [...state.celebration, action.payload],
      };
    default:
      return state;
  }
};

export const CelebrationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(celebrationReducer, {
    celebration: null,
  });

  return (
    <CelebrationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CelebrationContext.Provider>
  );
};

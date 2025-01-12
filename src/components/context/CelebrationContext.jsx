import React, { createContext, useReducer } from "react";

const CelebrationContext = createContext();

const celebrationReducer = (state, action) => {
  switch (action) {
    case "SET_TASK":
      return {
        task: action.payload,
      };
    case "CREATE_TASK":
      return {
        task: [...state, action.payload],
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
    <CelebrationContext.Provider value={{}}>
      {children}
    </CelebrationContext.Provider>
  );
};

import React, { createContext, useReducer } from "react";

const BroadcastContext = createContext();

const broadcastReducer = (state, action) => {
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

export const BroadcastContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(broadcastReducer, {
    broadcast: null,
  });

  return (
    <BroadcastContext.Provider value={{}}>{children}</BroadcastContext.Provider>
  );
};

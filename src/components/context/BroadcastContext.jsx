import React, { createContext } from "react";

const BroadcastContext = createContext();

export const BroadcastContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(broadcastReducer, {
    broadcast: null,
  });
  <BroadcastContext.Provider value={{}}>{children}</BroadcastContext.Provider>;
};

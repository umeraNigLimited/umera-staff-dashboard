import React, { createContext } from "react";

const CelebrationContext = createContext();

export const CelebrationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(celebrationReducer, {
    celebration: null,
  });
  <CelebrationContext.Provider value={{}}>
    {children}
  </CelebrationContext.Provider>;
};

import React, { createContext } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });
  <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

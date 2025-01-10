import React, { createContext } from "react";

const ProductivityContext = createContext();

export const ProductivityContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productivityReducer, {
    productivity: null,
  });
  <ProductivityContext.Provider value={{}}>
    {children}
  </ProductivityContext.Provider>;
};

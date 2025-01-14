import React, { createContext } from "react";

const ProductivityContext = createContext();

const productivityReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTIVITY":
      return {
        productivity: action.payload,
      };
    case "CREATE_PRODUCTIVITY":
      return {
        productivity: [...state, action.payload],
      };
    default:
      return state;
  }
};

export const ProductivityContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productivityReducer, {
    productivity: null,
  });

  return (
    <ProductivityContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductivityContext.Provider>
  );
};

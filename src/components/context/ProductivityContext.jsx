import React, { createContext } from "react";

const ProductivityContext = createContext();

const productivityReducer = (state, action) => {
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

export const ProductivityContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productivityReducer, {
    productivity: null,
  });

  return (
    <ProductivityContext.Provider value={{}}>
      {children}
    </ProductivityContext.Provider>
  );
};

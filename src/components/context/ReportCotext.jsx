import React, { createContext } from "react";

const ReportContext = createContext();

const reportReducer = (state, action) => {
  switch (action.type) {
    case "SET_REPORT":
      return {
        task: action.payload,
      };
    case "CREATE_REPORT":
      return {
        task: [...state, action.payload],
      };
    default:
      return state;
  }
};

export const ReportContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reportReducer, {
    report: null,
  });

  return (
    <ReportContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ReportContext.Provider>
  );
};

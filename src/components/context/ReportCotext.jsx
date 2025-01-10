import React, { createContext } from "react";

const ReportContext = createContext();

export const ReportContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reportReducer, {
    report: null,
  });
  <ReportContext.Provider value={{}}>{children}</ReportContext.Provider>;
};

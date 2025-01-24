import React, { createContext, useReducer, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export const ReportContext = createContext();

const reportReducer = (state, action) => {
  switch (action.type) {
    case "SET_REPORT":
      return {
        report: action.payload,
      };
    case "CREATE_REPORT":
      return {
        report: [action.payload, ...state.report],
      };
    default:
      return state;
  }
};

export const ReportContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reportReducer, {
    report: [],
  });

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`${API_URL}/api/report/`);
        const data = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_REPORT", payload: data.data });
          console.log(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (user) {
      fetchReport();
    }
  }, [dispatch, user]);

  // console.log("This is it", state.report);

  return (
    <ReportContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ReportContext.Provider>
  );
};

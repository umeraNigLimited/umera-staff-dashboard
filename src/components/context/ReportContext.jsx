import React, { createContext, useReducer, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const ReportContext = createContext();

const reportReducer = (state, action) => {
  switch (action.type) {
    case "SET_REPORT":
      return {
        report: action.payload,
      };
    case "CREATE_REPORT":
      return {
        report: [...state, action.payload],
      };
    default:
      return state;
  }
};

export const ReportContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reportReducer, {
    report: null,
  });

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(
          "https://59c4-102-89-82-105.ngrok-free.app/api/report/"
        );
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

  console.log("This is it", state.report);

  return (
    <ReportContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ReportContext.Provider>
  );
};

import React, { createContext, useReducer, useMemo, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const QueryContext = createContext();

const queryReducer = (state, action) => {
  switch (action.type) {
    case "SET_QUERY":
      return {
        query: action.payload,
      };
    case "CREATE_QUERY":
      return {
        query: [...state, action.payload],
      };
    case "DELETE QUERY":
      return {
        query: state.query.filter((query) => query !== action.payload.query_id),
      };
    default:
      return state;
  }
};

export const QueryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(queryReducer, {
    query: [],
  });

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const response = await fetch(
          "https://59c4-102-89-82-105.ngrok-free.app/api/query/",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_QUERY", payload: data.data });
          console.log(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (user) {
      fetchQuery();
    }
  }, [dispatch, user]);

  // Compute metrics using useMemo
  const queryMetrics = useMemo(() => {
    const totalQuery = state.query.length;
    // const achievedTasks = state.tasks.filter(
    //   (t) => t.status === "completed"
    // ).length;
    // const highPriorityTasks = state.tasks.filter(
    //   (t) => t.priority === "high"
    // ).length;
    // const mediumPriorityTasks = state.tasks.filter(
    //   (t) => t.priority === "medium"
    // ).length;
    // const lowPriorityTasks = state.tasks.filter(
    //   (t) => t.priority === "low"
    // ).length;

    return {
      totalQuery,
      // achievedTasks,
      // highPriorityTasks,
      // mediumPriorityTasks,
      // lowPriorityTasks,
    };
  }, [state.query]);

  return (
    <QueryContext.Provider value={{ ...state, queryMetrics, dispatch }}>
      {children}
    </QueryContext.Provider>
  );
};

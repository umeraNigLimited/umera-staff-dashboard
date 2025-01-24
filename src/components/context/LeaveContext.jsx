import React, { createContext, useReducer, useMemo, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export const LeaveContext = createContext();

const leaveReducer = (state, action) => {
  switch (action.type) {
    case "SET_LEAVE":
      return {
        leaves: action.payload,
      };
    case "CREATE_LEAVE":
      return {
        leaves: [...state, action.payload],
      };
    case "DELETE LEAVE":
      return {
        leaves: state.tasks.filter(
          (leave) => leave !== action.payload.leave_id
        ),
      };
    default:
      return state;
  }
};

export const LeaveContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(leaveReducer, {
    leaves: [],
  });

  const { user } = useAuthContext;

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await fetch(`${API_URL}/api/leave/`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_LEAVE", payload: data.data });
          console.log(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (user) {
      fetchLeave();
    }
  }, [dispatch, user]);

  // Calculate leave metrics using useMemo
  const leaveMetrics = useMemo(() => {
    const approvedLeaves = state.leaves.filter(
      (leave) => leave.status === "approved"
    );

    const totalLeaveDays = approvedLeaves.reduce((total, leave) => {
      const start = new Date(leave.start_date);
      const end = new Date(leave.end_date);
      const diffInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1; // Inclusive
      return total + diffInDays;
    }, 0);

    return {
      totalLeaves: state.leaves.length,
      approvedLeaves: approvedLeaves.length,
      pendingLeaves: state.leaves.filter((leave) => leave.status === "pending")
        .length,
      rejectedLeaves: state.leaves.filter(
        (leave) => leave.status === "rejected"
      ).length,
      totalLeaveDays,
    };
  }, [state.leaves]);

  return (
    <LeaveContext.Provider value={{ ...state, leaveMetrics, dispatch }}>
      {children}
    </LeaveContext.Provider>
  );
};

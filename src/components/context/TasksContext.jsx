import React, { createContext, useReducer, useMemo } from "react";

export const TasksContext = createContext();

const tasksReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASK":
      return {
        tasks: action.payload,
      };
    case "CREATE_TASK":
      return {
        tasks: [...state, action.payload],
      };
    case "DELETE TASK":
      return {
        tasks: state.tasks.filter((task) => task !== action.payload.task_id),
      };
    default:
      return state;
  }
};

export const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: [],
  });

  // Compute metrics using useMemo
  const metrics = useMemo(() => {
    const totalTasks = state.tasks.length;
    const achievedTasks = state.tasks.filter(
      (t) => t.status === "completed"
    ).length;
    const highPriorityTasks = state.tasks.filter(
      (t) => t.priority === "high"
    ).length;
    const mediumPriorityTasks = state.tasks.filter(
      (t) => t.priority === "medium"
    ).length;
    const lowPriorityTasks = state.tasks.filter(
      (t) => t.priority === "low"
    ).length;

    return {
      totalTasks,
      achievedTasks,
      highPriorityTasks,
      mediumPriorityTasks,
      lowPriorityTasks,
    };
  }, [state.tasks]);

  return (
    <TasksContext.Provider value={{ ...state, metrics, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

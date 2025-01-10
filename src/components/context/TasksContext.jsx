import React, { createContext } from "react";

export const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
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

export const TaskContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, {
    task: null,
  });
  <TaskContext.Provider value={{ ...state, dispatch }}>
    {children}
  </TaskContext.Provider>;
};

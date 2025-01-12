import { TasksContext } from "../context/TasksContext";
import { useContext } from "react";

export const useTasksContext = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw Error("useTaskContext must be used in taskContextProvider");
  }

  return context;
};

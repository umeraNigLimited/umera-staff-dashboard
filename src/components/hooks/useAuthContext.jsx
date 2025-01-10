import { TaskContext } from "../context/TasksContext";
import { useContext } from "react";

export const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw Error("useTaskContext must be used in taskContextProvider");
  }

  return context;
};

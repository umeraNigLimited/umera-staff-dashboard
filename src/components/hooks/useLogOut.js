import { useAuthContext } from "./useAuthContext";
import { useTasksContext } from "./useTasksContext";

export const useLogOut = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: tasksDispatch } = useTasksContext();

  const logout = () => {
    //Remove user from local Storage
    localStorage.removeItem("user");

    tasksDispatch({ type: "SET_TASK", payload: { tasks: [] } });

    //Clear Global State
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};

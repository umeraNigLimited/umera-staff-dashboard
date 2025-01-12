import { useAuthContext } from "./useAuthContext";

export const useLogOut = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    //Remove user from local Storage
    localStorage.removeItem("user");

    //Clear Global State
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};

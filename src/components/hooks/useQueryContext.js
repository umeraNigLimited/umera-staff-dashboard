import { QueryContext } from "../context/QueryContext";
import { useContext } from "react";

export const useQueryContext = () => {
  const context = useContext(QueryContext);

  if (!context) {
    throw Error("useQueryContext must be used in QueryContextProvider");
  }

  return context;
};

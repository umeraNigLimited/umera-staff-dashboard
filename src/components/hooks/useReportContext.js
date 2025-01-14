import { ReportContext } from "../context/ReportContext";
import { useContext } from "react";

export const useReportContext = () => {
  const context = useContext(ReportContext);

  if (!context) {
    throw new Error("useReportContext must be used in reportContextProvider");
  }
  return context;
};

import { useContext } from "react";
import { DataConfigContext } from "../contexts/DataConfigContext";

export function useDataConfig() {
  const context = useContext(DataConfigContext);
  if (!context) {
    throw new Error("useDataConfig should be use inside DataConfigProvider");
  }
  return context;
}

import { useContext } from "react";
import { DataConfigContext } from "../contexts/DataConfigContext";

export function useConfig() {
  const context = useContext(DataConfigContext);
  if (!context) {
    throw new Error("useLikes should be use inside LikesProvider");
  }
  return context;
}

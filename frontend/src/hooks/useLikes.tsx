import { useContext } from "react";
import { LikesContext } from "../contexts/LikesContext";

export function useLikes() {
  const context = useContext(LikesContext);
  if (!context) {
    throw new Error("useLikes should be use inside LikesProvider");
  }
  return context;
}

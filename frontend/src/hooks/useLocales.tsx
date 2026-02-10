import { useContext } from "react";
import { LocalesContext } from "../contexts/LocalesContext";

export function useLocales() {
  const context = useContext(LocalesContext);
  if (!context) {
    throw new Error("useLocales should be use inside LocalesProvider");
  }
  return context;
}

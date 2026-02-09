import { createContext } from "react";
import type { LocalesContextType } from "../types/LocalesContextType";

export const LocalesContext = createContext<LocalesContextType | undefined>(
  undefined,
);

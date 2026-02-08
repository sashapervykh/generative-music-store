import { createContext } from "react";
import type { LikesContextType } from "../types/LikesContextType";

export const LikesContext = createContext<LikesContextType | undefined>(
  undefined,
);

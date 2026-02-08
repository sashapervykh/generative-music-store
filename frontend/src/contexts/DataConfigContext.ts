import { createContext } from "react";
import type { DataContextType } from "../types/DataContextType";

export const DataConfigContext = createContext<DataContextType | undefined>(
  undefined,
);

import { createContext } from "react";
import type { SongsContextType } from "../types/SongsContextType";

export const SongsContext = createContext<SongsContextType | undefined>(
  undefined,
);

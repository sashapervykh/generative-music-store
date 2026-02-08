import { useState, type ReactNode } from "react";
import { LikesContext } from "../contexts/LikesContext";
import { LIKES_RANGE } from "../constants/likesRange";

export function LikesProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState(LIKES_RANGE.CURRENT_DEFAULT);

  const value = {
    current,
    setCurrent,
  };

  return (
    <LikesContext.Provider value={value}>{children}</LikesContext.Provider>
  );
}

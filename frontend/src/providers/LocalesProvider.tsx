import { useState, type ReactNode } from "react";
import { LocalesContext } from "../contexts/LocalesContext";
import type { Locale } from "../types/Locale";

export function LocalesProvider({ children }: { children: ReactNode }) {
  const [locales, setLocales] = useState<Locale[] | undefined>(undefined);

  const value = {
    locales,
    setLocales,
  };

  return (
    <LocalesContext.Provider value={value}>{children}</LocalesContext.Provider>
  );
}

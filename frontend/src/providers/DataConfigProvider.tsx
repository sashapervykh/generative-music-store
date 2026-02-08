import { useState, type ReactNode } from "react";
import { DataConfigContext } from "../contexts/DataConfigContext";
import { DEFAULT_CONFIG } from "../constants/defaultConfig";
import type { LanguagesType } from "../types/LanguagesType";

export function DataConfigProvider({ children }: { children: ReactNode }) {
  const [likes, setLikes] = useState(DEFAULT_CONFIG.LIKES.DEFAULT_LIKES);
  const [language, setLanguage] = useState<LanguagesType>(
    DEFAULT_CONFIG.LANGUAGE.DEFAULT,
  );
  const [seed, setSeed] = useState(DEFAULT_CONFIG.SEED.DEFAULT);

  const value = {
    language,
    likes,
    seed,
    setLanguage,
    setLikes,
    setSeed,
  };

  return (
    <DataConfigContext.Provider value={value}>
      {children}
    </DataConfigContext.Provider>
  );
}

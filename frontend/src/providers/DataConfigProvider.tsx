import { useState, type ReactNode } from "react";
import { DataConfigContext } from "../contexts/DataConfigContext";
import { DEFAULT_CONFIG } from "../constants/defaultConfig";
import { useLocales } from "../hooks/useLocales";
import { MAX_GALLERY_SCROLL } from "../constants/maxGalleryScroll";

export function DataConfigProvider({ children }: { children: ReactNode }) {
  const { locales } = useLocales();
  const locale = locales ? locales[0].value : DEFAULT_CONFIG.LANGUAGE.DEFAULT;
  const [language, setLanguage] = useState<string>(locale);
  const [likes, setLikes] = useState(DEFAULT_CONFIG.LIKES.DEFAULT_LIKES);
  const [seed, setSeed] = useState(DEFAULT_CONFIG.SEED.DEFAULT);
  const [page, setPage] = useState(DEFAULT_CONFIG.PAGE.DEFAULT);

  const loadMore = () => {
    setPage((p) => p + 1);
  };

  const hasMore = () => {
    return page < MAX_GALLERY_SCROLL;
  };

  const value = {
    language,
    likes,
    seed,
    page,
    setLanguage,
    setLikes,
    setSeed,
    setPage,
    loadMore,
    hasMore,
  };

  return (
    <DataConfigContext.Provider value={value}>
      {children}
    </DataConfigContext.Provider>
  );
}

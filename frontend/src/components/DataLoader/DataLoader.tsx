import { useEffect, type ReactNode } from "react";
import { useDataConfig } from "../../hooks/useDataConfig";
import { API_ROUTES } from "../../constants/apiRoutes";
import { useSongs } from "../../hooks/useSongs";
import type { Song } from "../../types/Song";
import { VIEWS } from "../../constants/views";

export function DataLoader({ children }: { children: ReactNode }) {
  const { language, seed, likes, page, view } = useDataConfig();
  const { setSongs } = useSongs();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}${API_ROUTES.GENERATE}?language=${language}&seed=${seed}&likes=${likes}&page=${page}&view=${view}`,
          { signal },
        );

        if (!response.ok) {
          throw new Error("Failed request");
        }

        const songsData = await response.json();
        if (view === VIEWS.GALLERY) {
          setSongs((s: Song[]) => {
            return s.concat(songsData);
          });
          return;
        }
        console.log(songsData);
        setSongs(songsData);
      } catch (error) {
        console.error("Request error:", error);
      }
    }, 400);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [language, seed, likes, page, view]);

  return <>{children}</>;
}

import { useEffect, type ReactNode } from "react";
import { useDataConfig } from "../../hooks/useDataConfig";
import { API_ROUTES } from "../../constants/apiRoutes";
import { useSongs } from "../../hooks/useSongs";

export function DataLoader({ children }: { children: ReactNode }) {
  const { language, seed, likes, page } = useDataConfig();
  const { setSongs } = useSongs();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}${API_ROUTES.GENERATE}?language=${language}&seed=${seed}&likes=${likes}&page=${page}`,
          { signal },
        );

        if (!response.ok) {
          throw new Error("Failed request");
        }

        console.log(response);
        const songsData = await response.json();
        setSongs(songsData);
      } catch (error) {
        console.error("Request error:", error);
      }
    }, 400);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [language, seed, likes, page]);

  return <>{children}</>;
}

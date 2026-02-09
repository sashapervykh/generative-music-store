import { useEffect, type ReactNode } from "react";
import { useDataConfig } from "../../hooks/useDataConfig";
import { API_ROUTES } from "../../constants/apiRoutes";

export function DataLoader({ children }: { children: ReactNode }) {
  const { language, seed, likes, page } = useDataConfig();

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

        const songsData = await response.json();
        console.log(songsData);
      } catch (error) {
        console.error("Request error:", error);
      }
    }, 400);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [language, seed, likes]);

  return <>{children}</>;
}

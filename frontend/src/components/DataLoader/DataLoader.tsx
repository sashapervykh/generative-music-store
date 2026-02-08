import { useEffect, type ReactNode } from "react";
import { useDataConfig } from "../../hooks/useDataConfig";

export function DataLoader({ children }: { children: ReactNode }) {
  const { language, seed, likes } = useDataConfig();

  useEffect(() => {
    async function requestSongsData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}?language=${language}&seed=${seed}&likes=${likes}`,
        );
        const songsData = await response.json();
        console.log(songsData);
      } catch {
        console.error("Some Error during request");
      }
    }

    requestSongsData();
  }, [language, seed, likes]);

  return <>{children}</>;
}

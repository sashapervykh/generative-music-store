import { useState, type ReactNode } from "react";
import type { Song } from "../types/Song";
import { SongsContext } from "../contexts/SongsContext";

export function SongsProvider({ children }: { children: ReactNode }) {
  const [songs, setSongs] = useState<Song[]>([]);

  const value = {
    songs,
    setSongs,
  };

  return (
    <SongsContext.Provider value={value}>{children}</SongsContext.Provider>
  );
}

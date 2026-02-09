import type { Song } from "./Song";

export interface SongsContextType {
  songs: Song[];
  setSongs: (locales: Song[]) => void;
}

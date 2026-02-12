import type { Song } from "./Song";

export interface SongsContextType {
  songs: Song[];
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
}

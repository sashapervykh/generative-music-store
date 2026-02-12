export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
  cover?: string;
  review?: string;
  music?: string;
  likes?: number;
}

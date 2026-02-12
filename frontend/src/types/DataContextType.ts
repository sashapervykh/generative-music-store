import type { Views } from "./Views";

export interface DataContextType {
  language: string;
  seed: string;
  likes: number;
  page: number;
  setSeed: (seed: string) => void;
  setLikes: (likes: number) => void;
  setLanguage: (language: string) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loadMore: () => void;
  hasMore: boolean;
  view: Views;
  setView: React.Dispatch<React.SetStateAction<Views>>;
}

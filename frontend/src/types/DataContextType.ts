import type { Views } from "./Views";

export interface DataContextType {
  language: string;
  seed: string;
  likes: number;
  page: number;
  updateSeed: (seed: string) => void;
  setLikes: (likes: number) => void;
  updateLanguage: (language: string) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loadMore: () => void;
  hasMore: boolean;
  view: Views;
  setView: React.Dispatch<React.SetStateAction<Views>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

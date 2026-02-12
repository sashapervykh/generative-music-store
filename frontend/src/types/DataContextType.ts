export interface DataContextType {
  language: string;
  seed: string;
  likes: number;
  page: number;
  setSeed: (seed: string) => void;
  setLikes: (likes: number) => void;
  setLanguage: (language: string) => void;
  setPage: (page: number) => void;
  loadMore: () => void;
  hasMore: () => boolean;
}

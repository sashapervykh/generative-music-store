export interface DataContextType {
  language: string;
  seed: string;
  likes: number;
  setSeed: (seed: string) => void;
  setLikes: (likes: number) => void;
  setLanguage: (language: string) => void;
}

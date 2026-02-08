import type { LanguagesType } from "./LanguagesType";

export interface DataContextType {
  language: LanguagesType;
  seed: string;
  likes: number;
  setSeed: (seed: string) => void;
  setLikes: (likes: number) => void;
  setLanguage: (language: LanguagesType) => void;
}

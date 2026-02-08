import { LANGUAGES } from "./languages";

export const DEFAULT_CONFIG = {
  SEED: { DEFAULT: "4294967296" },
  LANGUAGE: {
    OPTIONS: [
      { value: LANGUAGES.ENGLISH, label: LANGUAGES.ENGLISH },
      { value: LANGUAGES.GERMAN, label: LANGUAGES.ENGLISH },
    ],
    DEFAULT: LANGUAGES.ENGLISH,
  },
  LIKES: {
    MAX: 10,
    MIN: 0,
    DEFAULT_LIKES: 5,
    STEP: 0.1,
  },
};

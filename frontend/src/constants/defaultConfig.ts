import { getRandomSeed } from "../utils/getRandomSeed";

export const DEFAULT_CONFIG = {
  SEED: { DEFAULT: getRandomSeed() },
  LANGUAGE: {
    DEFAULT: "en_US",
  },
  LIKES: {
    MAX: 10,
    MIN: 0,
    DEFAULT_LIKES: 5,
    STEP: 0.1,
  },
  PAGE: { DEFAULT: 1 },
};

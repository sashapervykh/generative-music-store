import { PAGE_MULTIPLIER, SEED_MULTIPLIER } from "~/constants/seedNumbers.js";

export function getSongSeed(seed: string, page: number, index: number) {
  const songSeed =
    BigInt(seed) * SEED_MULTIPLIER +
    BigInt(page) * PAGE_MULTIPLIER +
    BigInt(index);
  return songSeed;
}

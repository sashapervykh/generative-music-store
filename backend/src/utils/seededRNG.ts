import seedrandom from "seedrandom";

export class SeededRNG {
  private rng: () => number;

  constructor(seed: string) {
    this.rng = seedrandom(seed);
  }

  float(min = 0, max = 1): number {
    return min + (max - min) * this.rng();
  }

  int(min: number, max: number): number {
    return Math.floor(this.float(min, max + 1));
  }

  choice<T>(array: T[]): T {
    const first = array[0];
    if (!first) throw new Error("Array is empty");
    return array[this.int(0, array.length - 1)] ?? first;
  }
}

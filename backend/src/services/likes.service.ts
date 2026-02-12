import type { Song } from "../types/Song.js";
import { getSongSeed } from "../utils/getSongSeed.js";
import { SeededRNG } from "../utils/seededRNG.js";

class LikesService {
  async createAllLikes(
    seed: string,
    page: number,
    songs: Song[],
    average: number,
  ) {
    const songsWithLikes = [];
    for (const song of songs) {
      const songSeed = getSongSeed(seed, page, song.id);
      const rng = new SeededRNG(songSeed.toString());
      song.likes = this.generateSongLikes(rng, average);
      songsWithLikes.push(song);
    }
    return songsWithLikes;
  }

  generateSongLikes(rng: SeededRNG, average: number): number {
    if (average <= 0) return 0;
    if (average >= 10) return 10;
    const k = Math.floor(average);
    const p = average - k;
    return k + (rng.float() < p ? 1 : 0);
  }
}

export const likesService = new LikesService();

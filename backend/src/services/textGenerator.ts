import { fakerLocales } from "~/locale/faker.js";
import type { Song } from "~/types/sont.js";

interface Props {
  seed: string;
  language: string;
}

class TextGenerator {
  generateSongsData({ language, seed }): Song[] {
    fakerLocales["en-US"].seed(seed);
    const title = fakerLocales["en-US"].music.songName();
    const artist = fakerLocales["en-US"].music.artist();
    const album = fakerLocales["en-US"].music.album();
    const genre = fakerLocales["en-US"].music.genre();

    return [{ id: 1, title, artist, album, genre }];
  }
}

export const textGenerator = new TextGenerator();

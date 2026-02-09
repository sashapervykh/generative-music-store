import { fakerLocales } from "~/locale/faker.js";
import type { Song } from "~/types/Song.js";

interface Props {
  seed: string;
  language: string;
}

class TextGenerator {
  generateSongsData({ language, seed }: Props): Song[] {
    console.log(language, seed);
    const faker = fakerLocales[language];
    if (!faker) throw new Error("Unsupported locale!");
    console.log(Object.keys(faker));
    faker.seed(Number(seed));
    const title = faker.music.songName();
    const artist = faker.music.artist();
    const album = faker.music.album();
    const genre = faker.music.genre();

    return [{ id: 1, title, artist, album, genre }];
  }
}

export const textGenerator = new TextGenerator();

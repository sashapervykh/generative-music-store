import { allFakers } from "@faker-js/faker";
import type { Faker } from "@faker-js/faker";
import type { Song } from "~/types/Song.js";

interface Props {
  seed: string;
  language: string;
}

class TextGenerator {
  allFakers: Record<string, Faker> = allFakers;

  generateSongsData({ language, seed }: Props): Song[] {
    const faker = this.allFakers[language];
    if (!faker) throw new Error("Unsupported locale!");
    faker.seed(Number(seed));
    const title = faker.music.songName();
    const artist = faker.person.fullName();
    const album = faker.word.noun();
    const genre = faker.music.genre();

    return [{ id: 1, title, artist, album, genre }];
  }

  private createTitle(faker: Faker) {}
  private createArtist() {}
  private createJenre(faker: Faker) {}
  private createAlbum() {}
}

export const textGenerator = new TextGenerator();

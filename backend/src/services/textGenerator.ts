import { allFakers } from "@faker-js/faker";
import type { Faker } from "@faker-js/faker";
import type { Song } from "~/types/Song.js";
import locales from "../locale/locales.json" with { type: "json" };
import type { Locales } from "~/types/Locales.js";

interface Props {
  seed: string;
  language: string;
}

class TextGenerator {
  allFakers: Record<string, Faker> = allFakers;
  locales: Locales = locales;

  generateSongsData({ language, seed }: Props): Song[] {
    const faker = this.allFakers[language];
    if (!faker) throw new Error("Unsupported locale!");
    faker.seed(Number(seed));
    const title = this.createTitle(faker);
    const artist = this.createArtist(faker);
    const album = this.createAlbum(faker);
    const genre = this.createGenre(language);
    return [{ id: 1, title, artist, album, genre }];
  }

  private createTitle(faker: Faker) {
    return this.getAdjectiveNoun(faker);
  }

  private createArtist(faker: Faker) {
    return faker.person.fullName();
  }

  private createGenre(language: string) {
    const locale = this.locales[language];
    if (!locale || !locale.genres[0]) throw new Error("Unsupported locale!");
    return locale.genres[0];
  }

  private createAlbum(faker: Faker) {
    return this.getTwoAdjectiveNoun(faker);
  }

  private getAdjectiveNoun(faker: Faker) {
    return `${faker.word.adjective()} ${faker.word.noun()}`;
  }
  private getTwoAdjectiveNoun(faker: Faker) {
    return `${faker.word.adjective()} ${faker.word.adjective()} ${faker.word.noun()}`;
  }
  private getVerbNoun(faker: Faker) {
    return `${faker.word.verb()} ${faker.word.noun()}`;
  }
  private getVerbAdjectiveNoun(faker: Faker) {
    return `${faker.word.verb()} ${faker.word.adjective()} ${faker.word.noun()}`;
  }
}

export const textGenerator = new TextGenerator();

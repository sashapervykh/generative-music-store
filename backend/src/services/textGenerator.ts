import { allFakers } from "@faker-js/faker";
import type { Faker } from "@faker-js/faker";
import type { Song } from "~/types/Song.js";
import locales from "../assets/locale/locales.json" with { type: "json" };
import type { Locales } from "~/types/Locales.js";
import { SONGS_PER_PAGE } from "~/constants/songsPerPage.js";
import { getSongSeed } from "~/utils/getSongSeed.js";
import { getCapitalizedWord } from "~/utils/getCapitalizedWord.js";

interface Props {
  seed: string;
  language: string;
  page: number;
}

class TextGenerator {
  allFakers: Record<string, Faker> = allFakers;
  locales: Locales = locales;

  generateAllSongs({ language, seed, page }: Props): Song[] {
    const faker = this.allFakers[language];
    if (!faker) throw new Error("Unsupported locale!");
    const songs = [];
    const startIndex = page * SONGS_PER_PAGE - SONGS_PER_PAGE;
    const endIndex = page * SONGS_PER_PAGE;
    for (let i = startIndex; i < endIndex; i++) {
      songs.push(this.generateSong(faker, language, seed, page, i));
    }
    return songs;
  }

  generateSong(
    faker: Faker,
    language: string,
    seed: string,
    page: number,
    index: number,
  ) {
    const songSeed = this.getFakerSeed(seed, page, index);
    faker.seed(songSeed);
    const title = this.createTitle(faker);
    const artist = this.createArtist(faker);
    const album = this.createAlbum(faker);
    const genre = this.createGenre(language, index);
    return { id: index + 1, title, artist, album, genre };
  }

  private getFakerSeed(seed: string, page: number, index: number) {
    const songSeed = getSongSeed(seed, page, index);
    const fakerSeed = Number(songSeed % BigInt(Number.MAX_SAFE_INTEGER));
    return fakerSeed;
  }

  private createTitle(faker: Faker) {
    return this.getAdjectiveNoun(faker);
  }

  private createArtist(faker: Faker) {
    return faker.person.fullName();
  }

  private createGenre(language: string, index: number) {
    const locale = this.locales[language];
    if (!locale) throw new Error("Unsupported locale!");
    const genre = locale.genres[index % locale.genres.length];
    if (!genre) throw new Error("Unsupported locale!");
    return genre;
  }

  private createAlbum(faker: Faker) {
    return this.getTwoAdjectiveNoun(faker);
  }

  private getAdjectiveNoun(faker: Faker) {
    const adjective = getCapitalizedWord(faker.word.adjective());
    const noun = getCapitalizedWord(faker.word.noun());
    return `${adjective} ${noun}`;
  }
  private getTwoAdjectiveNoun(faker: Faker) {
    const firstAdjective = getCapitalizedWord(faker.word.adjective());
    const secondAdjective = getCapitalizedWord(faker.word.adjective());
    const noun = getCapitalizedWord(faker.word.noun());
    return `${firstAdjective} ${secondAdjective} ${noun}`;
  }
  private getVerbNoun(faker: Faker) {
    return `${faker.word.verb()} ${faker.word.noun()}`;
  }
  private getVerbAdjectiveNoun(faker: Faker) {
    return `${faker.word.verb()} ${faker.word.adjective()} ${faker.word.noun()}`;
  }
}

export const textGenerator = new TextGenerator();

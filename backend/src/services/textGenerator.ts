import { allFakers } from "@faker-js/faker";
import type { Faker } from "@faker-js/faker";
import type { Song } from "~/types/Song.js";
import locales from "../assets/locale/locales.json" with { type: "json" };
import type { Locales } from "~/types/Locales.js";
import { getSongSeed } from "~/utils/getSongSeed.js";
import { getRandomPhrase } from "~/utils/getRandomPhrase.js";
import { SeededRNG } from "~/utils/seededRNG.js";
import { ALBUM_PERCENT } from "~/constants/albumsPercent.js";
import { PERSON_PERCENT } from "~/constants/personPercent.js";

interface Props {
  seed: string;
  language: string;
  page: number;
  songsAmount: number;
}

class TextGenerator {
  allFakers: Record<string, Faker> = allFakers;
  locales: Locales = locales;

  generateAllSongs({ language, seed, page, songsAmount }: Props): Song[] {
    const faker = this.allFakers[language];
    if (!faker) throw new Error("Unsupported locale!");
    const songs = [];
    const startIndex = page * songsAmount - songsAmount;
    const endIndex = page * songsAmount;
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
    const songSeed = getSongSeed(seed, page, index);
    const fakerSeed = this.getFakerSeed(songSeed);
    const seededRNG = new SeededRNG(songSeed.toString());
    faker.seed(fakerSeed);
    const title = this.createTitle(faker, seededRNG);
    const artist = this.createArtist(faker, seededRNG);
    const album = this.createAlbum(faker, seededRNG);
    const genre = this.createGenre(language, index);
    return { id: index + 1, title, artist, album, genre };
  }

  private getFakerSeed(seed: bigint) {
    const fakerSeed = Number(seed % BigInt(Number.MAX_SAFE_INTEGER));
    return fakerSeed;
  }

  private createTitle(faker: Faker, seededRNG: SeededRNG) {
    return getRandomPhrase(faker, seededRNG);
  }

  private createArtist(faker: Faker, seededRNG: SeededRNG) {
    const isPerson = seededRNG.float() < PERSON_PERCENT;
    if (isPerson) return faker.person.fullName();
    return getRandomPhrase(faker, seededRNG);
  }

  private createGenre(language: string, index: number) {
    const locale = this.locales[language];
    if (!locale) throw new Error("Unsupported locale!");
    const genre = locale.genres[index % locale.genres.length];
    if (!genre) throw new Error("Unsupported locale!");
    return genre;
  }

  private createAlbum(faker: Faker, seededRNG: SeededRNG) {
    const isAlbum = seededRNG.float() < ALBUM_PERCENT;
    if (isAlbum) return getRandomPhrase(faker, seededRNG);
    return "Single";
  }
}

export const textGenerator = new TextGenerator();

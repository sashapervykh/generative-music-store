import path from "path";
import { pathToFileURL } from "url";
import type { ReviewTemplate } from "~/types/ReviewTemplate.js";
import type { Song } from "~/types/Song.js";
import { getSongSeed } from "~/utils/getSongSeed.js";
import { SeededRNG } from "~/utils/seededRNG.js";

class ReviewService {
  async createAllReviews(
    seed: string,
    songs: Song[],
    page: number,
    language: string,
  ) {
    const reviewTemplate = await this.getReviewsTemplate(language);
    const songsWithReviews = [];
    songs.forEach((song) => {
      const review = this.createReview(seed, song, page, reviewTemplate);
      songsWithReviews.push({ ...song, review });
    });
    console.log(songsWithReviews);
    return songsWithReviews;
  }
  createReview(
    seed: string,
    song: Song,
    page: number,
    reviewTemplate: ReviewTemplate,
  ) {
    const songSeed = getSongSeed(seed, page, song.id - 1);
    const rng = new SeededRNG(songSeed.toString());
    let opening = rng.choice(reviewTemplate.openings);
    let emotion = rng.choice(reviewTemplate.emotion);
    let production = rng.choice(reviewTemplate.production);
    let closing = rng.choice(reviewTemplate.closing);
    const adjective = rng.choice(reviewTemplate.adjectives);
    const mood = rng.choice(reviewTemplate.moods);
    const instrument = rng.choice(reviewTemplate.instruments);
    const productionElement = rng.choice(reviewTemplate.productionElements);
    opening = opening.replace("{{adjective}}", adjective);
    emotion = emotion.replace("{{mood}}", mood);
    production = production.replace("{{instrument}}", instrument);
    production = production.replace("{{productionElement}}", productionElement);
    return `${opening} ${emotion} ${production} ${closing}`;
  }

  private async getReviewsTemplate(language: string) {
    try {
      console.log(process.cwd());
      const pathToFile = path.join(
        process.cwd(),
        `src/assets/review/${language}.json`,
      );
      const fileUrl = pathToFileURL(pathToFile).href;
      console.log(fileUrl);
      const reviewTemplates: ReviewTemplate = await import(fileUrl, {
        assert: { type: "json" },
      });

      return reviewTemplates;
    } catch (error) {
      console.log(error);
    }
  }
}

export const reviewService = new ReviewService();

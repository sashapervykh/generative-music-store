import type { Request, Response } from "express";
import { validateQuery } from "../utils/validateQuery.js";
import { SONGS_PER_VIEW } from "../constants/views.js";
import { textGenerator } from "../services/textGenerator.js";
import { imageGenerator } from "../services/imageService/imageGenerator.js";
import { reviewService } from "../services/review.service.js";
import { musicService } from "../services/music.service.js";
import { likesService } from "../services/likes.service.js";

class GeneratorController {
  async generateData(req: Request, res: Response) {
    try {
      const { language, seed, likes, page, view } = validateQuery(req.query);
      const songsAmount = SONGS_PER_VIEW[view];
      const songs = textGenerator.generateAllSongs({
        language,
        seed,
        page: Number(page),
        songsAmount,
      });
      const songsWithImages = imageGenerator.createAllCovers(
        seed,
        songs,
        Number(page),
      );
      const songsWithReviews = await reviewService.createAllReviews(
        seed,
        songsWithImages,
        Number(page),
        language,
      );
      const songsWithMusic = await musicService.createAllSongs(
        seed,
        Number(page),
        songsWithReviews,
      );
      const songsWithLikes = await likesService.createAllLikes(
        seed,
        Number(page),
        songsWithMusic,
        Number(likes),
      );
      res.status(200).json(songsWithLikes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
}

export const generatorController = new GeneratorController();

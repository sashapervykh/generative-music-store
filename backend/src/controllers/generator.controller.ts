import type { Request, Response } from "express";
import { imageGenerator } from "~/services/imageService/imageGenerator.js";
import { musicService } from "~/services/music.service.js";
import { reviewService } from "~/services/review.service.js";
import { textGenerator } from "~/services/textGenerator.js";

class GeneratorController {
  async generateData(req: Request, res: Response) {
    try {
      const { language, seed, likes, page } = req.query;
      if (
        !language ||
        typeof language !== "string" ||
        !seed ||
        typeof seed !== "string" ||
        !likes ||
        !page
      )
        throw new Error("Invalid arguments provided!");
      const songs = textGenerator.generateAllSongs({
        language,
        seed,
        page: Number(page),
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
      res.status(200).json(songsWithMusic);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
}

export const generatorController = new GeneratorController();

import type { Request, Response } from "express";
import { imageGenerator } from "~/services/imageService/imageGenerator.js";
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
      res.status(200).json(songsWithReviews);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export const generatorController = new GeneratorController();

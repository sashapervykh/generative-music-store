import type { Request, Response } from "express";
import { SONGS_PER_PAGE } from "~/constants/songsPerPage.js";
import { imageGenerator } from "~/services/imageService/imageGenerator.js";
import { likesService } from "~/services/likes.service.js";
import { musicService } from "~/services/music.service.js";
import { reviewService } from "~/services/review.service.js";
import { textGenerator } from "~/services/textGenerator.js";

class GeneratorController {
  async generateData(req: Request, res: Response) {
    try {
      const { language, seed, likes, page, view } = req.query;
      if (
        !language ||
        typeof language !== "string" ||
        !seed ||
        typeof seed !== "string" ||
        !likes ||
        !page ||
        !view
      )
        throw new Error("Invalid arguments provided!");
      console.log(view);
      const songsAmount = view === "gallery" ? 20 : SONGS_PER_PAGE;
      console.log(songsAmount);
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

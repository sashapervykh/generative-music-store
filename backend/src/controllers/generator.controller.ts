import type { Request, Response } from "express";
import { textGenerator } from "~/services/textGenerator.js";

class GeneratorController {
  generateData(req: Request, res: Response) {
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
      const data = textGenerator.generateAllSongs({
        language,
        seed,
        page: Number(page),
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export const generatorController = new GeneratorController();

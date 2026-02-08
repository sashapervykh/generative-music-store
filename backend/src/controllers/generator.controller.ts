import type { Request, Response } from "express";
import { textGenerator } from "~/services/textGenerator.js";

class GeneratorController {
  generateData(req: Request, res: Response) {
    try {
      const { language, seed, likes } = req.query;
      if (!language || !seed || !likes)
        throw new Error("Invalid arguments provided!");
      const data = textGenerator.generateSongsData({ language, seed });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export const generatorController = new GeneratorController();

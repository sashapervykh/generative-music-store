import type { Request, Response } from "express";

class GeneratorController {
  generateData(req: Request, res: Response) {
    try {
      const { language, seed, likes } = req.query;
      if (!language || !seed || !likes)
        throw new Error("Invalid arguments provided!");
      res.status(200).json({
        message: `Songs data for language: ${language}, seed: ${seed}, likes: ${likes}`,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export const generatorController = new GeneratorController();

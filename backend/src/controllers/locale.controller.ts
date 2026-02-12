import type { Request, Response } from "express";
import { localeService } from "~/services/locale.service.js";

class LocaleController {
  getAvailableLocales(req: Request, res: Response) {
    const locales = localeService.getAvailableLocales();
    res.status(200).json([...locales]);
  }
}

export const localeController = new LocaleController();

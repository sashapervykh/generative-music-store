import express from "express";
import cors from "cors";
import { ROUTES } from "./constants/routes.js";
import { generatorController } from "./controllers/generator.controller.js";
import { registerFonts } from "./utils/registerFonts.js";
import { localeController } from "./controllers/locale.controller.js";
import { ENV } from "./constants/env.js";

registerFonts();
const port = ENV.PORT || 3000;
const app = express();
app.use(cors({ origin: ENV.FRONTEND_URL }));
app.use(express.json());
app.get(ROUTES.GENERATE, generatorController.generateData);
app.get(ROUTES.LOCALES, localeController.getAvailableLocales);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

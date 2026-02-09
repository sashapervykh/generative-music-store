import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ROUTES } from "./constants/routes.js";
import { generatorController } from "./controllers/generator.controller.js";
import { localeController } from "./controllers/locale.controllets.js";

dotenv.config();
const port = Number(process.env.PORT) || 3000;
const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.get(ROUTES.GENERATE, generatorController.generateData);
app.get(ROUTES.LOCALES, localeController.getAvailableLocales);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

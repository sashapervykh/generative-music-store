import express from "express";
import cors from "cors";
import { testServer } from "./test.js";
import dotenv from "dotenv";
import { ROUTES } from "./constants/routes.js";

dotenv.config();
const port = Number(process.env.PORT) || 3000;
const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.get(ROUTES.GENERATE, (request, response) => {
  const test = testServer();
  response.send({ message: `${test}: Express + TypeScript Server` });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

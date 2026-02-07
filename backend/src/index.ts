import express from "express";

import { testServer } from "./test.js";

const app = express();
const port = Number(process.env.PORT) || 3000;
app.use(express.json());

app.get("/", (request, response) => {
  const test = testServer();
  response.send(`${test}: Express + TypeScript Server`);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

import dotenv from "dotenv";

import { ENV_NAMES } from "./envNames.js";
import { checkEnv } from "../utils/checkEnv.js";

dotenv.config();
export const ENV = {
  PORT: Number(checkEnv(process.env[ENV_NAMES.PORT])),
  FRONTEND_URL: checkEnv(process.env[ENV_NAMES.FRONTEND_URL]),
};

import dotenv from "dotenv";
import { checkEnv } from "~/utils/checkEnv.js";
import { ENV_NAMES } from "./envNames.js";

dotenv.config();
export const ENV = {
  PORT: Number(checkEnv(process.env[ENV_NAMES.PORT])),
  FRONTEND_URL: checkEnv(process.env[ENV_NAMES.FRONTEND_URL]),
};

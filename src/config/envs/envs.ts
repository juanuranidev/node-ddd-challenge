import "dotenv/config";
import { get } from "env-var";

const ENVS = {
  PORT: get("PORT").required().asPortNumber(),
  NODE_ENV: get("NODE_ENV").required().asString(),
  JWT_SECRET: get("JWT_SECRET").required().asString(),
  MONGO_PORT: get("MONGO_PORT").required().asString(),
  MONGO_URL: get("MONGO_URL").required().asString(),
};

export default ENVS;

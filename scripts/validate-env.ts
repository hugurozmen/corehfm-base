import { parseEnv } from "@core/env";

parseEnv({
  APP_ENV: process.env.APP_ENV,
  API_BASE_URL: process.env.API_BASE_URL,
  SENTRY_DSN: process.env.SENTRY_DSN,
});

console.log("Environment looks valid.");

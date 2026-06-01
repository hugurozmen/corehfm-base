import { parseEnv } from "@core/env";

export const appEnv = parseEnv({
  APP_ENV: process.env.EXPO_PUBLIC_APP_ENV,
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL ?? "https://api.example.com",
  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,
});

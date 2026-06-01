import { parseEnv } from "@core/env";

export const appEnv = parseEnv({
  APP_ENV: import.meta.env.VITE_APP_ENV,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? "https://api.example.com",
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
});

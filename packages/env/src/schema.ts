import { z } from "zod";

export const appEnvSchema = z.object({
  APP_ENV: z.enum(["development", "staging", "production"]).default("development"),
  API_BASE_URL: z.string().url(),
  SENTRY_DSN: z.string().optional().or(z.literal("")),
});

export type AppEnv = z.infer<typeof appEnvSchema>;

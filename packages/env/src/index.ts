import { appEnvSchema, type AppEnv } from "./schema";

export type { AppEnv } from "./schema";

export function parseEnv(input: Record<string, string | boolean | undefined>): AppEnv {
  const result = appEnvSchema.safeParse(input);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");

    throw new Error(`Invalid environment configuration: ${message}`);
  }

  return result.data;
}

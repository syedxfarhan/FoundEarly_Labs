import { z } from "zod";

/**
 * Environment validation — public Next.js env only for now.
 * Throws at import time in Node if invalid (call from instrumentation or layout).
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_NAME: z.string().default("FoundEarly Labs Showcase"),
});

export type AppEnv = z.infer<typeof envSchema>;

export function getEnv(): AppEnv {
  const parsed = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  });

  if (!parsed.success) {
    throw new Error(`Invalid environment: ${parsed.error.message}`);
  }

  return parsed.data;
}

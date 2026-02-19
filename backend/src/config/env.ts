import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  PORT: z
    .string()
    .default('8000')
    .transform((val) => Number(val)),

  DATABASE_URL: z.url(),

  JWT_SECRET: z
    .string()
    .min(10, 'JWT_SECRET must be at least 10 characters long'),

  JWT_EXPIRES_IN: z
    .string()
    .regex(/^\d+(ms|s|m|h|d)$/, 'Invalid expiresIn format')
    .default('7d'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables');
  console.error(parsed.error.issues[0].message);
  process.exit(1);
}

export const env = parsed.data;

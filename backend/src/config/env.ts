import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  PORT: z.coerce.number().default(8000),

  DATABASE_URL: z.url(),

  DIRECT_URL: z.url(),

  JWT_SECRET: z
    .string()
    .min(6, 'JWT_SECRET must be at least 6 characters long'),

  JWT_EXPIRES_IN: z
    .string()
    .regex(/^\d+(ms|s|m|h|d)$/, 'Invalid expiresIn format')
    .default('7d'),
  SWAGGER_ENABLED: z.string().optional(),

  ADMIN_BOOTSTRAP_SECRET: z
    .string()
    .min(6, 'ADMIN_BOOTSTRAP_SECRET must be at least 6 characters long'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables');
  console.error(parsed.error.issues[0].message);
  process.exit(1);
}

export const env = parsed.data;

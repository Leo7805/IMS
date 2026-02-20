import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client.js';
import { env } from '@/config/env.js';

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL, // pooled url
});

const prisma = new PrismaClient({ adapter });

export default prisma;

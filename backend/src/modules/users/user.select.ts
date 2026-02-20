import { Prisma } from '@/generated/prisma/client.js';

export const userSelect = {
  id: true,
  email: true,
  role: true,
  status: true,
  createdAt: true,
  updatedAt: true,
} as const;

export type UserSelected = Prisma.OrderGetPayload<{
  select: typeof userSelect;
}>;

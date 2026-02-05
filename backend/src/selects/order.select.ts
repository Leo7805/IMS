import { Prisma } from '@prisma/client';

export const orderSelect = {
  id: true,
  title: true,
  description: true,
  status: true,
  createdById: true,
  assignedToId: true,
  createdAt: true,
  updatedAt: true,
} as const;

export type OrderSelected = Prisma.OrderGetPayload<{
  select: typeof orderSelect;
}>;

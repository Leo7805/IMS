import { Prisma } from '@/generated/prisma/client.js';

export const orderItemSelect = {
  id: true,
  orderId: true,
  name: true,
  quantity: true,
  unitPrice: true,
  notes: true,
  createdAt: true,
  updatedAt: true,
} as const;

export type OrderItemSelected = Prisma.OrderItemGetPayload<{
  select: typeof orderItemSelect;
}>;

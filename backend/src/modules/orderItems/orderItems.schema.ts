import { z } from 'zod';
import { orderIdSchema, itemIdSchema } from '@/schemas/shared.params.js';
import { Prisma } from '@/generated/prisma/client.js';

export const orderItemParamsSchema = z.object({
  orderId: orderIdSchema,
  itemId: itemIdSchema,
});

const moneySchema = z.coerce
  .string()
  .trim()
  .regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount (max 2 decimal places)')
  .transform((val) => new Prisma.Decimal(val));

export const createItemSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  quantity: z.coerce
    .number()
    .int()
    .nonnegative('Quantity must be a positive number'),
  unitPrice: moneySchema,
  notes: z.string().optional(),
});

export const createItemServiceSchema = createItemSchema.extend({
  orderId: orderIdSchema,
});
export type CreateItemServiceSchema = z.infer<typeof createItemServiceSchema>;

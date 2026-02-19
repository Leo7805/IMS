import { z } from 'zod';
import { orderIdSchema, userIdSchema } from '@/schemas/shared.params.js';

export const orderParamsSchema = z.object({
  orderId: orderIdSchema,
});

export const orderTitleSchema = z.string().trim().min(1, 'Invalid title!');

export const createOrderSchema = z.object({
  title: orderTitleSchema,
  description: orderTitleSchema,
  assignedToId: userIdSchema,
});

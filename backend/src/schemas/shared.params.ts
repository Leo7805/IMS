import { z } from 'zod';
import { Role } from '@/generated/prisma/client.js';

export const userIdSchema = z.cuid('Invalid user ID format');
export const emailSchema = z.email('Email are required!');
export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters');
export const roleSchema = z.enum(Role, {
  message: 'Invalid role',
});
export const orderIdSchema = z.cuid('Invalid order ID format');
export const itemIdSchema = z.cuid('Invalid iterm ID format');

// export type UserId = z.infer<typeof userIdSchema>;
export type OrderId = z.infer<typeof orderIdSchema>;

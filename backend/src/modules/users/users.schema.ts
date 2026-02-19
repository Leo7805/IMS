import { z } from 'zod';
import {
  userIdSchema,
  emailSchema,
  passwordSchema,
  roleSchema,
} from '@/schemas/shared.params.js';
import { UserStatus } from '@prisma/client';

export const userStatusSchema = z.enum(UserStatus);

export const createStaffSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

export const updateUserBodySchema = z
  .object({
    role: roleSchema.optional(),
    status: userStatusSchema.optional(),
  })
  .strict()
  .refine((data) => data.role || data.status, {
    message: 'Provide at least one field: role or status',
  });

export const updateUserServiceSchema = updateUserBodySchema.extend({
  id: userIdSchema,
});

export type CreateStaff = z.infer<typeof createStaffSchema>;
export type UpdateUserService = z.infer<typeof updateUserServiceSchema>;

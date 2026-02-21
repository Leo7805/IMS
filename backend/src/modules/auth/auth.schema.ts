import { z } from 'zod';
import {
  userIdSchema,
  emailSchema,
  passwordSchema,
  roleSchema,
} from '@/schemas/shared.params.js';

export const loginAuthSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

export const loginUserSchema = z.object({
  id: userIdSchema,
  role: roleSchema,
});

export const registerAuthReqSchema = loginAuthSchema.extend({
  adminSecret: z.string().min(6).optional(),
});

export const registerAuthServSchema = loginAuthSchema.extend({
  role: roleSchema,
});

export const jwtPayloadUserSchema = loginUserSchema.strict();

export const jwtPayloadSchema = jwtPayloadUserSchema.extend({
  iat: z.number().int().nonnegative(),
  exp: z.number().int().positive(),
});

export type RegisterAuthServ = z.infer<typeof registerAuthServSchema>;
export type LoginAuth = z.infer<typeof loginAuthSchema>;
export type JwtPayload = z.infer<typeof jwtPayloadSchema>;
export type JwtPayloadUser = z.infer<typeof jwtPayloadUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;

import { Request, Response } from 'express';
import { registerAuthReqSchema, loginAuthSchema } from './auth.schema.js';
import * as authService from './auth.service.js';
import { env } from '@/config/env.js';
import { Role } from '@/generated/prisma/client.js';

export const registerAuth = async (req: Request, res: Response) => {
  const { email, password, adminSecret } = registerAuthReqSchema.parse(
    req.body,
  );

  // Register as a Admin or Staff
  const role =
    adminSecret === env.ADMIN_BOOTSTRAP_SECRET ? Role.ADMIN : Role.STAFF;

  const data = await authService.registerAuth({ email, password, role });

  return res.status(201).json({
    ok: true,
    data,
  });
};

// User login controller
export const loginAuth = async (req: Request, res: Response) => {
  const { email, password } = loginAuthSchema.parse(req.body);

  const data = await authService.loginAuth({ email, password });

  return res.json({
    ok: true,
    data,
  });
};

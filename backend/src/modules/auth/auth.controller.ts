import { Request, Response } from 'express';
import { registerAuthSchema, loginAuthSchema } from './auth.schema.js';
import * as authService from './auth.service.js';

// New user registeration controller
export const registerAuth = async (req: Request, res: Response) => {
  const { email, password, role } = registerAuthSchema.parse(req.body);

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

import { Request, Response } from 'express';
import { createStaffSchema, updateUserBodySchema } from './users.schema.js';
import * as usersService from './users.service.js';
import { userIdSchema } from '@/schemas/shared.params.js';

export const listUsers = async (req: Request, res: Response) => {
  const users = await usersService.listUsers();

  return res.json({
    ok: true,
    data: users,
  });
};

export const createStaff = async (req: Request, res: Response) => {
  const { email, password } = createStaffSchema.parse(req.body);

  const user = await usersService.createStaff({ email, password });

  return res.status(201).json({
    ok: true,
    data: user,
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const id = userIdSchema.parse(req.params.id);
  const { role, status } = updateUserBodySchema.parse(req.body);

  const user = await usersService.updateUser({ id, role, status });

  return res.json({
    ok: true,
    data: user,
  });
};

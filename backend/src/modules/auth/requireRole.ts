import { Request, Response, NextFunction } from 'express';
import type { Role } from '@/generated/prisma/client.js';
import { AppError } from '@/error/appError.js';
import { loginUserSchema } from './auth.schema.js';

export const requireRole = (role: Role) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = loginUserSchema.parse(req.user);

    // if (!user) {
    //   throw new AppError(401, 'Unauthorized');
    // }

    if (user.role !== role) {
      throw new AppError(403, 'Forbidden: insufficient permissioin');
    }

    next();
  };
};

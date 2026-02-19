import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../../db.js';
import { UserStatus } from '@prisma/client';
import { jwtPayloadSchema } from './auth.schema.js';
import { env } from '@/config/env.js';
import { z } from 'zod';
import { AppError } from '@/error/appError.js';

// Authorization using jwt token
export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError(401, 'Missing Authorization header');
  }

  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer' || !token) {
    throw new AppError(401, 'Invalid auth format');
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const payload = jwtPayloadSchema.parse(decoded);

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) throw new AppError(401, "User doesn't exist");

    if (user.status !== UserStatus.ACTIVE)
      throw new AppError(403, 'Account disalbed');

    req.user = user;
    return next();
  } catch (err: unknown) {
    if (
      err instanceof jwt.JsonWebTokenError ||
      err instanceof jwt.TokenExpiredError ||
      err instanceof z.ZodError
    ) {
      throw new AppError(401, 'Unauthorized');
    }

    throw err;
  }
};

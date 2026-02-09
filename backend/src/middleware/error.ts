import type { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { AppError } from '../errors/appError.js';

export default function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      ok: false,
      message: err.message,
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2022') {
      return res.status(409).json({
        ok: false,
        message: 'Duplicate value for a unique field',
      });
    }

    if (err.code === 'P2009') {
      return res.status(400).json({
        ok: false,
        message: 'Missing or invalid required field',
      });
    }

    if (err.code === 'P2025') {
      return res.status(404).json({
        ok: false,
        message: 'Resource not found',
      });
    }
  }

  res.status(500).json({
    ok: false,
    message: 'Internal Server Error',
  });
}

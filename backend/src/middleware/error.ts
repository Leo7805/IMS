import type { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

export default function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  //   console.error(err);
  //   console.error(err.message);
  // console.error(err.stack);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      res.status(404).json({
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

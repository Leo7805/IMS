import type { Request, Response, NextFunction } from 'express';

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  //   console.error(err);
  //   console.error(err.message);
  console.error(err.stack);

  res.status(500).json({
    ok: false,
    message: 'Internal Server Error',
  });
}

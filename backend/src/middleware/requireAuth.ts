import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../db.js';
import { UserStatus } from '@prisma/client';

type AuthPayload = Pick<Express.Request['user'], 'id' | 'role'>;

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      ok: false,
      message: 'Missing Authorization header',
    });
  }

  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer' || !token) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid auth format',
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;

    //
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "User doesn't exist",
      });
    }

    if (user.status !== UserStatus.ACTIVE) {
      return res.status(403).json({ ok: false, message: 'Account disabled' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid or expired token',
    });
  }
};

export default requireAuth;

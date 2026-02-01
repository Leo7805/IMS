import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { StringValue } from 'ms';
import prisma from '../db.js';

const signToken = (payload: object) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('Missing JWT_SECRET');

  return jwt.sign(payload, secret, {
    expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') as StringValue,
  });
};

export const registerAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, role } = req.body as {
      email?: string;
      password?: string;
      role?: 'admin' | 'staff';
    };

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: 'email and password are required!',
      });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({
        ok: false,
        message: 'email alread registered',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: role ?? 'staff',
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const token = signToken({
      id: user.id,
      role: user.role,
    });

    return res.status(201).json({
      ok: true,
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const loginAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate that email and password are provided
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };
    if (!email || !password) {
      res.status(400).json({
        ok: false,
        message: 'email and password are required',
      });
    }

    // Validate that an email is present
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({
        ok: false,
        message: 'invalid credentials',
      });
    }

    // Verify that the passwod is correct
    if (typeof password !== 'string') {
      throw new Error('Password must be provided');
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({
        ok: false,
        message: 'invalid credentials',
      });
    }

    // Generate a JWT for the user
    const token = signToken({ id: user.id, role: user.role });

    return res.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

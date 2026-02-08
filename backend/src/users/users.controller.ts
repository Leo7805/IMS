import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../db.js';
import { Role } from '@prisma/client';
import type { UserStatus } from '@prisma/client';
import { userSelect } from './user.select.js';

export const listUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await prisma.user.findMany({
      select: userSelect,
    });

    res.json({
      ok: true,
      data: users,
    });
    return;
  } catch (err) {
    next(err);
  }
};

export const createStaff = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: 'Email and password required',
      });
    }

    // Check duplicate
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({
        ok: false,
        message: 'Email already exists',
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashed,
        role: Role.STAFF,
      },
      select: userSelect,
    });

    return res.status(201).json({
      ok: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const { role, status } = req.body as {
      role?: Role;
      status?: UserStatus;
    };

    if (!role && !status) {
      return res.status(400).json({
        ok: false,
        message: 'Nothing to update',
      });
    }

    const user = await prisma.user.update({
      where: { id },
      data: { role, status },
      select: userSelect,
    });

    res.json({
      ok: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

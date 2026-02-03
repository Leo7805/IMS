import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../db.js';

const listUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.json(users);
    return;
  } catch (err) {
    next(err);
  }
};

const createStaff = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      ok: false,
      message: 'Email and password required',
    });
  }

  try {
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
        role: 'STAFF',
      },
    });

    return res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const { role, status } = req.body as {
      role?: 'ADMIN' | 'STAFF';
      status?: 'ACTIVE' | 'DISABLED';
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
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        updatedAt: true,
      },
    });

    res.json({
      ok: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export { listUsers, createStaff, updateUser };

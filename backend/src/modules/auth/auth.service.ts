import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Prisma, Role } from '@/generated/prisma/client.js';
import prisma from '@/db.js';
import { AppError } from '@/error/appError.js';
import { userSelect } from '../users/user.select.js';
import type { RegisterAuth, LoginAuth, JwtPayloadUser } from './auth.schema.js';
import { env } from '@/config/env.js';

// Sign the token for a user
const signToken = (payload: JwtPayloadUser) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
};

// Register service
export const registerAuth = async ({ email, password, role }: RegisterAuth) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: role ?? Role.STAFF,
      },
      select: userSelect,
    });

    const token = signToken({
      id: user.id,
      role: user.role,
    });

    return { user, token };
  } catch (err: unknown) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002'
    ) {
      throw new AppError(409, 'Email already registered');
    }

    throw err;
  }
};

// Login service
export const loginAuth = async ({ email, password }: LoginAuth) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // User (email) doesn't exist
  if (!user) {
    throw new AppError(401, 'Invalid credentials');
  }

  // Check password
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    throw new AppError(401, 'Invalid credentials');
  }

  // Generate a JWT for the user
  const token = signToken({ id: user.id, role: user.role });

  const data = {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    token,
  };

  return data;
};

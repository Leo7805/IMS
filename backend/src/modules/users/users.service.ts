import bcrypt from 'bcrypt';
import { userSelect } from './user.select.js';
import prisma from '@/db.js';
import { CreateStaff, UpdateUserService } from './users.schema.js';
import { AppError } from '@/error/appError.js';
import { Role } from '@/generated/prisma/client.js';

export const listUsers = async () => {
  return prisma.user.findMany({
    select: userSelect,
  });
};

export const createStaff = async ({ email, password }: CreateStaff) => {
  // Check duplicate
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new AppError(409, 'Email already exists');
  }

  const hashed = await bcrypt.hash(password, 10);

  // Create user
  return prisma.user.create({
    data: {
      email,
      passwordHash: hashed,
      role: Role.STAFF,
    },
    select: userSelect,
  });
};

export const updateUser = async ({ id, role, status }: UpdateUserService) => {
  return prisma.user.update({
    where: { id },
    data: { role, status },
    select: userSelect,
  });
};

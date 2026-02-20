import prisma from '@/db.js';
import { orderSelect } from './orders.select.js';
import { Role, Prisma } from '@/generated/prisma/client.js';
import { LoginUser } from '../auth/auth.schema.js';
import { AppError } from '@/error/appError.js';
import { OrderId } from '@/schemas/shared.params.js';

// Get order list service (id: userId)
export const getOrders = async ({ id, role }: LoginUser) => {
  return await prisma.order.findMany({
    select: orderSelect,
    ...(role === Role.STAFF && {
      where: { assignedToId: id },
    }),
  });
};

// Update order by id
export const updateOrderById = async (id: string, data: any) => {
  try {
    return await prisma.order.update({
      where: { id },
      data,
      select: orderSelect,
    });
  } catch (err: unknown) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2025'
    ) {
      throw new AppError(404, 'Order not found');
    }

    throw err;
  }
};

// Create order
export const createOrder = async ({
  title,
  createdById,
  description,
  assignedToId,
}: {
  title: string;
  createdById: string;
  description?: string;
  assignedToId?: string;
}) => {
  const data = {
    title,
    createdBy: {
      connect: { id: createdById },
    },
    ...(description !== undefined && {
      description,
    }),
    ...(assignedToId && {
      assignedTo: { connect: { id: assignedToId } },
    }),
  };

  try {
    return await prisma.order.create({
      data,
      select: orderSelect,
    });
  } catch (err: unknown) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2025'
    ) {
      throw new AppError(404, 'User ID not found');
    }
    throw err;
  }
};

export const deleteOrder = async (id: OrderId) => {
  try {
    return prisma.order.delete({
      where: { id },
    });
  } catch (err: unknown) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2025'
    ) {
      throw new AppError(404, 'Order not found');
    }

    throw err;
  }
};

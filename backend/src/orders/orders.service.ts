import prisma from '../db.js';
import { orderSelect } from '../orders/order.select.js';
import { Role } from '@prisma/client';

// Get order list service
export const getOrders = async (role: Role, userId: string) => {
  return await prisma.order.findMany({
    select: orderSelect,
    ...(role === Role.STAFF && {
      where: { assignedToId: userId },
    }),
  });
};

// Update order by id
export const updateOrderById = async (id: string, data: any) => {
  return await prisma.order.update({
    where: { id },
    data,
    select: orderSelect,
  });
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

  return await prisma.order.create({
    data,
    select: orderSelect,
  });
};

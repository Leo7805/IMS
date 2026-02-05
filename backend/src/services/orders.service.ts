import prisma from '../db.js';
import { orderSelect } from '../selects/order.select.js';
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

// Update record by id
export const updateOrderById = async (id: string, data: any) => {
  return await prisma.order.update({
    where: { id },
    data,
    select: orderSelect,
  });
};

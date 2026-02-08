import prisma from '../db.js';
import { orderItemSelect } from './orderItems.select.js';
import { Prisma } from '@prisma/client';

export const getOrderItem = async (orderId: string) => {
  return await prisma.orderItem.findMany({
    where: { id: orderId },
    select: orderItemSelect,
  });
};

export const createOrderItem = async ({
  orderId,
  name,
  quantity,
  unitPrice,
  notes,
}: {
  orderId: string;
  name: string;
  quantity: number;
  unitPrice: Prisma.Decimal;
  notes?: string;
}) => {
  const data = {
    order: { connect: { id: orderId } },
    name,
    quantity,
    unitPrice,
    ...(notes !== undefined && { notes }),
  };

  return await prisma.orderItem.create({
    data,
    select: orderItemSelect,
  });
};

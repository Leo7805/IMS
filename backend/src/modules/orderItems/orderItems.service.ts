import prisma from '@/db.js';
import { AppError } from '@/error/appError.js';
import { orderItemSelect } from './orderItems.select.js';
import { Prisma } from '@/generated/prisma/client.js';
import { UpdatableItemFields } from './orderItemUpdate.policy.js';
import { CreateItemServiceSchema } from './orderItems.schema.js';

export const getOrderItems = async (orderId: string) => {
  return await prisma.orderItem.findMany({
    where: { orderId },
    select: orderItemSelect,
  });
};

export const createOrderItem = async ({
  orderId,
  name,
  quantity,
  unitPrice,
  notes,
}: CreateItemServiceSchema) => {
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

export const updateOrderItem = async ({
  itemId,
  itemData,
}: {
  itemId: string;
  itemData: UpdatableItemFields;
}) => {
  try {
    return await prisma.orderItem.update({
      where: { id: itemId },
      data: itemData,
      select: orderItemSelect,
    });
  } catch (err: unknown) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        throw new AppError(404, 'Order item not found');
      }
    }

    throw err;
  }
};

export const deleteOrderItem = async (itemId: string) => {
  try {
    return await prisma.orderItem.delete({
      where: { id: itemId },
    });
  } catch (err: unknown) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        throw new AppError(404, 'Order item not found');
      }
    }

    throw err;
  }
};

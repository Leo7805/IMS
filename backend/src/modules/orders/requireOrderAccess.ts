import { Request, Response, NextFunction } from 'express';
import prisma from '@/db.js';
import { orderSelect } from './orders.select.js';
import { Role } from '@/generated/prisma/client.js';
import { orderParamsSchema } from './orders.schema.js';
import { loginUserSchema } from '../auth/auth.schema.js';
import { AppError } from '@/error/appError.js';

// Check whether user's role is authorized for this user:
// ADMIN or Staff.id === order.assignedToId
export const requireOrderAccess = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id: userId, role } = loginUserSchema.parse(req.user);
  const { orderId } = orderParamsSchema.parse(req.params);

  // Find out the order
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: orderSelect,
  });

  if (!order) {
    throw new AppError(404, 'Order not found');
  }

  // Filter out assignedToId !== Staff.id
  if (role === Role.STAFF && userId !== order.assignedToId) {
    throw new AppError(403, 'You are not assigned to the order');
  }

  // Save "order" info in req.order
  req.order = order;
  next();
};

// export default requireOrderAccess;

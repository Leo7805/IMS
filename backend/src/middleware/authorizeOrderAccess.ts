import { Request, Response, NextFunction } from 'express';
import prisma from '../db.js';
import { orderSelect } from '../selects/order.select.js';
import { Role } from '@prisma/client';

// Check whether user's role is authorized for this user:
// ADMIN or Staff.id === order.assignedToId
const authorizeOrderAccess = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId, role } = req.user;
    const { id: orderId } = req.params;

    // Find out the order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: orderSelect,
    });

    if (!order) {
      return res.status(404).json({
        ok: false,
        message: 'Order not found',
      });
    }

    // Filter out assignedToId !== Staff.id
    if (role === Role.STAFF && userId !== order.assignedToId) {
      return res.status(403).json({
        ok: false,
        message: 'You are not assigned to the order',
      });
    }

    // Save "order" info in req.order
    req.order = order;
    next();
  } catch (err) {
    next(err);
  }
};

export default authorizeOrderAccess;

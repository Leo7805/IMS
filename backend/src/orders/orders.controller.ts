import { Request, Response, NextFunction } from 'express';
import prisma from '../db.js';
import * as orderService from '../orders/orders.service.js';
import { pickAllowedFields } from './orderUpdate.policy.js';
import { orderSelect } from './order.select.js';

// Get order list (ADMIN or STAFF with assignedID), filter order in SQL
export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId, role } = req.user;
    const orders = await orderService.getOrders(role, userId);
    return res.json({
      ok: true,
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

// Get single order (ADMIN or STAFF with assignedID)
export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const order = req.order;
    return res.json({ ok: true, data: order });
  } catch (err) {
    next(err);
  }
};

// Update an order by id, (ADMIN or staff.id === order.assignedToId)
export const updateOrder = async (
  req: Request<{ orderId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.orderId; // order id
    const { role } = req.user;

    const { allowedData, forbiddenFields } = pickAllowedFields(role, req.body);

    if (forbiddenFields.length > 0) {
      return res.status(403).json({
        ok: false,
        message: `You are not allowed to update these fields: ${forbiddenFields.join(', ')}`,
      });
    }

    if (Object.keys(allowedData).length === 0) {
      return res.status(400).json({
        ok: false,
        message: 'Nothing to update',
      });
    }

    const order = await orderService.updateOrderById(id, allowedData);

    return res.json({
      ok: true,
      data: order,
    });
  } catch (err: any) {
    if (err.code === 'P2025') {
      return res.status(404).json({
        ok: false,
        message: 'Order not found',
      });
    }
    next(err);
  }
};

// Create order, Admin Only
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, assignedToId } = req.body;
    const { id: createdById } = req.user;

    if (!title) {
      return res.status(400).json({
        ok: false,
        message: 'Title is required',
      });
    }

    const order = await orderService.createOrder({
      title,
      createdById,
      description,
      assignedToId,
    });

    res.status(201).json({
      ok: true,
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (
  req: Request<{ orderId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.orderId;

    await prisma.order.delete({
      where: { id },
    });

    return res.json({
      ok: true,
    });
  } catch (err: any) {
    if (err.code === 'P2025') {
      return res.status(404).json({
        ok: false,
        message: 'Order not found',
      });
    }
    next(err);
  }
};

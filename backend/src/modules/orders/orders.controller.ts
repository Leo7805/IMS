import { Request, Response, NextFunction } from 'express';
import * as orderService from '../orders/orders.service.js';
import { pickAllowedFields } from './orderUpdate.policy.js';
import { loginUserSchema } from '../auth/auth.schema.js';
import { orderIdSchema } from '@/schemas/shared.params.js';
import { AppError } from '@/error/appError.js';
import { createOrderSchema } from './orders.schema.js';

export const getOrders = async (req: Request, res: Response) => {
  const { id: userId, role } = loginUserSchema.parse(req.user);
  const orders = await orderService.getOrders({ role, id: userId });
  return res.json({
    ok: true,
    data: orders,
  });
};

// Get single order (ADMIN or STAFF with assignedID)
export const getOrderById = async (req: Request, res: Response) => {
  const order = req.order;
  return res.json({ ok: true, data: order });
};

// Update an order by id, (ADMIN or staff.id === order.assignedToId)
export const updateOrder = async (req: Request, res: Response) => {
  const id = orderIdSchema.parse(req.params.orderId); // order id
  const { role } = loginUserSchema.parse(req.user);

  const { allowedData, forbiddenFields } = pickAllowedFields(role, req.body);

  if (forbiddenFields.length > 0) {
    throw new AppError(
      403,
      `You are not allowed to update these fields: ${forbiddenFields.join(', ')}`,
    );
  }

  if (Object.keys(allowedData).length === 0) {
    throw new AppError(400, 'Nothing to update');
  }

  const order = await orderService.updateOrderById(id, allowedData);

  return res.json({
    ok: true,
    data: order,
  });
};

// Create order, Admin Only
export const createOrder = async (req: Request, res: Response) => {
  const { title, description, assignedToId } = createOrderSchema.parse(
    req.body,
  );
  const { id: createdById } = loginUserSchema.parse(req.user);

  if (!title) {
    throw new AppError(400, 'Title is required');
  }

  const order = await orderService.createOrder({
    title,
    createdById,
    description,
    assignedToId,
  });

  return res.status(201).json({
    ok: true,
    data: order,
  });
};

export const deleteOrder = async (req: Request, res: Response) => {
  const id = orderIdSchema.parse(req.params.orderId);

  await orderService.deleteOrder(id);

  return res.json({
    ok: true,
  });
};

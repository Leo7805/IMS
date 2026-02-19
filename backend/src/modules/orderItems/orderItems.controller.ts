import { Request, Response } from 'express';
import * as orderItemService from './orderItems.service.js';
import { pickAllowedFields } from './orderItemUpdate.policy.js';
import { AppError } from '@/error/appError.js';
import { orderParamsSchema } from '../orders/orders.schema.js';
import {
  orderItemParamsSchema,
  createItemSchema,
} from './orderItems.schema.js';
import { loginUserSchema } from '../auth/auth.schema.js';

export const getOrderItems = async (req: Request, res: Response) => {
  const { orderId } = orderParamsSchema.parse(req.params);

  const orderItem = await orderItemService.getOrderItems(orderId);

  return res.json({
    ok: true,
    data: orderItem,
  });
};

// 🚩
export const createOrderItem = async (req: Request, res: Response) => {
  const { orderId } = orderParamsSchema.parse(req.params);
  const { name, quantity, unitPrice, notes } = createItemSchema.parse(req.body);

  const orderItem = await orderItemService.createOrderItem({
    orderId,
    name,
    quantity,
    unitPrice,
    notes,
  });

  return res.json({
    ok: true,
    data: orderItem,
  });
};

export const updateOrderItem = async (req: Request, res: Response) => {
  const { itemId } = orderItemParamsSchema.parse(req.params);
  const { id: userId, role } = loginUserSchema.parse(req.user);
  const { allowedData, forbiddenFields } = pickAllowedFields(role, req.body);

  if (forbiddenFields.length > 0) {
    throw new AppError(
      403,
      `You are not allowed to update the fields: ${forbiddenFields}`,
    );
  }

  if (Object.keys(allowedData).length === 0) {
    throw new AppError(400, 'Nothing to update');
  }

  const orderItem = await orderItemService.updateOrderItem({
    itemId,
    itemData: allowedData,
  });

  return res.json({
    ok: true,
    data: orderItem,
  });
};

export const deleteOrderItem = async (req: Request, res: Response) => {
  const { itemId } = orderItemParamsSchema.parse(req.params);

  await orderItemService.deleteOrderItem(itemId);

  res.json({
    ok: true,
  });
};

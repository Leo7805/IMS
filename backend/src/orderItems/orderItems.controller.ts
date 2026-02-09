import { Request, Response, NextFunction } from 'express';
import * as orderItemService from './orderItem.service.js';
import { pickAllowedFields } from './orderItemUpdate.policy.js';
import Prisma from '@prisma/client';
import { AppError } from '../errors/appError.js';

export const getOrderItems = async (req: Request, res: Response) => {
  const orderId = req.params.orderId as string;

  const orderItem = await orderItemService.getOrderItems(orderId);

  return res.json({
    ok: true,
    data: orderItem,
  });
};

export const createOrderItem = async (req: Request, res: Response) => {
  const orderId = req.params.orderId as string;
  const { name, quantity, unitPrice, notes } = req.body;

  if (!name) {
    throw new AppError(400, 'Name is required');
  }

  if (typeof quantity !== 'number' || quantity <= 0) {
    throw new AppError(400, 'Quantity must be a positive number');
  }

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

// 🚩
export const updateOrderItem = async (req: Request, res: Response) => {
  const itemId = req.params.itemId as string;
  const { id: userId, role } = req.user;
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
  const itemId = req.params.itemId as string;

  await orderItemService.deleteOrderItem(itemId);

  res.json({
    ok: true,
  });
};

import { Request, Response, NextFunction } from 'express';
import * as orderItemService from './orderItem.service.js';
import { orderItemSelect } from './orderItems.select.js';
import prisma from '../db.js';

export const getOrderItems = async (
  req: Request<{ orderId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orderId = req.params.orderId;

    const orderItem = await orderItemService.getOrderItem(orderId);

    return res.json({
      ok: true,
      data: orderItem,
    });
  } catch (err) {
    next(err);
  }
};

export const createOrderItem = async (
  req: Request<{ orderId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orderId = req.params.orderId;
    const { name, quantity, unitPrice, notes } = req.body;

    if (!name) {
      return res.status(400).json({
        ok: false,
        message: 'Name is required',
      });
    }

    if (quantity == null || quantity <= 0) {
      return res.status(400).json({
        ok: false,
        message: 'Quantity must be a positive number',
      });
    }

    const orderItem = await orderItemService.createOrderItem({
      orderId,
      name,
      quantity,
      unitPrice,
      notes,
    });

    res.json({
      ok: true,
      data: orderItem,
    });
  } catch (err) {
    next(err);
  }
};

// 🚩
export const updateOrderItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId, role } = req.user;
    res.json({
      ok: true,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteOrderItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId, role } = req.user;
    res.json({
      ok: true,
    });
  } catch (err) {
    next(err);
  }
};

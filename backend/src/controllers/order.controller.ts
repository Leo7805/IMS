import { Request, Response, NextFunction } from 'express';
import prisma from '../db.js';

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let orders;
    const user = (req as any).user;

    if (user.role === 'ADMIN') {
      orders = await prisma.order.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          createdById: true,
          assignedToId: true,
          createdAt: true,
        },
      });
    } else {
      orders = await prisma.order.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          createdById: true,
          assignedToId: true,
          createdAt: true,
        },
        where: {
          assignedToId: user.id,
        },
      });
    }

    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, assignedToId } = req.body;
  const { id: createdById } = (req as any).user;
  if (!title) {
    return res.status(400).json({
      ok: false,
      message: 'Title are required',
    });
  }

  try {
    const data: any = {
      title,
      createdBy: {
        connect: { id: createdById },
      },
    };

    if (description !== undefined) {
      data.description = description;
    }

    if (assignedToId) {
      data.assignedTo = { connect: { id: assignedToId } };
    }

    const order = await prisma.order.create({ data });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

// 🚩
export const getOrderById = (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    const order = prisma.order.findUnique({
      where: { id },
      select: {
        title: true,
        description: true,
        createdById: true,
        createdAt: true,
      },
    });

    if (!order) {
      res.status(404).json({
        ok: false,
        message: "Order doesn't exist",
      });
    }

    return res.json(order);
  } catch (err) {
    next(err);
  }
};

export const updateOrder = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const order = prisma.order.findUnique({ where: { id } });
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const order = prisma.order.findUnique({ where: { id } });
  } catch (err) {
    next(err);
  }
};

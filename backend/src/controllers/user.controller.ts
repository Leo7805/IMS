import { NextFunction, Request, Response } from 'express';
import prisma from '../db.js';

const listUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    res.json({
      ok: false,
      message: 'hi',
    });
  } catch (err) {
    next(err);
  }
};

const createStaff = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    res.json({
      ok: false,
      message: 'hi',
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    res.json({
      ok: false,
      message: 'hi',
    });
  } catch (err) {
    next(err);
  }
};

export { listUsers, createStaff, updateUser };

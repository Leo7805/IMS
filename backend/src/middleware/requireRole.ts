import { Request, Response, NextFunction } from 'express';
import type { Role } from '@prisma/client';

const requireRole = (role: Role) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: 'Not authenticated',
      });
    }

    if (user.role !== role) {
      return res.status(403).json({
        ok: false,
        message: 'Forbidden: insufficient permission',
      });
    }

    next();
  };
};

export default requireRole;

import { Request, Response, NextFunction } from 'express';

const requireRole = (role: 'admin' | 'staff') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

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

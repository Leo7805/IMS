import type { Role } from '@prisma/client';
import type { OrderSelected } from '../orders/orders.select.ts';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: Role;
      };
      order?: OrderSelected;
    }
  }
}

export {};

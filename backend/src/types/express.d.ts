import type { Role } from '@prisma/client';
import type { OrderSelected } from '../selects/order.select.js';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        role: Role;
      };
      order?: OrderSelected;
    }
  }
}

export {};

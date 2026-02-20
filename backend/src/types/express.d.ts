import type { Role } from '@/generated/prisma/client.js';
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

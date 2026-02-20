import { Router } from 'express';
import { requireRole } from '../auth/index.js';
import { requireOrderAccess } from './requireOrderAccess.js';
import {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
} from './orders.controller.js';
import { Role } from '@/generated/prisma/client.js';
import orderItemsRouter from '../orderItems/orderItems.route.js';

const router = Router();

// Public list (admin or assigned staff via SQL filtering)
router.get('/', getOrders);

// Create order (admin only)
router.post('/', requireRole(Role.ADMIN), createOrder);

// Delete order (admin only)
router.delete('/:orderId', requireRole(Role.ADMIN), deleteOrder);

// Everything below requires order-level access
router.use('/:orderId', requireOrderAccess);

// Get single order
router.get('/:orderId', getOrderById);

// Update order
router.patch('/:orderId', updateOrder);

// Order items
router.use('/:orderId/items', orderItemsRouter);

export default router;

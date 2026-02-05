import { Router } from 'express';
// import requireAuth from '../middleware/requireAuth.js';
import requireRole from '../middleware/requireRole.js';
import authorizeOrderAccess from '../middleware/authorizeOrderAccess.js';
import {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/orders.controller.js';
import { Role } from '@prisma/client';

const router = Router();

// Get order list (ADMIN or staff.id === order.assignedToId), filter order in SQL
router.get('/', getOrders);

// Get single order (ADMIN or staff.id === order.assignedToId)
router.get('/:id', authorizeOrderAccess, getOrderById);

// Update order, (ADMIN or staff.id === order.assignedToId)
router.patch('/:id', authorizeOrderAccess, updateOrder);

// Create order, admin only
router.post('/', requireRole(Role.ADMIN), createOrder);

// Delete order, admin only
router.delete('/:id', requireRole(Role.ADMIN), deleteOrder);

export default router;

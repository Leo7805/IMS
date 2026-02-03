import { Router } from 'express';
import requireAuth from '../middleware/requireAuth.js';
import requireRole from '../middleware/requireRole.js';
import {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/order.controller.js';

const router = Router();

router.use(requireAuth);

router.get('/', getOrders); // Get order list
router.post('/', requireRole('ADMIN'), createOrder);
router.get('/:id', getOrderById); // Get single order
router.patch('/:id', updateOrder); // Update order
router.delete('/:id', requireRole('ADMIN'), deleteOrder); // Delete order, admin only

export default router;

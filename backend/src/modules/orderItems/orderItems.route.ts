import { Router } from 'express';
import {
  getOrderItems,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
} from './orderItems.controller.js';

const router = Router({ mergeParams: true });

router.get('/', getOrderItems);
router.post('/', createOrderItem);
router.patch('/:itemId', updateOrderItem);
router.delete('/:itemId', deleteOrderItem);

export default router;

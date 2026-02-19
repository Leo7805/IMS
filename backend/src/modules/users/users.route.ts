import { Router } from 'express';
import { listUsers, createStaff, updateUser } from './users.controller.js';

const router = Router();

router.get('/', listUsers);
router.post('/', createStaff);
router.patch('/:id', updateUser);

export default router;

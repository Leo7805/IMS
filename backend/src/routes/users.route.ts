import { Router } from 'express';
// import requireAuth from '../middleware/requireAuth.js';
// import requireRole from '../middleware/requireRole.js';
import {
  listUsers,
  createStaff,
  updateUser,
} from '../controllers/users.controller.js';

const router = Router();

// router.use(requireAuth);
// router.use(requireRole('ADMIN'));

router.get('/', listUsers);
router.post('/', createStaff);
router.patch('/:id', updateUser);

export default router;

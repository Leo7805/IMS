import { Router } from 'express';
import requireAuth from '../middleware/requireAuth.js';
import requireRole from '../middleware/requireRole.js';

const router = Router();

router.use(requireAuth);
router.use(requireRole('ADMIN'));

router.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'Welcome, admin',
  });
});

export default router;

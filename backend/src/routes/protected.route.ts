import { Router } from 'express';
import requireAuth from '../middleware/requireAuth.js';

const router = Router();

router.get('/api/protected', requireAuth, (req, res) => {
  res.json({
    ok: true,
    messsage: 'You are authenticated',
    user: (req as any).user,
  });
});

export default router;

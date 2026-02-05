import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    ok: true,
    messsage: 'You are authenticated',
    user: req.user,
  });
});

export default router;

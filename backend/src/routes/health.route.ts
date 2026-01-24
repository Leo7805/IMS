import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ ok: true });
});

router.get('/boom', (req, res, next) => {
  next(new Error('boom via next'));
});

export default router;

import { Router } from 'express';
import { registerAuth, loginAuth } from './auth.controller.js';

const router = Router();

router.post('/register', registerAuth);

// POST /api/auth/login
router.post('/login', loginAuth);

export default router;

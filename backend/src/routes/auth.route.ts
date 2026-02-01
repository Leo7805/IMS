import { Router } from 'express';
import { registerAuth, loginAuth } from '../controllers/auth.controller.js';

const router = Router();

// POST /api/auth/register
router.post('/register', registerAuth);

// POST /api/auth/login
router.post('/login', loginAuth);

export default router;

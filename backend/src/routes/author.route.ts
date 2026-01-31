import { Router } from 'express';
import { registerAuthor } from '../controllers/author.controller.js';
import { loginAuthor } from '../controllers/author.controller.js';

const router = Router();

// POST /api/auth/register
router.post('/register', registerAuthor);

// POST /api/auth/login
router.post('/login', loginAuthor);

export default router;

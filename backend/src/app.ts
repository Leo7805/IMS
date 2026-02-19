import express from 'express';
import healthRouter from './modules/health/health.route.js';
import authRouter from './modules/auth/auth.route.js';
import usersRouter from './modules/users/users.route.js';
import ordersRouter from './modules/orders/orders.route.js';
import errorHandler from './error/error.js';
import { requireAuth, requireRole } from './modules/auth/index.js';
import { Role } from '@prisma/client';

const app = express();

app.use(express.json());

app.use('/api/health', healthRouter); // health check
app.use('/api/auth', authRouter); // public login/register
app.use('/api/users', requireAuth, requireRole(Role.ADMIN), usersRouter); // admin-only user management
app.use('/api/orders', requireAuth, ordersRouter); // Orders Router

app.use(errorHandler);

export default app;

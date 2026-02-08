import express from 'express';
import healthRouter from './health/health.route.js';
import authRouter from './auth/auth.route.js';
import usersRouter from './users/users.route.js';
import ordersRouter from './orders/orders.route.js';
import errorHandler from './middleware/error.js';
import requireAuth from './middleware/requireAuth.js';
import requireRole from './middleware/requireRole.js';

const app = express();

app.use(express.json());

app.use('/api/health', healthRouter); // health check
app.use('/api/auth', authRouter); // public login/register
app.use('/api/users', requireAuth, requireRole('ADMIN'), usersRouter); // admin-only user management
app.use('/api/orders', requireAuth, ordersRouter); // Orders Router

app.use(errorHandler);

export default app;

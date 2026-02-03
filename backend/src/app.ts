import express from 'express';
import healthRouter from './routes/health.route.js';
import authRouter from './routes/auth.route.js';
import protectedRouter from './routes/protected.route.js';
import adminRouter from './routes/admin.route.js';
import usersRouter from './routes/users.route.js';
import ordersRouter from './routes/orders.route.js';
import errorHandler from './middleware/error.js';

const app = express();

app.use(express.json());

app.use('/api/health', healthRouter); // health check
app.use('/api/auth', authRouter); // public login/register
app.use('/api/protected', protectedRouter); // authenticated routes
app.use('/api/admin', adminRouter); // admin‑specific features
app.use('/api/users', usersRouter); // admin-only user management
app.use('/api/orders', ordersRouter); // admin-only orders

app.use(errorHandler);

export default app;

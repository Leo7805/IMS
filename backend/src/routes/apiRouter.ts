import { Router } from 'express';
import healthRouter from '@/modules/health/health.route.js';
import authRouter from '@/modules/auth/auth.route.js';
import usersRouter from '@/modules/users/users.route.js';
import ordersRouter from '@/modules/orders/orders.route.js';
import { requireAuth, requireRole } from '@/modules/auth/index.js';
import { Role } from '@/generated/prisma/client.js';

const apiRouter = Router();

apiRouter.use('/health', healthRouter); // health check
apiRouter.use('/auth', authRouter); // public login/register
apiRouter.use('/users', requireAuth, requireRole(Role.ADMIN), usersRouter); // admin-only user management
apiRouter.use('/orders', requireAuth, ordersRouter); // Orders Router

export default apiRouter;

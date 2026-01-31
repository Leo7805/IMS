import express from 'express';
import healthRouter from './routes/health.route.js';
import authorRouter from './routes/author.route.js';
import protectedRouter from './routes/protected.route.js';
import adminOnlyRouter from './routes/adminOnly.route.js';
import errorHandler from './middleware/error.js';

const app = express();

app.use(express.json());

app.use(healthRouter);

app.use('/api/auth', authorRouter);

app.use(protectedRouter);

app.use(adminOnlyRouter);

app.use(errorHandler);

export default app;

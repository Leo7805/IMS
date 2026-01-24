import express from 'express';
import healthRouter from './routes/health.route.js';
import errorHandler from './middleware/error.middleware.js';

const app = express();

app.use(express.json());

app.use(healthRouter);

app.use(errorHandler);

export default app;

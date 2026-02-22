import express from 'express';
import errorHandler from '@/error/error.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '@/config/swagger.js';
import { env } from '@/config/env.js';
import apiRouter from '@/routes/apiRouter.js';

const app = express();

if (env.SWAGGER_ENABLED === 'true') {
  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        displayOperationId: false,
      },
    }),
  );
}

app.use(express.json());

app.use('/api', apiRouter);

app.use(errorHandler);

export default app;

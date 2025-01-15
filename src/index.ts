import { OpenAPIHono } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';
import { cors } from 'hono/cors';

import { env } from './configs/env.config';
import { apiRouter } from './controllers/api.controller';

export const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json({ errors: result.error.flatten() }, 400);
    }
  },
});

app.use(
  '/api/*',
  cors({
    credentials: true,
    origin: env.ALLOWED_ORIGINS,
  }),
);

app.get('/', (c) => c.json({ message: 'Server runs successfully' }));

app.route('/api', apiRouter);

app.doc('/openapi.json', {
  openapi: '3.1.0',
  info: {
    version: '1.0',
    title: 'Kataloka API',
  },
  tags: [
    { name: 'auth', description: 'Authentication API' },
    { name: 'user', description: 'User API' },
    { name: 'quiz', description: 'Quiz API' },
  ],
});

app.get(
  '/docs',
  apiReference({
    theme: 'purple',
    spec: {
      url: '/openapi.json',
    },
  }),
);

console.log(`Server is running on port ${app.fetch}`);

export default {
  fetch: app.fetch,
  port: env.PORT,
};

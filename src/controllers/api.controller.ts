import { OpenAPIHono } from '@hono/zod-openapi';

import { authProtectedRouter, authRouter } from './auth.controller';
import { healthRouter } from './health.controller';
import { userProtectedRouter } from './user.controller';

const unprotectedApiRouter = new OpenAPIHono();
unprotectedApiRouter.route('/', healthRouter);
unprotectedApiRouter.route('/', authRouter);

const protectedApiRouter = new OpenAPIHono();
protectedApiRouter.route('/', authProtectedRouter);
protectedApiRouter.route('/', userProtectedRouter);

export const apiRouter = new OpenAPIHono();
apiRouter.route('/', unprotectedApiRouter);
apiRouter.route('/', protectedApiRouter);

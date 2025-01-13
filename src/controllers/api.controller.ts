import { OpenAPIHono } from '@hono/zod-openapi';

import { authProtectedRouter, authRouter } from './auth.controller';
import { healthRouter } from './health.controller';
import { quizProtectedRouter } from './quiz.controller';
import { userProtectedRouter } from './user.controller';

const unprotectedApiRouter = new OpenAPIHono();
unprotectedApiRouter.route('/', healthRouter);
unprotectedApiRouter.route('/', authRouter);

const protectedApiRouter = new OpenAPIHono();
protectedApiRouter.route('/', authProtectedRouter);
protectedApiRouter.route('/', userProtectedRouter);
protectedApiRouter.route('/', quizProtectedRouter);

export const apiRouter = new OpenAPIHono();
apiRouter.route('/', unprotectedApiRouter);
apiRouter.route('/', protectedApiRouter);

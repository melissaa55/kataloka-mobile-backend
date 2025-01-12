import { createRoute } from '@hono/zod-openapi';
import { UpdateUserBodySchema, UserSchema } from '~/types/user.type';

import { createErrorResponse } from '../utils/error-response-factory';

export const updateUserRoute = createRoute({
  operationId: 'updateUser',
  tags: ['user'],
  method: 'put',
  path: '/user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: UpdateUserBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'User profile updated.',
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

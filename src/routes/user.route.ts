import { createRoute } from '@hono/zod-openapi';
import {
  scoreSchema,
  UpdateUserBodySchema,
  UpdateUserScoreBodySchema,
  UserSchema,
} from '~/types/user.type';

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

export const updateUserScoreRoute = createRoute({
  operationId: 'updateUserScore',
  tags: ['user'],
  method: 'put',
  path: '/user/score',
  request: {
    body: {
      content: {
        'application/json': {
          schema: UpdateUserScoreBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'User score updated.',
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

export const getUserScoreRoute = createRoute({
  operationId: 'getUserScore',
  tags: ['user'],
  method: 'put',
  path: '/user/score',
  responses: {
    200: {
      description: 'User score updated.',
      content: {
        'application/json': {
          schema: scoreSchema,
        },
      },
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});


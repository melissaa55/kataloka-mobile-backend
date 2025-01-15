import { createRoute } from '@hono/zod-openapi';
import { LoginBodySchema, RegisterBodySchema } from '~/types/auth.type';
import { UserSchema } from '~/types/user.type';

import { createErrorResponse } from '../utils/error-response-factory';

export const registerRoute = createRoute({
  operationId: 'register',
  tags: ['auth'],
  method: 'post',
  path: '/auth/register',
  request: {
    body: {
      content: {
        'application/json': {
          schema: RegisterBodySchema,
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Registration succesful.',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const loginRoute = createRoute({
  operationId: 'login',
  tags: ['auth'],
  method: 'post',
  path: '/auth/login',
  request: {
    body: {
      content: {
        'application/json': {
          schema: LoginBodySchema,
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Login succesful',
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

export const logoutRoute = createRoute({
  operationId: 'logout',
  tags: ['auth'],
  method: 'post',
  path: '/auth/logout',
  responses: {
    200: {
      description: 'Logout sucessful',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    401: createErrorResponse('UNION', 'Unauthorized'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const selfRoute = createRoute({
  operationId: 'self',
  tags: ['auth'],
  method: 'get',
  path: '/auth/self',
  responses: {
    200: {
      description: 'Get self',
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
    },
    401: createErrorResponse('GENERIC', 'Unauthorized'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

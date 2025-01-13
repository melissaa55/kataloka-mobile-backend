import { createRoute } from '@hono/zod-openapi';
import { QuizListSchema } from '~/types/quiz.type';

import { createErrorResponse } from '../utils/error-response-factory';

export const getQuizRoute = createRoute({
  operationId: 'getQuiz',
  tags: ['quiz'],
  method: 'get',
  path: '/quiz',
  responses: {
    200: {
      description: 'Get Quiz',
      content: {
        'application/json': {
          schema: QuizListSchema,
        },
      },
    },
    401: createErrorResponse('GENERIC', 'Unauthorized'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

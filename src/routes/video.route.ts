import { createRoute } from '@hono/zod-openapi';
import { VideoListSchema, VideoTitleQuerySchema } from '~/types/video.type';

import { createErrorResponse } from '../utils/error-response-factory';

export const getVideoRoute = createRoute({
  operationId: 'getVideo',
  tags: ['video'],
  method: 'get',
  path: '/video',
  request: {
    query: VideoTitleQuerySchema
  },
  responses: {
    200: {
      description: 'Get Video',
      content: {
        'application/json': {
          schema: VideoListSchema,
        },
      },
    },
    401: createErrorResponse('GENERIC', 'Unauthorized'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

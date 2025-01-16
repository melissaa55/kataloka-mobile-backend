import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { video } from '~/db/schema';

export const VideoSchema = createSelectSchema(video)
  .extend({
    watched: z.boolean().default(false),
  })
  .openapi('Video');

export const VideoListSchema = z.array(VideoSchema);

export const VideoTitleQuerySchema = z.object({
  title: z
    .string()
    .min(1, 'Title required')
    .openapi({
      param: {
        in: 'query',
        required: true,
      },
    }),
});

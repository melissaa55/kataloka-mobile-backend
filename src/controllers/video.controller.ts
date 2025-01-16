import { db } from '~/db/drizzle';
import { getVideo } from '~/repositories/video.repository';
import { getVideoRoute } from '~/routes/video.route';
import { createAuthRouter } from '~/utils/router-factory';

export const videoProtectedRouter = createAuthRouter();

videoProtectedRouter.openapi(getVideoRoute, async (c) => {
  try {
    const { title } = c.req.valid('query');

    const res = await getVideo(db, c.var.user.id, title);

    return c.json(res, 200);
  } catch (err) {
    if (err instanceof Error) {
      return c.json(
        {
          error: err.message,
        },
        400,
      );
    }

    return c.json(
      {
        error: 'Unexpected error occured',
      },
      500,
    );
  }
});

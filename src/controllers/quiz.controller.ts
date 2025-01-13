import { db } from '~/db/drizzle';
import { getQuiz } from '~/repositories/quiz.repository';
import { getQuizRoute } from '~/routes/quiz.route';
import { createAuthRouter } from '~/utils/router-factory';

export const quizProtectedRouter = createAuthRouter();

quizProtectedRouter.openapi(getQuizRoute, async (c) => {
  try {
    const res = await getQuiz(db, 10);

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

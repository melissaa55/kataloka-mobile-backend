import { Database } from '~/db/drizzle';
import { quiz } from '~/db/schema';

export const getQuiz = async (db: Database, count: number = 10) => {
  return await db.select().from(quiz).limit(count);
};

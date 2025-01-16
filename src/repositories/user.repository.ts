import { count, eq } from 'drizzle-orm';
import { Database } from '~/db/drizzle';
import { first } from '~/db/helper';
import { quiz, user } from '~/db/schema';
import { CreateUserType, UpdateUserType } from '~/types/user.type';

export const findUserByEmail = async (db: Database, email: string) => {
  return await db.select().from(user).where(eq(user.email, email)).then(first);
};

export const createUser = async (db: Database, data: CreateUserType) => {
  return await db.insert(user).values(data).returning().then(first);
};

export const updateUser = async (
  db: Database,
  userId: string,
  data: UpdateUserType,
) => {
  return await db
    .update(user)
    .set({ ...data })
    .where(eq(user.id, userId))
    .returning()
    .then(first);
};

export const updateUserScore = async (
  db: Database,
  userId: string,
  score: number,
) => {
  return await db
    .update(user)
    .set({ quizScore: score })
    .where(eq(user.id, userId))
    .returning()
    .then(first);
};

export const getUserScore = async (db: Database, userId: string) => {
  const score = await db.query.user.findFirst({
    where: eq(user.id, userId),
    columns: {
      quizScore: true,
    },
  });

  const totalScore = await db.select({ count: count() }).from(quiz);

  return {
    score,
    totalScore,
  };
};

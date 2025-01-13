import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { quiz } from '~/db/schema';

export const QuizSchema = createSelectSchema(quiz, {
  choice: z.array(z.string()),
}).openapi('Quiz');

export const QuizListSchema = z.array(QuizSchema);

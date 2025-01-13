import { type InferSelectModel } from 'drizzle-orm';
import { integer, json, pgTable, text } from 'drizzle-orm/pg-core';

import { createId } from '../../utils/drizzle-schema-util';

export const quiz = pgTable('quiz', {
  id: text('id').primaryKey().$defaultFn(createId),
  question: text('question').notNull(),
  choice: json().$type<string[]>(),
  answerIdx: integer('answer_idx').notNull(),
});

export type Quiz = InferSelectModel<typeof quiz>;

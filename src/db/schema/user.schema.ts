import { type InferSelectModel } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { createId, getNow } from '../../utils/drizzle-schema-util';

export const user = pgTable('user', {
  id: text('id').primaryKey().$defaultFn(createId),
  email: text('email').notNull().unique(),
  fullName: text('full_name'),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});

export type User = InferSelectModel<typeof user>;

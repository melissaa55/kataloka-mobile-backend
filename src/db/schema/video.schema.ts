import { type InferSelectModel, relations } from 'drizzle-orm';
import { integer, json, pgTable, text } from 'drizzle-orm/pg-core';

import { createId } from '../../utils/drizzle-schema-util';
import { user } from './user.schema';

export const video = pgTable('video', {
  id: text('id').primaryKey().$defaultFn(createId),
  title: text('question').notNull(),
  videoUrl: text('video_url').notNull(),
});

export type Video = InferSelectModel<typeof video>;

export const watched = pgTable('watched', {
  userId: text('user_id').references(() => user.id),
  videoId: text('video_id').references(() => video.id),
});
export const watchedRelation = relations(watched, ({ one }) => ({
  user: one(user, {
    fields: [watched.userId],
    references: [user.id],
  }),
  video: one(video, {
    fields: [watched.videoId],
    references: [video.id],
  }),
}));

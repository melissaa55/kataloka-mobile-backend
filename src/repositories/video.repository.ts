import { and, eq } from 'drizzle-orm';
import { Database } from '~/db/drizzle';
import { first } from '~/db/helper';
import { video, watched } from '~/db/schema';

export const getVideo = async (db: Database, userId: string, title: string) => {
  const vid = await db.select().from(video).where(eq(video.title, title));
  const data = [];
  for (const v of vid) {
    const isWatched = await db
      .select()
      .from(watched)
      .where(and(eq(watched.videoId, v.id), eq(watched.userId, userId)))
      .then(first);

    data.push({
      ...v,
      watched: !!isWatched,
    });
  }

  return data;
};

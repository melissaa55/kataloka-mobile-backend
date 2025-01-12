import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { user } from '~/db/schema';

export const UserSchema = createSelectSchema(user, {
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
}).openapi('User');

export const CreateUserSchema = createInsertSchema(user, {
  password: z.string().min(8, 'Password must have minimum length of 8'),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateUserType = z.infer<typeof CreateUserSchema>;

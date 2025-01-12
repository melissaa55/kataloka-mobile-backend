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

export const UpdateUserBodySchema = z
  .object({
    email: z.string().email().min(1, 'Email required!'),
    fullName: z.string().optional(),
    password: z.string().optional(),
    currentPassword: z.string().optional(),
  })
  .refine((data) => !data.password || (data.password && data.currentPassword), {
    message: 'Current password required to update password',
  })
  .refine(
    (data) => !data.password || (data.password && data.password.length >= 8),
    {
      message: 'Password must have minimum length of 8',
    },
  );
export const UpdateUserSchema = z.object({
  password: z.string().optional(),
  fullName: z.string().optional(),
});
export type UpdateUserType = z.infer<typeof UpdateUserSchema>;

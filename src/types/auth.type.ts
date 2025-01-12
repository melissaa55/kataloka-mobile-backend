import { z } from '@hono/zod-openapi';

import { CreateUserSchema, UserSchema } from './user.type';

export const JWTPayloadSchema = UserSchema.openapi('JWTPayload');

export const LoginBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const RegisterBodySchema = CreateUserSchema;

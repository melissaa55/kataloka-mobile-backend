import type { Context } from 'hono';
import { deleteCookie, setCookie } from 'hono/cookie';
import * as jwt from 'hono/jwt';
import { env } from '~/configs/env.config';
import { db } from '~/db/drizzle';
import type { User } from '~/db/schema/user.schema';
import { createUser, findUserByEmail } from '~/repositories/user.repository';
import {
  loginRoute,
  logoutRoute,
  registerRoute,
  selfRoute,
} from '~/routes/auth.route';
import { UserSchema } from '~/types/user.type';
import { hashPassword, verifyPassword } from '~/utils/password-hash';

import { createAuthRouter, createRouter } from '../utils/router-factory';

export const authRouter = createRouter();
export const authProtectedRouter = createAuthRouter();

const generateAccessToken = async (user: User) => {
  const payload = {
    ...user,
    exp: Math.floor(Date.now() / 1000) + env.TOKEN_EXPIRATION_TIME,
  };
  const token = await jwt.sign(payload, env.JWT_SECRET);
  return token;
};

const setCookiesToken = async (c: Context, user: User) => {
  const accessToken = await generateAccessToken(user);

  setCookie(c, 'kataThor', accessToken, {
    path: '/',
    secure: true,
    httpOnly: true,
    maxAge: env.TOKEN_EXPIRATION_TIME,
    sameSite: 'None',
  });

  return { accessToken };
};

authRouter.openapi(registerRoute, async (c) => {
  try {
    const { email, fullName, password } = c.req.valid('json');

    // Check Existing User
    const user = await findUserByEmail(db, email);
    if (user) {
      return c.json({ message: 'User already exist' }, 400);
    }

    const passwordHash = await hashPassword(password);

    const newUser = await createUser(db, {
      email,
      fullName,
      password: passwordHash,
    });

    return c.json(newUser, 200);
  } catch (err) {
    if (err instanceof Error) {
      return c.json(
        {
          error: err.message,
        },
        400,
      );
    }

    return c.json(
      {
        error: 'Unexpected error occured',
      },
      500,
    );
  }
});

authRouter.openapi(loginRoute, async (c) => {
  const { email, password } = c.req.valid('json');

  const user = await findUserByEmail(db, email);

  if (!user) {
    return c.json({ message: 'Invalid Credentials!' }, 400);
  }
  if (!(await verifyPassword(password, user.password))) {
    return c.json({ message: 'Invalid Credentials!' }, 400);
  }

  // Login user
  const { accessToken } = await setCookiesToken(c, user);
  return c.json(
    {
      accessToken,
    },
    200,
  );
});

authProtectedRouter.openapi(logoutRoute, async (c) => {
  deleteCookie(c, 'kataThor');
  return c.json({}, 200);
});

authProtectedRouter.openapi(selfRoute, async (c) => {
  const user = await UserSchema.parseAsync(c.var.user);
  return c.json(user, 200);
});

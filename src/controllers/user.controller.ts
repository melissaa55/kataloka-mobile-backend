import { db } from '~/db/drizzle';
import {
  findUserByEmail,
  updateUser,
  updateUserScore,
} from '~/repositories/user.repository';
import { updateUserRoute, updateUserScoreRoute } from '~/routes/user.route';
import { hashPassword, verifyPassword } from '~/utils/password-hash';
import { createAuthRouter } from '~/utils/router-factory';

export const userProtectedRouter = createAuthRouter();

userProtectedRouter.openapi(updateUserRoute, async (c) => {
  try {
    const { email, fullName, password, currentPassword } = c.req.valid('json');

    // Check Existing User
    const user = await findUserByEmail(db, email);
    if (!user) {
      return c.json({ message: 'User not found' }, 400);
    }

    // Check current password
    if (password) {
      if (!currentPassword)
        return c.json(
          {
            error: 'Current password required to update password',
          },
          400,
        );

      if (!(await verifyPassword(currentPassword, user.password)))
        return c.json(
          {
            error: 'Invalid credentials!',
          },
          400,
        );

      const newPasswordHash = await hashPassword(password);
      const res = await updateUser(db, c.var.user.id, {
        fullName: fullName?.length ? fullName : undefined,
        password: newPasswordHash,
      });

      return c.json(res, 201);
    } else if (fullName) {
      const res = await updateUser(db, c.var.user.id, {
        fullName,
      });

      return c.json(res, 201);
    }

    return c.json(
      {
        message: 'Nothing changed!',
      },
      200,
    );
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

userProtectedRouter.openapi(updateUserScoreRoute, async (c) => {
  try {
    const { score } = c.req.valid('json');

    if (score < 0) {
      return c.json(
        {
          error: 'Score must be greater than or equal to 0',
        },
        400,
      );
    }

    const res = await updateUserScore(db, c.var.user.id, score);

    return c.json(res, 201);
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

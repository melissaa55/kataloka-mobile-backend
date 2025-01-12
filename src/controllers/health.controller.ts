import {
  getHealthStatusProtectedRoute,
  getHealthStatusRoute,
} from '~/routes/health.route';
import { createAuthRouter, createRouter } from '~/utils/router-factory';

export const healthRouter = createRouter();
export const healthProtectedRouter = createAuthRouter();

healthRouter.openapi(getHealthStatusRoute, async (c) => {
  return c.json(
    {
      message: 'API is running sucesfully!',
    },
    200,
  );
});

healthProtectedRouter.openapi(getHealthStatusProtectedRoute, async (c) => {
  return c.json(
    {
      message: 'API is running sucesfully!',
    },
    200,
  );
});

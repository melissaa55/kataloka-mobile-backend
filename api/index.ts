import { handle } from '@hono/node-server/vercel';

// @ts-expect-error - ignore
import app from '../.dist/src/index';

export default handle(app);

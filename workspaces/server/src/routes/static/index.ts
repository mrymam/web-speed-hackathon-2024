import path from 'node:path';

import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';

import { CLIENT_STATIC_PATH,SERVER_IMAGE_PATH } from '../../constants/paths';

const app = new Hono();

app.use(
  '/dist/images/*',
  serveStatic({
    root: path.relative(process.cwd(), SERVER_IMAGE_PATH),
  }),
);

app.use(
  '*',
  serveStatic({
    root: path.relative(process.cwd(), CLIENT_STATIC_PATH),
  }),
);

export { app as staticApp };

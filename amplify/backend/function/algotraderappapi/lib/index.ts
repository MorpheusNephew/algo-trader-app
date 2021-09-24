import { loadConfig } from './middleware/loadConfig';
import router from './routes';
import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import ServerlessHttp from 'serverless-http';

const app = new Koa()
  .use(cors())
  .use(bodyParser())
  .use(loadConfig)
  .use(router.routes());

export const handler = ServerlessHttp(app);

import checkUsername from './middleware/checkUsername';
import { router } from './routes';
import cors from '@koa/cors';
import Koa from 'koa';
import ServerlessHttp from 'serverless-http';

const app = new Koa().use(cors()).use(checkUsername).use(router.routes());

export const handler = ServerlessHttp(app);

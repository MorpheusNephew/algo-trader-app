import checkUser from './middleware/checkUser';
import router from './routes';
import cors from '@koa/cors';
import Koa from 'koa';
import ServerlessHttp from 'serverless-http';

const app = new Koa().use(cors()).use(checkUser).use(router.routes());

export const handler = ServerlessHttp(app);

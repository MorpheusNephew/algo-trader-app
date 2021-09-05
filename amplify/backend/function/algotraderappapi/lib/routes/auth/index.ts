import tdAuthRouter from './td';
import Router from '@koa/router';

const authRouter = new Router({ prefix: '/auth' }).use(tdAuthRouter.routes());

export default authRouter;

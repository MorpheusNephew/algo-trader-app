import apiRouter from './api';
import Router from '@koa/router';

const router = new Router().use(apiRouter.routes());

export default router;

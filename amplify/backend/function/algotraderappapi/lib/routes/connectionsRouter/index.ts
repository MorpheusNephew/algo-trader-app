import tdRouter from './td';
import Router from '@koa/router';

const connectionsRouter = new Router({ prefix: '/connections' }).use(
  tdRouter.routes()
);

export default connectionsRouter;

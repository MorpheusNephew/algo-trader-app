import tdConnectionsRouter from './td';
import Router from '@koa/router';

const connectionsRouter = new Router({ prefix: '/connections' }).use(
  tdConnectionsRouter.routes()
);

export default connectionsRouter;

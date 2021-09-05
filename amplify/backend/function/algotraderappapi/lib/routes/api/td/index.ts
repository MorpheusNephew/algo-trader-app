import { loadTdAmeritradeClient } from '../../../middleware/loadTdAmeritradeClient';
import tdConnectionsRouter from './connections';
import Router from '@koa/router';

const tdRouter = new Router({ prefix: '/td' })
  .use(loadTdAmeritradeClient)
  .use(tdConnectionsRouter.routes());

export default tdRouter;

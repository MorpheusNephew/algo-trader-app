import { loadTdAmeritradeClient } from '../../../middleware/loadTdAmeritradeClient';
import Router from '@koa/router';

const tdRouter = new Router({ prefix: '/td' }).use(loadTdAmeritradeClient);

export default tdRouter;

import { getCognitoUser } from '../services/cognito';
import { AppContext } from '../types';
import { Next } from 'koa';

const loggerOptions = {
  fileName: 'loadUser.ts',
};

export const loadUser = async (ctx: AppContext, next: Next) => {
  const { logger } = ctx.state;

  logger.info('Loading user', loggerOptions);
  logger.info('Getting cognito user', loggerOptions);
  const authenticatedUser = await getCognitoUser(ctx);

  if (!authenticatedUser) {
    const message = 'User not found';
    logger.error(message, loggerOptions);
    ctx.throw(message, 404);
  }

  ctx.state.authenticatedUser = authenticatedUser;
  logger.info('User loaded', loggerOptions);

  await next();
};

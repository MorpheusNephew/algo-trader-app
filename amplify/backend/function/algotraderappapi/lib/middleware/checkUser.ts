import { getCognitoUser } from '../services/cognito';
import { AppContext } from '../types';
import { Next } from 'koa';

const checkUser = async (ctx: AppContext, next: Next) => {
  const authenticatedUser = await getCognitoUser(ctx);

  if (!authenticatedUser) {
    ctx.throw('User not found', 404);
  }

  ctx.state.authenticatedUser = authenticatedUser;

  await next();
};

export default checkUser;

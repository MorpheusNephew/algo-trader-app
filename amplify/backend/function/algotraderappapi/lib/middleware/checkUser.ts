import { getCognitoUser } from '../services/cognito';
import { Next } from 'koa';

const checkUser = async (ctx: any, next: Next) => {
  const authenticatedUser = await getCognitoUser(ctx);

  if (!authenticatedUser) {
    ctx.throw('User not found', 404);
  }

  console.log('User', JSON.stringify(authenticatedUser));

  ctx.state.authenticatedUser = authenticatedUser;

  await next();
};

export default checkUser;

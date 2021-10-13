import { AppContext } from '../types';
import TdAmeritradeClient from '@morpheusnephew/td-ameritrade/dist/clients';
import { IConnection } from '/opt/nodejs/connectionTypes';
import { convertTokenToIConnection } from '/opt/nodejs/connectionUtils';
import { differenceInSeconds, parseISO } from 'date-fns';
import { Next } from 'koa';
import { isEmpty } from 'lodash';
import {
  getConnections,
  updateConnectionTokens,
} from '/opt/nodejs/connectiondb';

export const loadTdAmeritradeClient = async (ctx: AppContext, next: Next) => {
  const { redirectUrl } = ctx.query;
  const {
    authenticatedUser: { username },
  } = ctx.state;

  const tdAmeritradeClient = new TdAmeritradeClient({
    clientId: ctx.state.config.tdConsumerKey,
    redirectUri: redirectUrl as string,
  });

  const { accessToken } = await getUserTdConnection(
    tdAmeritradeClient,
    username
  );

  if (accessToken) {
    tdAmeritradeClient.accessToken = accessToken;
  }

  ctx.state.tdAmeritradeClient = tdAmeritradeClient;

  await next();
};

const getUserTdConnection = async (
  tdAmeritradeClient: TdAmeritradeClient,
  username: string
): Promise<IConnection> => {
  console.log('getUserTdConnection');
  const connections = await getConnections({ username, connectionType: 'td' });

  console.log('getUserTdConnection', 'connections', connections);

  if (isEmpty(connections)) {
    return null;
  }

  const connection = connections[0];

  console.log('getUserTdConnection', 'connection', connection);

  const {
    accessTokenExpiration,
    refreshToken,
    refreshTokenExpiration,
    connectionId,
  } = connection;
  let { accessToken } = connection;

  const now = new Date();
  const accessExpiration = parseISO(accessTokenExpiration);

  console.log(
    'getUserTdConnection',
    'parseISO(accessTokenExpiration',
    accessExpiration
  );

  if (differenceInSeconds(accessExpiration, now) > 10) {
    return { accessToken } as any;
  }

  tdAmeritradeClient.refreshToken = refreshToken;

  const { data: tokenResponse } =
    await tdAmeritradeClient.auth.refreshAccessToken();

  console.log('getUserTdConnection', 'tokenResponse', tokenResponse);

  const connectionToUpdate = await convertTokenToIConnection(
    tokenResponse,
    'td',
    connectionId
  );

  await updateConnectionTokens(username, connectionId, {
    ...connectionToUpdate,
    refreshToken,
    refreshTokenExpiration,
  });

  return connectionToUpdate;
};

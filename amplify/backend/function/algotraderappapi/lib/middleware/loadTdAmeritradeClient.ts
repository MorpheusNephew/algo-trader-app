import { AppContext } from '../types';
import TdAmeritradeClient from '@morpheusnephew/td-ameritrade/dist/clients';
import { convertTokenToIConnection } from '/opt/nodejs/connectionUtils';
import { IConnection } from '/opt/nodejs/types';
import { differenceInSeconds, parseISO } from 'date-fns';
import { Next } from 'koa';
import { isEmpty } from 'lodash';
import {
  getConnections,
  updateConnectionTokens,
} from '/opt/nodejs/connectiondb';

const loggerOptions = {
  fileName: 'loadTdAmeritradeClient.ts',
};

export const loadTdAmeritradeClient = async (ctx: AppContext, next: Next) => {
  const { redirectUrl } = ctx.query;
  const {
    authenticatedUser: { username },
    logger,
  } = ctx.state;

  logger.info('Loading TD Ameritrade client', loggerOptions);
  logger.info('Initializing TD Ameritrade client', loggerOptions);

  const tdAmeritradeClient = new TdAmeritradeClient({
    clientId: ctx.state.config.tdConsumerKey,
    redirectUri: redirectUrl as string,
  });

  logger.info('TD Ameritrade client initialized', loggerOptions);
  logger.info('Getting user TD connection', { ...loggerOptions, username });

  const { accessToken } = await getUserTdConnection(
    tdAmeritradeClient,
    username
  );

  logger.info('TD connection retrieved', loggerOptions);

  if (accessToken) {
    logger.info('Setting access token', loggerOptions);
    tdAmeritradeClient.accessToken = accessToken;
  }

  ctx.state.tdAmeritradeClient = tdAmeritradeClient;
  logger.info('TD Ameritrade client loaded', loggerOptions);

  await next();
};

const getUserTdConnection = async (
  tdAmeritradeClient: TdAmeritradeClient,
  username: string
): Promise<IConnection> => {
  const connections = await getConnections({ username, brokerage: 'td' });

  if (isEmpty(connections)) {
    return null;
  }

  const connection = connections[0];

  const {
    accessTokenExpiration,
    refreshToken,
    refreshTokenExpiration,
    connectionId,
  } = connection;
  let { accessToken } = connection;

  const now = new Date();
  const accessExpiration = parseISO(accessTokenExpiration);

  if (differenceInSeconds(accessExpiration, now) > 10) {
    return { accessToken } as any;
  }

  tdAmeritradeClient.refreshToken = refreshToken;

  const { data: tokenResponse } =
    await tdAmeritradeClient.auth.refreshAccessToken();

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

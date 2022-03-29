import logger from './logger';
import TdAmeritradeClient from '@morpheusnephew/td-ameritrade/clients';
import { getConfig } from '/opt/nodejs/config';
import { convertTokenToIConnection } from '/opt/nodejs/connectionUtils';
import { IConnection, TBrokerage } from '/opt/nodejs/types';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import {
  getConnections,
  updateConnectionTokens,
} from '/opt/nodejs/connectiondb';

const brokerage: TBrokerage = 'td';

export const handler = async (_event: any) => {
  const connections = await getConnections({ brokerage });

  const mapper = async (connection: IConnection) => {
    const currentDate = new Date();
    const tokenExpirationDate = parseISO(connection.refreshTokenExpiration);

    const daysDiff = differenceInCalendarDays(tokenExpirationDate, currentDate);

    if (daysDiff < 2) {
      const { tdConsumerKey } = await getConfig();
      const { connectionId, refreshToken, username } = connection;

      const client = new TdAmeritradeClient({
        refreshToken: refreshToken,
        clientId: tdConsumerKey,
      });

      logger.info('Updated refresh token for user', { username, connectionId });

      const { data: tokenResponse } = await client.auth.refreshRefreshToken();

      const connectionToUpdate = await convertTokenToIConnection(
        tokenResponse,
        brokerage,
        connectionId
      );

      await updateConnectionTokens(username, connectionId, connectionToUpdate);

      logger.info('Refresh token for user has been updated', {
        username,
        connectionId,
      });
    }

    return true;
  };

  await Promise.all(connections.map(mapper));

  const response = {
    statusCode: 200,
  };

  return response;
};

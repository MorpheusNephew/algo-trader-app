import TdAmeritradeClient from '@morpheusnephew/td-ameritrade/dist/clients';
import { Config } from '/opt/nodejs/config';
import { getConnections, saveConnection } from '/opt/nodejs/connectiondb';
import { IConnection, TConnection } from '/opt/nodejs/connectionTypes';
import { convertTokenToIConnection } from '/opt/nodejs/connectionUtils';
import { differenceInCalendarDays, parseISO } from 'date-fns';

const connectionType: TConnection = 'td';

export const handler = async (_event: any) => {
  const connections = await getConnections({ connectionType });

  const mapper = async (connection: IConnection) => {
    console.log('connection', JSON.stringify(connection));
    const currentDate = new Date();
    const tokenExpirationDate = parseISO(connection.refreshTokenExpiration);

    const daysDiff = differenceInCalendarDays(tokenExpirationDate, currentDate);

    if (daysDiff < 2) {
      const { tdConsumerKey } = await Config.getConfig();
      const { connectionId, refreshToken, username } = connection;

      console.log('Refresh the refresh token');
      const client = new TdAmeritradeClient({
        refreshToken: refreshToken,
        clientId: tdConsumerKey,
      });

      const { data: tokenResponse } = await client.auth.refreshRefreshToken();

      const connectionToSave = await convertTokenToIConnection(
        tokenResponse,
        connectionType,
        connectionId
      );

      console.log('connectionToSave', JSON.stringify(connectionToSave));

      await saveConnection(username, connectionToSave);
    }

    return true;
  };

  await Promise.all(connections.map(mapper));

  const response = {
    statusCode: 200,
  };

  return response;
};

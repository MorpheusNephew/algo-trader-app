import { getDateSecondsFromNow } from './utils';
import { Token } from '@morpheusnephew/td-ameritrade-models';
import { v4 as uuid } from 'uuid';
import { IConnection, IConnectionResponse, TBrokerage } from './types';

export const convertTokenToIConnection = async (
  token: Token,
  type: TBrokerage,
  connectionId?: string
): Promise<IConnection> => {
  const {
    access_token: accessToken,
    expires_in,
    refresh_token: refreshToken,
    refresh_token_expires_in,
  } = token;

  return {
    accessToken,
    refreshToken,
    connectionId: connectionId ?? uuid(),
    accessTokenExpiration: getDateSecondsFromNow(expires_in),
    refreshTokenExpiration:
      refresh_token_expires_in &&
      getDateSecondsFromNow(refresh_token_expires_in),
    type,
  };
};

export const convertIConnectionToIConnectionResponse = (
  connection: IConnection
): IConnectionResponse => {
  const { connectionId, type } = connection;
  return {
    id: connectionId,
    type,
  };
};

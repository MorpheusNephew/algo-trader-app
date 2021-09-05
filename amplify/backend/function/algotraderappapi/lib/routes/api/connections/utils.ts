import { getDateSecondsFromNow } from '../../../utils';
import { IConnection, IConnectionResponse, TConnection } from './types';
import { Token } from '@morpheusnephew/td-ameritrade-models';
import { v4 as uuid } from 'uuid';

export const convertTokenToIConnection = (
  token: Token,
  type: TConnection
): IConnection => {
  const { access_token, expires_in, refresh_token, refresh_token_expires_in } =
    token;

  return {
    accessToken: access_token,
    refreshToken: refresh_token,
    connectionId: uuid(),
    accessTokenExpiration: getDateSecondsFromNow(expires_in),
    refreshTokenExpiration: getDateSecondsFromNow(refresh_token_expires_in),
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

import { encryptItem, getDateSecondsFromNow } from './utils';
import { Token } from '@morpheusnephew/td-ameritrade-models';
import { v4 as uuid } from 'uuid';
import {
  IConnection,
  IConnectionResponse,
  TConnection,
} from './connectionTypes';

export const convertTokenToIConnection = async (
  token: Token,
  type: TConnection
): Promise<IConnection> => {
  const { access_token, expires_in, refresh_token, refresh_token_expires_in } =
    token;

  return {
    accessToken: await encryptItem(access_token),
    refreshToken: await encryptItem(refresh_token),
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

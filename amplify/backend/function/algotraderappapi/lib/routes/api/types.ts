export type TConnection = 'td';

export interface IConnection {
  accessToken: string;
  accessTokenExpiration: string;
  refreshToken: string;
  refreshTokenExpiration: string;
  type: TConnection;
}

export interface IConnectionResponse {
  id: string;
  type: TConnection;
}

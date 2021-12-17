export interface CompanyInfo {
  name: string;
  symbol: string;
}

export type TBrokerage = 'td';

export interface IConnection {
  accessToken: string;
  accessTokenExpiration: string;
  connectionId: string;
  refreshToken: string;
  refreshTokenExpiration: string;
  type: TBrokerage;
  username?: string;
}

export interface IConnectionResponse {
  id: string;
  type: TBrokerage;
}

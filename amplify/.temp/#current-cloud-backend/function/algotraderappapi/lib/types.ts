import TdAmeritradeClient from '@morpheusnephew/td-ameritrade/dist/clients';
import { IConfig } from '/opt/nodejs/config';
import { IConnection } from '/opt/nodejs/connectionTypes';
import { Context, DefaultState } from 'koa';

export interface AppContext extends Context {
  state: AppContextState;
}

export interface AppContextState extends DefaultState {
  authenticatedUser: AuthenticatedUser;
  config: IConfig;
  tdAmeritradeClient: TdAmeritradeClient;
  connection: IConnection;
  connections: IConnection[];
}

export interface AuthenticatedUser {
  username: string;
  [key: string]: any;
}

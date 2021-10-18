import TdAmeritradeClient from '@morpheusnephew/td-ameritrade/dist/clients';
import { IConfig } from '/opt/nodejs/config';
import { IConnection } from '/opt/nodejs/connectionTypes';
import { Context, DefaultState } from 'koa';
import winston from 'winston';

export interface AppContext extends Context {
  state: AppContextState;
}

export interface AppContextState extends DefaultState {
  authenticatedUser: AuthenticatedUser;
  config: IConfig;
  connection: IConnection;
  connections: IConnection[];
  logger: winston.Logger;
  tdAmeritradeClient: TdAmeritradeClient;
}

export interface AuthenticatedUser {
  username: string;
  [key: string]: any;
}

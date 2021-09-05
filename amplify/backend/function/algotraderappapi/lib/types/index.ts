import { IConfig } from '../config';
import TdAmeritradeClient from '@morpheusnephew/td-ameritrade/dist/clients';
import { Context, DefaultState } from 'koa';

export interface AppContext extends Context {
  state: AppContextState;
}

export interface AppContextState extends DefaultState {
  authenticatedUser: AuthenticatedUser;
  config: IConfig;
  tdAmeritradeClient: TdAmeritradeClient;
}

export interface AuthenticatedUser {
  username: string;
  [key: string]: any;
}

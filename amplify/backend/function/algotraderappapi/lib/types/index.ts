import { IConfig } from '../config';
import { Context, DefaultState } from 'koa';

export interface AppContext extends Context {
  state: AppContextState;
}

export interface AppContextState extends DefaultState {
  authenticatedUser: AuthenticatedUser;
  config: IConfig;
}

export interface AuthenticatedUser {
  username: string;
  [key: string]: any;
}

import { IRequest } from '../types';
import { UserPrincipal } from '@morpheusnephew/td-ameritrade-models';
import { v4 as uuid } from 'uuid';

export const getOptionsRequest = (
  userPrincipal: UserPrincipal,
  tickerSymbols: string[]
): IRequest => {
  const keys = tickerSymbols.join(',');

  return {
    service: 'OPTION',
    command: 'SUBS',
    account: userPrincipal.accounts![0].accountId!,
    source: userPrincipal.streamerInfo!.appId!,
    requestid: uuid(),
    parameters: {
      keys,
      fields: '8,9,10',
    },
  };
};

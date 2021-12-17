import { IRequest } from '../types';
import { convertOptionStringToNumber, TOptionField } from '../types';
import { UserPrincipal } from '@morpheusnephew/td-ameritrade-models';
import { v4 as uuid } from 'uuid';

export const getOptionsRequest = (
  userPrincipal: UserPrincipal,
  tickerSymbols: string[],
  optionFields: TOptionField[]
): IRequest => {
  const keys = tickerSymbols.join(',');
  const fields = optionFields.map(convertOptionStringToNumber).join(',');

  return {
    service: 'OPTION',
    command: 'SUBS',
    account: userPrincipal.accounts![0].accountId!,
    source: userPrincipal.streamerInfo!.appId!,
    requestid: uuid(),
    parameters: {
      keys,
      fields,
    },
  };
};

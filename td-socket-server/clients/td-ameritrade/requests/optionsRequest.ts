import { IRequest, OptionFieldEnum } from '../types';
import { UserPrincipal } from '@morpheusnephew/td-ameritrade-models';
import { v4 as uuid } from 'uuid';

export const getOptionsRequest = (
  userPrincipal: UserPrincipal,
  tickerSymbols: string[],
  optionFields: OptionFieldEnum[]
): IRequest => {
  const keys = tickerSymbols.join(',');
  const fields = optionFields.join(',');

  console.log('getOptionsRequest keys:', keys);
  console.log('getOptionsRequest fields', fields);

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

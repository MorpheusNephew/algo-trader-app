import { IRequest, QuoteFieldEnum } from '../types';
import { UserPrincipal } from '@morpheusnephew/td-ameritrade-models';
import { v4 as uuid } from 'uuid';

export const getQuotesRequest = (
  userPrincipal: UserPrincipal,
  tickerSymbols: string[],
  quoteFields: QuoteFieldEnum[]
): IRequest => {
  const keys = tickerSymbols.join(',');
  const fields = quoteFields.join(',');

  console.log('getQuotesRequest keys:', keys);
  console.log('getQuotesRequest fields', fields);

  return {
    service: 'QUOTE',
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

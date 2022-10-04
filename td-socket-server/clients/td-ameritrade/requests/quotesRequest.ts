import { IRequest, QuoteFieldEnum } from '../types';
import { UserPrincipal } from '@morpheusnephew/td-ameritrade-models';
import { v4 as uuid } from 'uuid';

const sortQuoteField = (a: QuoteFieldEnum, b: QuoteFieldEnum) => {
  return (a as unknown as number) - (b as unknown as number);
};

export const getQuotesRequest = (
  userPrincipal: UserPrincipal,
  tickerSymbols: string[],
  quoteFields: QuoteFieldEnum[]
): IRequest => {
  const keys = tickerSymbols.join(',');
  const fields = quoteFields.sort(sortQuoteField).join(',');

  console.log('getQuotesRequest keys:', keys);
  console.log('getQuotesRequest fields', fields);

  return {
    service: 'QUOTE',
    requestid: uuid(),
    command: 'SUBS',
    account: userPrincipal.accounts![0].accountId!,
    source: userPrincipal.streamerInfo!.appId!,
    parameters: {
      keys,
      fields,
    },
  };
};

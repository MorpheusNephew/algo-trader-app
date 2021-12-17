export type TOptionField =
  | 'symbol'
  | 'description'
  | 'bidPrice'
  | 'askPrice'
  | 'lastPrice'
  | 'highPrice'
  | 'lowPrice'
  | 'closePrice'
  | 'totalVolume'
  | 'openInterest'
  | 'volatility'
  | 'quoteTime'
  | 'tradeTime'
  | 'moneyIntrinsicValue'
  | 'quoteDay'
  | 'tradeDay'
  | 'expirationYear'
  | 'multiplier'
  | 'digits'
  | 'openPrice'
  | 'bidSize'
  | 'askSize'
  | 'lastSize'
  | 'netChange'
  | 'strikePrice'
  | 'contractType'
  | 'underlying'
  | 'expirationMonth'
  | 'deliverables'
  | 'timeValue'
  | 'expirationDay'
  | 'daysToExpiration'
  | 'delta'
  | 'gamma'
  | 'theta'
  | 'vega'
  | 'rho'
  | 'securityStatus'
  | 'theoreticalOptionValue'
  | 'underlyingPrice'
  | 'uvExpirationType'
  | 'mark';

export const optionMapStringToNumber: Record<TOptionField, string> = {
  symbol: '0',
  description: '1',
  bidPrice: '2',
  askPrice: '3',
  lastPrice: '4',
  highPrice: '5',
  lowPrice: '6',
  closePrice: '7',
  totalVolume: '8',
  openInterest: '9',
  volatility: '10',
  quoteTime: '11',
  tradeTime: '12',
  moneyIntrinsicValue: '13',
  quoteDay: '14',
  tradeDay: '15',
  expirationYear: '16',
  multiplier: '17',
  digits: '18',
  openPrice: '19',
  bidSize: '20',
  askSize: '21',
  lastSize: '22',
  netChange: '23',
  strikePrice: '24',
  contractType: '25',
  underlying: '26',
  expirationMonth: '27',
  deliverables: '28',
  timeValue: '29',
  expirationDay: '30',
  daysToExpiration: '31',
  delta: '32',
  gamma: '33',
  theta: '34',
  vega: '35',
  rho: '36',
  securityStatus: '37',
  theoreticalOptionValue: '38',
  underlyingPrice: '39',
  uvExpirationType: '40',
  mark: '41',
};

export const optionMapNumberToString: Record<string, TOptionField> = {
  key: 'symbol',
  '0': 'symbol',
  '1': 'description',
  '2': 'bidPrice',
  '3': 'askPrice',
  '4': 'lastPrice',
  '5': 'highPrice',
  '6': 'lowPrice',
  '7': 'closePrice',
  '8': 'totalVolume',
  '9': 'openInterest',
  '10': 'volatility',
  '11': 'quoteTime',
  '12': 'tradeTime',
  '13': 'moneyIntrinsicValue',
  '14': 'quoteDay',
  '15': 'tradeDay',
  '16': 'expirationYear',
  '17': 'multiplier',
  '18': 'digits',
  '19': 'openPrice',
  '20': 'bidSize',
  '21': 'askSize',
  '22': 'lastSize',
  '23': 'netChange',
  '24': 'strikePrice',
  '25': 'contractType',
  '26': 'underlying',
  '27': 'expirationMonth',
  '28': 'deliverables',
  '29': 'timeValue',
  '30': 'expirationDay',
  '31': 'daysToExpiration',
  '32': 'delta',
  '33': 'gamma',
  '34': 'theta',
  '35': 'vega',
  '36': 'rho',
  '37': 'securityStatus',
  '38': 'theoreticalOptionValue',
  '39': 'underlyingPrice',
  '40': 'uvExpirationType',
  '41': 'mark',
};

export const convertOptionNumberToString = (numberToConvert: string) =>
  optionMapNumberToString[numberToConvert];

export const convertOptionStringToNumber = (stringToConvert: TOptionField) =>
  optionMapStringToNumber[stringToConvert];

type TCommand =
  | 'LOGIN'
  | 'STREAM'
  | 'QOS'
  | 'SUBS'
  | 'ADD'
  | 'UNSUBS'
  | 'VIEW'
  | 'LOGOUT';

type TService =
  | 'ACCT_ACTIVITY'
  | 'ADMIN'
  | 'ACTIVES_NASDAQ'
  | 'ACTIVES_NYSE'
  | 'ACTIVES_OTCBB'
  | 'ACTIVES_OPTIONS'
  | 'FOREX_BOOK'
  | 'FUTURES_BOOK'
  | 'LISTED_BOOK'
  | 'NASDAQ_BOOK'
  | 'OPTIONS_BOOK'
  | 'FUTURES_OPTIONS_BOOK'
  | 'CHART_EQUITY'
  | 'FUTURES'
  | 'CHART_HISTORY_FUTURES'
  | 'QUOTE'
  | 'LEVELONE_FUTURES'
  | 'LEVELONE_FOREX'
  | 'LEVELONE_FUTURES_OPTIONS'
  | 'OPTION'
  | 'LEVELTWO_FUTURES'
  | 'NEWS_HEADLINE'
  | 'NEWS_STORY'
  | 'NEWS_HEADLINE_LIST'
  | 'STREAMER_SERVER'
  | 'TIMESALE_EQUITY'
  | 'TIMESALE_FUTURES'
  | 'TIMESALE_FOREX'
  | 'TIMESALE_OPTIONS';

export interface IRequest {
  service: TService;
  requestid: string;
  command: TCommand;
  account: string;
  source: string;
  parameters: Record<string, any>;
}

export interface INotifyResponse {
  notify: any[];
}

export interface IResponseResponse {
  response: any[];
}

export interface IDataResponse {
  data: any[];
}

export interface IResponseData {
  service: TService;
  requestid: string;
  command: TCommand;
  timestamp: number;
  content: IContentStatus | Record<string, any>[];
}

interface IContentStatus {
  code: number;
  msg: string;
}

export type TMessageTypes = 'data' | 'notify' | 'response';

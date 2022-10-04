export enum OptionFieldEnum {
  symbol = 0,
  description,
  bidPrice,
  askPrice,
  lastPrice,
  highPrice,
  lowPrice,
  closePrice,
  totalVolume,
  openInterest,
  volatility,
  quoteTime,
  tradeTime,
  moneyIntrinsicValue,
  quoteDay,
  tradeDay,
  expirationYear,
  multiplier,
  digits,
  openPrice,
  bidSize,
  askSize,
  lastSize,
  netChange,
  strikePrice,
  contractType,
  underlying,
  expirationMonth,
  deliverables,
  timeValue,
  expirationDay,
  daysToExpiration,
  delta,
  gamma,
  theta,
  vega,
  rho,
  securityStatus,
  theoreticalOptionValue,
  underlyingPrice,
  uvExpirationType,
  mark,
}

export enum QuoteFieldEnum {
  symbol = 0,
  bidPrice,
  askPrice,
  lastPrice,
  bidSize,
  askSize,
  askId,
  bidId,
  totalVolume,
  lastSize,
  tradeTime,
  quoteTime,
  highPrice,
  lowPrice,
  bidTick,
  closePrice,
  exchangeId,
  marginable,
  shortable,
  islandBid,
  islandAsk,
  islandVolume,
  quoteDay,
  tradeDay,
  volatility,
  description,
  lastId,
  digits,
  openPrice,
  netChange,
  fiftyTwoWeekHigh,
  fiftyTwoWeekLow,
  peRatio,
  dividendAmount,
  dividendYield,
  islandBidSize,
  islandAskSize,
  nav,
  fundPrice,
  exchangeName,
  dividendDate,
  regularMarketQuote,
  regularMarketTrade,
  regularMarketLastPrice,
  regularMarketLastSize,
  regularMarketTradeTime,
  regularMarketTradeDay,
  regularMarketNetChange,
  securityStatus,
  mark,
  quoteTimeInLong,
  tradeTimeInLong,
  regularMarketTradeTimeInLong,
}

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
  service: string;
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

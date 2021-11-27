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

export interface IResponse {
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

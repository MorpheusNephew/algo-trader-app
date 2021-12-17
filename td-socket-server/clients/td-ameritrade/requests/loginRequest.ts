import { IRequest } from '../types';
import { UserPrincipal } from '@morpheusnephew/td-ameritrade-models';
import qs from 'query-string';
import { v4 as uuid } from 'uuid';

export const getLoginRequest = (userPrincipal: UserPrincipal): IRequest => {
  const tokenTimeStampAsMs = new Date(
    userPrincipal.streamerInfo!.tokenTimestamp!
  ).getTime();

  const credentials = {
    userid: userPrincipal.accounts![0].accountId,
    token: userPrincipal.streamerInfo!.token,
    company: userPrincipal.accounts![0].company,
    segment: userPrincipal.accounts![0].segment,
    cddomain: userPrincipal.accounts![0].accountCdDomainId,
    usergroup: userPrincipal.streamerInfo!.userGroup,
    accesslevel: userPrincipal.streamerInfo!.accessLevel,
    authorized: 'Y',
    timestamp: tokenTimeStampAsMs,
    appid: userPrincipal.streamerInfo!.appId,
    acl: userPrincipal.streamerInfo!.acl,
  };

  return {
    service: 'ADMIN',
    command: 'LOGIN',
    requestid: uuid(),
    account: userPrincipal.accounts![0].accountId!,
    source: userPrincipal.streamerInfo!.appId!,
    parameters: {
      credential: encodeURIComponent(qs.stringify(credentials)),
      token: userPrincipal.streamerInfo!.token,
      version: '1.0',
    },
  };
};

export const getLoginUrl = (userPrincipal: UserPrincipal): string =>
  'wss://' + userPrincipal.streamerInfo!.streamerSocketUrl + '/ws';

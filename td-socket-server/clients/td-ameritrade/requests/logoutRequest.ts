import { UserPrincipal } from '@morpheusnephew/td-ameritrade-models';
import { v4 as uuid } from 'uuid';

export const getLogoutRequest = (userPrincipal: UserPrincipal) => {
  return {
    service: 'ADMIN',
    command: 'LOGOUT',
    requestid: uuid(),
    account: userPrincipal.accounts![0].accountId!,
    source: userPrincipal.streamerInfo!.appId!,
    parameters: {},
  };
};

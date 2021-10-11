import { getAccountsInformation } from '../../clients/td';
import { Typography } from '@material-ui/core';
import { Account } from '@morpheusnephew/td-ameritrade-models';
import { useEffect, useState } from 'react';

interface IInput {
  hasConnection: boolean;
}

export const AccountInformation = (params: IInput) => {
  const [account, setAccount] = useState<Account>();
  const { hasConnection } = params;

  useEffect(() => {
    if (hasConnection) {
      getAccountsInformation().then((data) => {
        const accountInformation = data[0];
        setAccount(accountInformation);
      });
    }
  }, [hasConnection]);

  return (
    <div>
      <Typography>Account Information</Typography>
      {account && (
        <Typography>
          {JSON.stringify(account.securitiesAccount?.accountId)}
        </Typography>
      )}
    </div>
  );
};

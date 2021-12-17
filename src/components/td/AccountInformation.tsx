import { getAccountsInformation } from '../../clients/td';
import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import {
  CashAccount,
  MarginAccount,
} from '@morpheusnephew/td-ameritrade-models';

interface IInput {
  hasConnection: boolean;
}

export const AccountInformation = (params: IInput) => {
  const [account, setAccount] = useState<CashAccount | MarginAccount>();
  const { hasConnection } = params;

  useEffect(() => {
    if (hasConnection) {
      getAccountsInformation().then((data) => {
        const { securitiesAccount } = data[0];

        setAccount(securitiesAccount);
      });
    }
  }, [hasConnection]);

  return (
    <div>
      <Typography>Account Information</Typography>
      {account && (
        <Typography>
          {account.accountId} - {account.type} account
        </Typography>
      )}
    </div>
  );
};

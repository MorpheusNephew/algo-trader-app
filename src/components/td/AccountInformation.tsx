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

        if (securitiesAccount?.type === 'CASH') {
          setAccount(securitiesAccount as CashAccount);
        } else if (securitiesAccount?.type === 'MARGIN') {
          setAccount(securitiesAccount as MarginAccount);
        }
      });
    }
  }, [hasConnection]);

  return (
    <div>
      <Typography>Account Information</Typography>
      {account && <Typography>{JSON.stringify(account)}</Typography>}
    </div>
  );
};

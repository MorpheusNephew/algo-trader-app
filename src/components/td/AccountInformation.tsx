import { getAccountsInformation } from '../../clients/td';
import { Typography } from '@material-ui/core';
import { FC, useEffect, useState } from 'react';
import {
  CashAccount,
  MarginAccount,
} from '@morpheusnephew/td-ameritrade-models';

interface IInput {
  hasConnection: boolean;
}

export const AccountInformation: FC<IInput> = ({ hasConnection }) => {
  const [account, setAccount] = useState<CashAccount | MarginAccount>();

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
        <div>
          <Typography>
            {account.accountId} - {account.type} account
          </Typography>
          <Typography>
            Current balances {account.currentBalances?.cashBalance}
          </Typography>
          <Typography>
            Projected balances {account.projectedBalances?.cashBalance}
          </Typography>
        </div>
      )}
    </div>
  );
};

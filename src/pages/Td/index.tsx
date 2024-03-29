import { getUserPrincipal } from '../../clients/td';
import { TOptionField } from '../../clients/td/stream/types';
import { AccountInformation } from '../../components/td/AccountInformation';
import { Movers } from '../../components/td/Movers';
import { useGetCompanyOptions } from '../../hooks/companies/useGetCompanyOptions';
import { useGetBrokerageConnections } from '../../hooks/connections/useGetBrokerageConnections';
import { Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { UserPrincipal } from '@morpheusnephew/td-ameritrade-models';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
// import { SymbolSelector } from '../../components/td/SymbolSelector';

const openAuthWindow = (authUrl: string) => {
  window.open(authUrl, 'Auth', 'width=500,height=500');
  return false;
};

const ConnectButton = () => (
  <div onClick={() => openAuthWindow('/connect/td')}>
    <Add />
  </div>
);

const TdAmeritrade = () => {
  const [userPrincipal, setUserPrincipal] = useState<UserPrincipal>();

  const [tdConnections, loadingTdConnections] =
    useGetBrokerageConnections('td');

  const companyOptions = useGetCompanyOptions();

  useEffect(() => {
    if (!tdConnections) {
      return;
    }

    getUserPrincipal().then((principal) => {
      setUserPrincipal(principal);
    });
  }, [tdConnections]);

  useEffect(() => {
    if (!userPrincipal || isEmpty(companyOptions)) {
      return;
    }

    const tickerSymbols = companyOptions.map(({ value }) => value).slice(0, 10);
    const optionFields: TOptionField[] = [
      'symbol',
      'askPrice',
      'bidPrice',
      'contractType',
      'daysToExpiration',
      'highPrice',
      'lowPrice',
      'lastPrice',
    ];

    const socket = io('ws://localhost:3000');
    socket.on('td-logged-in', (message) => {
      console.log('message', message);

      socket.emit('sub-options', tickerSymbols, optionFields);
    });

    socket.emit('td-login', userPrincipal);
  }, [userPrincipal, companyOptions]);

  (window as any).io = io;

  return (
    <div>
      <Typography variant='h5' component='div'>
        TD AmeriTrade
      </Typography>
      {(loadingTdConnections && <div>Loading...</div>) ||
        (isEmpty(tdConnections) && <ConnectButton />) || (
          <div>
            <AccountInformation hasConnection={!isEmpty(tdConnections)} />
            <Movers />
            {/* <SymbolSelector /> */}
          </div>
        )}
    </div>
  );
};

export default TdAmeritrade;

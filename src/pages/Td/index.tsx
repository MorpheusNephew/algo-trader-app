import { getUserPrincipal } from '../../clients/td';
import { getLoginRequest } from '../../clients/td/stream';
import { AccountInformation } from '../../components/td/AccountInformation';
import { Movers } from '../../components/td/Movers';
import { SymbolSelector } from '../../components/td/SymbolSelector';
import { useGetBrokerageConnections } from '../../hooks/useGetBrokerageConnections';
import { Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

const openAuthWindow = (_event: any, authUrl: string) => {
  window.open(authUrl, 'Auth', 'width=500,height=500');
  return false;
};

const ConnectButton = () => (
  <div onClick={(event) => openAuthWindow(event, '/connect/td')}>
    <Add />
  </div>
);

const TdAmeritrade = () => {
  const [tdConnections, loadingTdConnections] =
    useGetBrokerageConnections('td');

  useEffect(() => {
    getUserPrincipal().then((userPrincipal) => {
      const loginRequest = getLoginRequest(userPrincipal);

      console.log('Login Request', loginRequest);

      const request = {
        requests: [loginRequest],
      };

      const tdSocket = new WebSocket(
        'wss://' + userPrincipal.streamerInfo!.streamerSocketUrl + '/ws'
      );

      tdSocket.onopen = (evt) => {
        console.log('Socket opened', evt);
      };

      tdSocket.onmessage = (evt) => {
        console.log(evt.data);
      };
      tdSocket.onclose = () => {
        console.log('CLOSED');
      };

      (window as any).tdWebSocket = tdSocket;
      (window as any).tdRequest = JSON.stringify(request);
      (window as any).userDetails = userPrincipal;
    });
  }, []);

  return (
    <div>
      <Typography variant='h5' component='div'>
        TD AmeriTrade
      </Typography>
      <Typography>
        This is the page that will check whether a user has a TD Ameritrade
        connection or not
      </Typography>
      {(loadingTdConnections && <div>Loading...</div>) ||
        (isEmpty(tdConnections) && <ConnectButton />) || (
          <div>
            <div>Td connected</div>
            <AccountInformation hasConnection={!isEmpty(tdConnections)} />
            <Movers />
            <SymbolSelector />
          </div>
        )}
    </div>
  );
};

export default TdAmeritrade;

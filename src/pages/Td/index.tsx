import { getUserPrincipal } from '../../clients/td';
import { getLoginRequest } from '../../clients/td/stream';
import { getOptionsRequest } from '../../clients/td/stream/options';
import { AccountInformation } from '../../components/td/AccountInformation';
import { Movers } from '../../components/td/Movers';
import { useGetCompanyOptions } from '../../hooks/companies/useGetCompanyOptions';
import { useGetBrokerageConnections } from '../../hooks/connections/useGetBrokerageConnections';
import { Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { UserPrincipal } from '@morpheusnephew/td-ameritrade-models';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
// import { SymbolSelector } from '../../components/td/SymbolSelector';

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
  const [userPrincipal, setUserPrincipal] = useState<UserPrincipal>();
  const [tdSocket, setTdSocket] = useState<WebSocket>();
  const [streamLoggedIn, setStreamLoggedIn] = useState(false);

  const [tdConnections, loadingTdConnections] =
    useGetBrokerageConnections('td');

  const companyOptions = useGetCompanyOptions();

  useEffect(() => {
    if (!companyOptions) {
      return;
    }

    getUserPrincipal().then((principal) => {
      setUserPrincipal(principal);
      setTdSocket(
        new WebSocket(
          'wss://' + principal.streamerInfo!.streamerSocketUrl + '/ws'
        )
      );
    });
  }, [companyOptions]);

  useEffect(() => {
    if (!tdSocket || !userPrincipal || !companyOptions) {
      return;
    }

    const loginRequest = getLoginRequest(userPrincipal);

    console.log('Login Request', loginRequest);

    const request = {
      requests: [loginRequest],
    };

    const tdJSONRequest = JSON.stringify(request);

    tdSocket.onopen = (evt) => {
      console.log('Socket opened', evt);

      tdSocket.send(tdJSONRequest);
    };

    tdSocket.onmessage = (evt) => {
      const { response } = JSON.parse(evt.data);

      console.log('response', response);

      if (
        response?.[0]?.command === 'LOGIN' &&
        response?.[0]?.content.code === 0
      ) {
        console.log('Logged in successfully');
        setStreamLoggedIn(true);
      }

      console.log(evt.data);
    };

    tdSocket.onclose = () => {
      console.log('CLOSED');
    };
  }, [userPrincipal, tdSocket, companyOptions]);

  useEffect(() => {
    if (!streamLoggedIn || !companyOptions || !userPrincipal || !tdSocket) {
      return;
    }

    const optionsRequest = getOptionsRequest(
      userPrincipal,
      companyOptions.map(({ value }) => value)
    );

    const request = {
      requests: [optionsRequest],
    };

    tdSocket.send(JSON.stringify(request));
  }, [streamLoggedIn, tdSocket, companyOptions, userPrincipal]);

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

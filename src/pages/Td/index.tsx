import { AccountInformation } from '../../components/td/AccountInformation';
import { Movers } from '../../components/td/Movers';
import { useGetBrokerageConnections } from '../../hooks/useGetBrokerageConnections';
import { Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { isEmpty } from 'lodash';

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
          <div>Td connected</div>
        )}
      <AccountInformation hasConnection={!isEmpty(tdConnections)} />
      <Movers />
    </div>
  );
};

export default TdAmeritrade;

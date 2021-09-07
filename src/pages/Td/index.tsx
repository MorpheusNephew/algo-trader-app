import { useGetBrokerageConnections } from '../../hooks/useGetBrokerageConnections';
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
      <h2>TD AmeriTrade</h2>
      <div>
        This is the page that will check whether a user has a TD Ameritrade
        connection or not
      </div>
      {(!loadingTdConnections && isEmpty(tdConnections) && (
        <ConnectButton />
      )) || <div>Td connected</div>}
    </div>
  );
};

export default TdAmeritrade;

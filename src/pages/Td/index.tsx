import { useGetBrokerageConnections } from '../../hooks/useGetBrokerageConnections';
import { Add } from '@material-ui/icons';
import { isEmpty } from 'lodash';
import { useHistory } from 'react-router';

const ConnectButton = ({ history }: { history: any }) => (
  <div onClick={(_event) => history.push('/connect/td')}>
    <Add />
  </div>
);

const TdAmeritrade = () => {
  const history = useHistory();
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
        <ConnectButton history={history} />
      )) || <div>Td connected</div>}
    </div>
  );
};

export default TdAmeritrade;

import ConnectedBrokerages from '../components/ConnectedBrokerages';
import TdAmeritrade from './Td';

const Configuration = () => (
  <div>
    <header>
      <h1>Configuration</h1>
    </header>
    <ConnectedBrokerages>
      <TdAmeritrade />
    </ConnectedBrokerages>
  </div>
);

export default Configuration;

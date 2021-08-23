import ConnectedBrokerages from '../components/ConnectedBrokerages';
import TdConnect from './td/Connect';

const Configuration = () => (
  <div>
    <header>
      <h1>Configuration</h1>
    </header>
    <ConnectedBrokerages>
      <TdConnect />
    </ConnectedBrokerages>
  </div>
);

export default Configuration;

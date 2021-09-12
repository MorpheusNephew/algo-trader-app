import { useAuthWithTdAmeritrade } from '../../hooks/useAuthWithTdAmeritrade';
import { useHistory } from 'react-router';

const Connect = () => {
  let subText = 'Connecting...';
  const [tdUrl, connected, error] = useAuthWithTdAmeritrade(
    `${window.location.origin}${window.location.pathname}`
  );
  const history = useHistory();

  if (tdUrl) {
    window.location.href = tdUrl;
  } else if (connected) {
    subText = 'Connected...';
    history.push('/configuration');
  } else if (error) {
    subText = 'Error connecting to TD AmeriTrade';
  }

  return (
    <div>
      <div>TD Connect</div>
      <div>{subText}</div>
    </div>
  );
};

export default Connect;

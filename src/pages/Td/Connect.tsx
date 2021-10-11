import { useAuthWithTdAmeritrade } from '../../hooks/td/useAuthWithTdAmeritrade';

const Connect = () => {
  let subText = 'Connecting...';
  const [tdUrl, connected, error] = useAuthWithTdAmeritrade(
    `${window.location.origin}${window.location.pathname}`
  );

  if (tdUrl) {
    window.location.href = tdUrl;
  } else if (connected) {
    subText = 'Connected...';
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

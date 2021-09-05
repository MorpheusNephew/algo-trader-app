import { useAuthWithTdAmeritrade } from '../../hooks/useAuthWithTdAmeritrade';

const Connect = () => {
  let subText = 'Connecting...';
  const [tdUrl, error] = useAuthWithTdAmeritrade(
    `${window.location.origin}${window.location.pathname}`
  );

  if (tdUrl) {
    window.location.href = tdUrl;
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

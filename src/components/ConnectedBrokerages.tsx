import API from '@aws-amplify/api';
import { useEffect, useState } from 'react';

const ConnectedBrokerages = (props: any) => {
  const [brokerageConnections, setBrokerageConnections] = useState(null);
  const [loadingBrokerages, setLoadingBrokerages] = useState(true);

  useEffect(() => {
    API.get('algoappapi', '/api/configuration', null)
      .then((data) => {
        setBrokerageConnections(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoadingBrokerages(false);
      });
  }, []);

  console.log('Brokerage connections', brokerageConnections);

  return (
    <div>
      <div>Connected brokerages</div>
      {brokerageConnections ? (
        <div>Your connected brokerages here</div>
      ) : loadingBrokerages ? (
        <div>Loading brokerages</div>
      ) : (
        props.children
      )}
    </div>
  );
};

export default ConnectedBrokerages;

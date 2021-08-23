import API from '@aws-amplify/api';
import { useEffect, useState } from 'react';

const GetBrokerageConnections = () => {
  const [brokerageConnections, setBrokerageConnections] = useState(null);
  const [loadingBrokerageConnections, setLoadingBrokerageConnections] =
    useState(true);

  useEffect(() => {
    API.get('algoappapi', '/api/connections', null)
      .then((data) => {
        setBrokerageConnections(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoadingBrokerageConnections(false);
      });
  }, []);

  return [brokerageConnections, loadingBrokerageConnections];
};

export default GetBrokerageConnections;

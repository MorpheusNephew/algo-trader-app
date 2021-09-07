import API from '@aws-amplify/api';
import { useEffect, useState } from 'react';

export const useGetBrokerageConnections = (connectionType?: string) => {
  const [brokerageConnections, setBrokerageConnections] = useState(null);
  const [loadingBrokerageConnections, setLoadingBrokerageConnections] =
    useState(true);

  useEffect(() => {
    const endpoint = connectionType
      ? `/api/connections/${connectionType}`
      : '/api/connections';

    API.get('algoappapi', endpoint, null)
      .then((data) => {
        setBrokerageConnections(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoadingBrokerageConnections(false);
      });
  }, [connectionType]);

  return [brokerageConnections, loadingBrokerageConnections];
};

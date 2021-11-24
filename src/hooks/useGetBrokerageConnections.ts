import { TBrokerage } from '../types';
import API from '@aws-amplify/api';
import { useEffect, useState } from 'react';

export const useGetBrokerageConnections = (brokerage?: TBrokerage) => {
  const [brokerageConnections, setBrokerageConnections] = useState(null);
  const [loadingBrokerageConnections, setLoadingBrokerageConnections] =
    useState(true);

  useEffect(() => {
    const endpoint = brokerage
      ? `/api/connections/${brokerage}`
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
  }, [brokerage]);

  return [brokerageConnections, loadingBrokerageConnections];
};

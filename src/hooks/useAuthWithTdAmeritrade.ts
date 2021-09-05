import API from '@aws-amplify/api';
import qs from 'query-string';
import { Dispatch, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useAuthWithTdAmeritrade = (redirectUrl: string) => {
  const [result, setResult] = useState<any>();
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<any>();

  const location = useLocation();
  const { code } = qs.parse(location.search);

  useEffect(() => {
    if (code) {
      const authenticateProcess = connectRequest(redirectUrl, code as string);

      const params: IConnectonMethodParams = {
        method: authenticateProcess,
        setResult: () => setConnected(true),
        setError,
      };

      handleConnection(params);
    } else {
      const initiateConnectionProcess = connectRequest(redirectUrl);

      const params: IConnectonMethodParams = {
        method: initiateConnectionProcess,
        setResult,
        setError,
      };

      handleConnection(params);
    }
  }, [code, redirectUrl]);

  return [result, connected, error];
};

interface IConnectonMethodParams {
  method: () => Promise<any>;
  setResult: Dispatch<any>;
  setError: Dispatch<any>;
}

const connectRequest = (redirectUrl: string, code?: string) => () => {
  return API.get('algoappapi', '/api/connections/td/connect', {
    queryStringParameters: {
      redirectUrl,
      code,
    },
  });
};

const handleConnection = (params: IConnectonMethodParams) => {
  const { method, setError, setResult } = params;
  method()
    .then((data) => {
      setResult(data);
    })
    .catch((e) => {
      setError(e);
    });
};

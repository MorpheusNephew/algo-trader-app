import { API } from 'aws-amplify';
import { useEffect, useState } from 'react';

const useGetTdAuthUrl = (redirectUrl: string) => {
  const [tdAuthUrl, setTdAuthUrl] = useState('');

  useEffect(() => {
    API.endpoint('algoappapi').then((url) => {
      setTdAuthUrl(`${url}/auth/td?redirectUrl=${redirectUrl}`);
    });
  });

  return tdAuthUrl;
};

export default useGetTdAuthUrl;

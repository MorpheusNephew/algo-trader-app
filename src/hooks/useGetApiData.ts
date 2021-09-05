import { API } from 'aws-amplify';
import { useEffect, useState } from 'react';

const useGetApiData = () => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    API.get('algoappapi', '/api', null).then((data) => {
      setResponse(data);
    });
  }, []);

  return response;
};

export default useGetApiData;

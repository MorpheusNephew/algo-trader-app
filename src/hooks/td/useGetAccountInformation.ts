import { useEffect, useState } from 'react';

export const useGetAccountInformation = () => {
  const [accountInfo, setAccountInfo] = useState<any>();
  const [error, setError] = useState<any>();

  useEffect(() => {});

  return accountInfo;
};

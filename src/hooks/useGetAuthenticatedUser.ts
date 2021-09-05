import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';

const useGetAuthenticatedUser = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setCurrentUser(user);
    });
  }, []);

  return currentUser;
};

export default useGetAuthenticatedUser;

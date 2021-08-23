import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';

const GetAuthenticatedUser = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setCurrentUser(user);
    });
  }, []);

  return currentUser;
};

export default GetAuthenticatedUser;

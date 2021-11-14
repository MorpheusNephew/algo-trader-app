import useGetApiData from '../hooks/useGetApiData';
import useGetAuthenticatedUser from '../hooks/useGetAuthenticatedUser';

const Home = () => {
  const currentUser = useGetAuthenticatedUser();

  const response = useGetApiData();

  return (
    <header>
      <h1>We now have auth</h1>
      {currentUser?.username && <div>Welcome {currentUser.username}</div>}
      {response && <div>Response: {response}</div>}
    </header>
  );
};

export default Home;

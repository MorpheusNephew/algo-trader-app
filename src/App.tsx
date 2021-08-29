import './App.css';
import Header from './components/Header';
import GetAuthenticatedUser from './hooks/GetAuthenticatedUser';
import Configuration from './pages/Configuration';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { API } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

function App() {
  const [response, setResponse] = useState(null);
  const currentUser = GetAuthenticatedUser();
  const connectRoute = useRouteMatch({ path: '/connect' });

  useEffect(() => {
    API.get('algoappapi', '/api', null).then((data) => {
      setResponse(data);
    });
  }, []);

  return (
    <div className='App'>
      {!!!connectRoute && <Header />}
      <Switch>
        <Route path='/configuration'>
          <Configuration />
        </Route>
        <Route path='/'>
          <header>
            <h1>We now have auth</h1>
            {currentUser?.username && <div>Welcome {currentUser.username}</div>}
            {response && <div>Response: {response}</div>}
          </header>
        </Route>
      </Switch>
    </div>
  );
}

export default withAuthenticator(App);

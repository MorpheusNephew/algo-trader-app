import './App.css';
import Header from './components/Header';
import useGetApiData from './hooks/useGetApiData';
import useGetAuthenticatedUser from './hooks/useGetAuthenticatedUser';
import Configuration from './pages/Configuration';
import Connect from './pages/Td/Connect';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

function App() {
  const currentUser = useGetAuthenticatedUser();
  const connectRoute = useRouteMatch({ path: '/connect' });

  const response = useGetApiData();

  return (
    <div className='App'>
      {!!!connectRoute && <Header />}
      <Switch>
        <Route path='/configuration' component={Configuration} />
        <Route path='/connect/td' component={Connect} />
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

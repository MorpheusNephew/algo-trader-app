import './App.css';
import Header from './components/Header';
import Configuration from './pages/Configuration';
import Home from './pages/Home';
import TdAmeritrade from './pages/Td';
import Connect from './pages/Td/Connect';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

function App() {
  const connectRoute = useRouteMatch({ path: '/connect' });

  return (
    <div className='App'>
      {!!!connectRoute && <Header />}
      <Switch>
        <Route path='/configuration' component={Configuration} />
        <Route path='/connect/td' component={Connect} />
        <Route path='/td' component={TdAmeritrade} />
        <Route path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default withAuthenticator(App);

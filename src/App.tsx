import './App.css';
import logo from './logo.svg';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { API, Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    API.get("algoappapi", "/api", null).then((data) => {
      console.log(data);
      setResponse(data);
    });
  }, []);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>We now have auth</h1>
        {currentUser && <div>{currentUser}</div>}
        {response && <div>Response: {response}</div>}
      </header>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);

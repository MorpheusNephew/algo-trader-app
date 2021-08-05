import './App.css';
import logo from './logo.svg';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

function App() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    API.get("algoappapi", "/api", null).then((data) => {
      console.log(data);
      setResponse(data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>We now have auth</h1>
        {response && <div>Response: {response}</div>}
      </header>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);

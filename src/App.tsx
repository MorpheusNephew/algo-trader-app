import './App.css';
import logo from './logo.svg';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>We now have auth</h1>
      </header>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);

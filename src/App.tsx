import './App.css';
import Header from './components/Header';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { API, Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

function App() {
    const [response, setResponse] = useState(null);
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        API.get('algoappapi', '/api', null).then((data) => {
            console.log(data);
            setResponse(data);
        });
    }, []);

    useEffect(() => {
        Auth.currentAuthenticatedUser().then((user) => {
            console.log('Authenticated user', user);
            setCurrentUser(user);
        });
    }, []);

    return (
        <div className='App'>
            <Header />
            <header>
                <h1>We now have auth</h1>
                {currentUser?.username && (
                    <div>Welcome {currentUser.username}</div>
                )}
                {response && <div>Response: {response}</div>}
            </header>
        </div>
    );
}

export default withAuthenticator(App);

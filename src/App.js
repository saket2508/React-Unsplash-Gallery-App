import React from 'react';
import Application from './components/Application';
import UserProvider from './providers/userProvider';

function App(){
    return(
        <UserProvider>
            <Application/>
        </UserProvider>
    )
}
export default App;

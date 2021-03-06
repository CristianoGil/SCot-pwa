import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import database from './database';
import syncDatabase from './database/sync_database'
import {UserProvider} from './Context/UserContext';

import store from './app/store';
import {Provider} from 'react-redux';
import {AlertNetworkOfflineProvider} from './Context/AlertNetworkOfflineContext';

const root: any = createRoot(document.getElementById('root')!)

root.render(
    <React.StrictMode>
        <AlertNetworkOfflineProvider>
            <UserProvider>
                <Provider store={store}>
                    <App/>
                </Provider>
            </UserProvider>
        </AlertNetworkOfflineProvider>
    </React.StrictMode>
);


document.addEventListener('deviceready', async function () {
    /**Initialization local database - SQLite (only for mobile environment)*/
    const {initialDatabase} = database();
    await initialDatabase();

    /**
     *  Start sync database
     */
    const {start} = syncDatabase();
    start()

});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
    onSuccess: () => {
        console.log('Successfully register PWA')
    },
    onUpdate: async (registration: ServiceWorkerRegistration) => {
        await registration.update();
    }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

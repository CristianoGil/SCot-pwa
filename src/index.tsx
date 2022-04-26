import React from 'react';
// import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import database from './database';

import syncDatabase from './database/sync_database'

const root: any = createRoot(document.getElementById('root')!)
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

if (process.env.NODE_ENV === 'production') {
    const {start} = syncDatabase();
    start()
}


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

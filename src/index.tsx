import React from 'react';
// import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import database from './database';

const root: any = createRoot(document.getElementById('root')!)

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);


// Initialization local database - SQLite (only for mobile environment)
document.addEventListener('deviceready', async function () {
    const {initialDatabase, insertOne, fetch} = database();

    // if (process.env.NODE_ENV !== 'production') {
    //     self._selfTest();
    // self._echoTest();
    // }
    console.log('test 10')
    await initialDatabase();

    await insertOne('test', 2, ["2", "name2"], ["id", "name"])

    setTimeout(async function () {
        try {
            console.log("starting fetch")
            const va = await fetch('SELECT * FROM test');
            console.log("fetch values: ", va)
        } catch (e) {
            console.log("fetch error: ", e)
        }
    }, 15000)


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

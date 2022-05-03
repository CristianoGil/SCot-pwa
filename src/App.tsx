import { Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonRouterOutlet,
    setupIonicReact,

} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './App.css';

import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import CoDirecta from './pages/Co-Directa/Co-Directa';
import {useContext, useEffect, useState} from 'react';
import {IResponseLogin} from './model/login';
import {UserContext} from './Context/UserContext';


interface IProtectedProps {
    isAllowed: boolean
    redirectPath?: string
    children: any
}

const ProtectedRoute: React.FC<IProtectedProps> = ({isAllowed = false, redirectPath = '/login', children}) => {
    if (!isAllowed) {
        return <Redirect exact  to={redirectPath}/>;
    }
    console.log(children)
    return  children
};


setupIonicReact();

const App: React.FC = () => {

    const userContext = useContext<any>(UserContext);
    console.log(userContext.isAuthenticated())
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>

                    {/*<ProtectedRoute isAllowed={userContext.isAuthenticated()}>*/}
                        <Route path={"/dashboard"} component={Dashboard}/>
                    {/*</ProtectedRoute>*/}

                    {/*<ProtectedRoute isAllowed={userContext.isAuthenticated()}>*/}
                        <Route path={"/coDirecta"} component={CoDirecta}/>
                    {/*</ProtectedRoute>*/}

                    <Route path={"/login"} component={Login}/>
                    <Redirect exact from="/" to="/dashboard" />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>

    );
};

export default App;
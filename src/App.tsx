import { match, Redirect, Route, RouteComponentProps, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import {
    IonApp,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonMenu,
    IonModal,
    IonPage,
    IonPopover,
    IonRouterOutlet,
    IonToolbar,
    setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

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
import Menu from './components/Menu';

setupIonicReact();

const App: React.FC = () => {

    return (
        <IonApp>
            <IonPage>

                <IonReactRouter>
                    <Menu />
                    <IonRouterOutlet>
                        <Route path={"/login"} component={Login} />
                        <Route path={"/dashboard"} component={Dashboard} />
                        <Redirect exact from="/" to="/login" />
                    </IonRouterOutlet>
                </IonReactRouter>
            </IonPage>

        </IonApp>

    );
};

export default App;
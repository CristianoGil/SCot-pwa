import { Redirect, Route, RouteComponentProps, useParams } from 'react-router-dom';
import {
    IonApp,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
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
import { person, reorderThree, wifi, close } from 'ionicons/icons';
import { useState } from 'react';

setupIonicReact();

const App: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);

    return (
        <IonApp>

            <IonPage>
                <IonHeader>
                    <IonToolbar color='transparent'>

                        <IonButtons slot="start" onClick={() => { setShowModal(true); }}>

                            <IonButton
                                className='btnMenu'
                                style={{
                                    backgroundColor: "#EBF2FF",
                                    color: "#003E7E",
                                }}>
                                <IonIcon icon={reorderThree}></IonIcon>

                            </IonButton>
                        </IonButtons>

                        <IonButtons slot="end">

                            <IonButton
                                style={{
                                    backgroundColor: "#FBD95E",
                                    color: "white",
                                }}>
                                <IonIcon icon={person}></IonIcon>

                            </IonButton>

                            <IonLabel>
                                Alberto Nunes
                            </IonLabel>
                        </IonButtons>

                        <IonButtons slot="end">
                            <IonButton
                                style={{
                                    backgroundColor: "#6EAF43",
                                    color: "white",
                                }}>
                                <IonIcon icon={wifi}></IonIcon>

                            </IonButton>

                            <IonLabel>
                                online
                            </IonLabel>
                        </IonButtons>

                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonModal
                        animated={true}
                        isOpen={showModal}
                        onDidDismiss={() => setShowModal(false)}
                        className="fullscreen">

                        <IonPage>
                            <IonHeader>
                                <IonToolbar color='transparent'>
                                <IonButtons slot="start" onClick={() => { setShowModal(false); }}>
                            <IonButton
                                className='btnMenu'
                                style={{
                                    backgroundColor: "#EBF2FF",
                                    color: "#003E7E",
                                }}>
                                <IonIcon icon={close}></IonIcon>
                            </IonButton>
                            </IonButtons>

                                </IonToolbar>
                            </IonHeader>
                            <IonContent>

                            </IonContent>
                        </IonPage>
                    </IonModal>

                    <IonPopover
                        isOpen={showPopover}
                        className="menu"
                        mode="md"
                        showBackdrop={false}>
                        <IonContent>Popover Content</IonContent>
                    </IonPopover>
                </IonContent>

                <IonReactRouter>
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
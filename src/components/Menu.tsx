import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonPopover, IonToggle, IonToolbar } from '@ionic/react';
import { list, person, wifi, apps, close, moon } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';

const Menu: React.FC = (props) => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [menuIsVisible, setMenuIsVisible] = useState<any>({ display: "none" });
    const history = useHistory()
    const [checked, setChecked] = useState(false);
    const toggleDarkModeHandler = () => {
        
        document.body.classList.toggle("dark");
    };

    useEffect(() => {

        if (history.location.pathname == '/login')
            setMenuIsVisible({ display: "none" });
        else
            setMenuIsVisible({});

        return history.listen((location) => {

            if (location.pathname == '/login') {
                setMenuIsVisible({ display: "none" });
            }
            else
                setMenuIsVisible({});

        });
    }, [history])

    return (
        <div>
            <IonHeader style={menuIsVisible}>
                <IonToolbar color='transparent'>

                    <IonButtons slot="start" onClick={() => { setShowModal(true); }}>

                        <IonButton
                            style={{
                                backgroundColor: "#EBF2FF",
                                color: "#003E7E",
                            }}>
                            <IonIcon icon={list}></IonIcon>

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

                    <IonButtons slot="end" onClick={() => { setShowPopover(true); }}>

                        <IonButton
                            style={{
                                backgroundColor: "#EBF2FF",
                                color: "#003E7E",
                            }}>
                            <IonIcon icon={apps}></IonIcon>

                        </IonButton>
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
                    showBackdrop={true}
                    onDidDismiss={() => { setShowPopover(false); }}>
                    <IonPage>
                        <IonHeader>
                            <IonToolbar color='transparent'>
                                <IonLabel slot='start'>
                                    <h1>
                                        Aplicação
                                    </h1>
                                </IonLabel>
                                <IonButtons slot="end" onClick={() => { setShowPopover(false); }}>

                                    <IonButton
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
                            <IonList className="ion-margin-top">
                                <IonItem>
                                    <IonIcon slot="start" icon={moon} />
                                    <IonLabel>Modo escuro</IonLabel>
                                    <small>Reduzir exposição à luz e poupança de bateria</small>
                                    <IonToggle
                                        slot="end"
                                        name="darkMode"
                                        checked={checked} 
                                        onIonChange={e => {
                                            setChecked(e.detail.checked)
                                            toggleDarkModeHandler();
                                        }}
                                    />
                                </IonItem>
                            </IonList>
                        </IonContent>
                    </IonPage>
                </IonPopover>

            </IonContent>
        </div>
    );
};

export default Menu;

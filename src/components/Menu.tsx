import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonModal, IonPage, IonPopover, IonToolbar } from '@ionic/react';
import { list, person, wifi, apps, close } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';

const Menu: React.FC = (props) => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [menuIsVisible, setMenuIsVisible] = useState<any>({ display: "none" });

    const history = useHistory()

    useEffect(() => {
        console.log(history.location);
        if (history.location.pathname == '/login')
        setMenuIsVisible({ display: "none" });

        return history.listen((location) => {
            console.log(`You changed the page to: ${location.pathname}`);

            if (location.pathname == '/login') {
                console.log('asdasd');
                setMenuIsVisible({ display: "none" });
            }
            else {
                setMenuIsVisible({});
            }
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

                        </IonContent>
                    </IonPage>
                </IonPopover>

            </IonContent>
        </div>
    );
};

export default Menu;

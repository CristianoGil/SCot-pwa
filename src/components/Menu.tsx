import { IonButton, IonButtons, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonModal, IonPage, IonPopover, IonRow, IonToggle, IonToolbar } from '@ionic/react';
import { list, person, wifi, apps, close, moon } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './Menu.css'

const Menu: React.FC = () => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<any>("ion-hide");
    const history = useHistory()
    const [checked, setChecked] = useState(false);
    const toggleDarkModeHandler = () => {

        document.body.classList.toggle("dark");
    };

    useEffect(() => {

        if (history.location.pathname == '/login')
            setIsVisible("ion-hide");
        else
            setIsVisible("");

        return history.listen((location) => {

            if (location.pathname == '/login') {
                setIsVisible("ion-hide");
            }
            else
                setIsVisible("");

        });
    }, [history])

    return (
        <IonHeader className={`ion-no-border ${isVisible}`}>
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
            <IonModal
                animated={true}
                isOpen={showModal}
                onDidDismiss={() => setShowModal(false)}
                className="fullscreen">

                <IonPage>
                    <IonHeader className="ion-no-border">
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
                    <IonContent id='modelContent'>

                        <IonImg id='imgModal' src={'assets/images/login-img.png'} />

                        <div id='imgModal-fx'></div>

                        <div id='modelContent_Interno' className='ion-align-items-center'>
                            <IonGrid>
                                <IonRow style={{ padding: 100 }}>
                                    <IonCol>
                                        <h1>Dashboard</h1>
                                    </IonCol>
                                    <IonCol>
                                        <h1>RI/Catálogo</h1>
                                    </IonCol>
                                    <IonCol>
                                        <h1>Contraordenações</h1>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </div>

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
                    <IonHeader className="ion-no-border">
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
                    <IonFooter>
                        <IonItem lines='none'>
                            <small>Copyright @ 2021 SCOT+. Todos os direitos reservados.</small>
                        </IonItem>
                        <IonItem lines='none'>
                            <IonImg src={'assets/images/Modelos-Barras-FUNDOS-v04_3logos-FEEI.png'} />
                        </IonItem>
                    </IonFooter>
                </IonPage>
            </IonPopover>
        </IonHeader>
    );
};

export default Menu;
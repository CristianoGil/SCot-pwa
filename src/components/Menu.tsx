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
                        className='btnRound'
                        style={{
                            backgroundColor: "#EBF2FF",
                            color: "#003E7E",
                        }}>
                        <IonIcon icon={list}></IonIcon>

                    </IonButton>
                </IonButtons>

                <IonButtons slot="end">

                    <IonButton
                        className='btnRound'
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
                        className='btnRound'
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
                        className='btnRound'
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
                                    className='btnRound'
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

                        <div id='imgModal' />

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
                id='popoverMenu'
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
                                    <IonItem lines='none'>
                                        Aplicação
                                    </IonItem>
                                </h1>

                            </IonLabel>
                            <IonButton slot="end" color="light" onClick={() => { setShowPopover(false); }}>
                                Fechar
                            </IonButton>

                        </IonToolbar>
                    </IonHeader>
                    <IonContent>

                        <IonItem className="ion-margin-top" style={{ margin: 24 }}>
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

                    </IonContent>
                    <IonFooter>
                        <IonItem lines='none'>
                            <div id='imgModelosBarras' className='ion-text-center' style={{ padding: 12 }}>
                                <small>Copyright @ 2021 SCOT+. Todos os direitos reservados.</small><br />
                                <IonImg className='ion-margin-top ion-margin-bottom' src={'assets/images/Group 4529.png'} style={{ height: 40, marginTop: 36 }} />
                            </div>
                        </IonItem>

                    </IonFooter>
                </IonPage>
            </IonPopover>
        </IonHeader>
    );
};

export default Menu;
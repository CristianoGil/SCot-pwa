import { IonButton, IonCol, IonContent, IonGrid, IonItem, IonModal, IonRow } from '@ionic/react';
import './AlertNetwork.css';

const AlertNetwork: React.FC = () => {

    return (
        <IonModal id='modalAlert' isOpen={true}>
            <IonContent>

                <IonGrid style={{ height: '-webkit-fill-available', padding: 0 }}>
                    <IonRow style={{ height: '-webkit-fill-available' }}>
                        <IonCol sizeSm='4' id='colImagem'>
                        </IonCol>
                        <IonCol style={{ alignSelf: 'center' }}>

                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <h1>
                                            Sem ligação
                                        </h1>
                                        <p style={{ marginTop: 40 }}>Não é possível realizar esta operação.</p>
                                        <p>Está a trabalhar em modo offline, por favor verifique a sua conexão.</p>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol color='secondary'>
                                        <IonItem lines='none'>

                                            <IonButton style={{ background: '#084F87', borderRadius: 4 }} color="#084F87" slot="end" size='default' onClick={() => {
                                                // logCurrentNetworkStatus();
                                            }}>
                                                Compreendi
                                            </IonButton>

                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonContent>
        </IonModal>
    );
};

export default AlertNetwork;
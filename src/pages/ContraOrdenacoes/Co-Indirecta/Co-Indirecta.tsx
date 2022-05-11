import {
    IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonPage, IonRadio, IonRadioGroup, IonRow,
} from '@ionic/react';
import Menu from '../../../components/Menu/Menu';
import React from 'react';
import './Co-Indirecta.scss';
import Veiculo from '../../../components/Contra-Ordenacoes/Components/Veiculo/Veiculo';
import Unidade from '../../../components/Contra-Ordenacoes/Components/Unidade/Unidade';
import Infraccao from '../../../components/Contra-Ordenacoes/Components/Infraccao/Infraccao';

const CoIndirecta: React.FC = () => {


    return (
        <IonPage>
            <Menu />
            <IonContent className="coindirecta">

                <IonGrid id="gridGeral" style={{ marginBottom: 40 }}>

                    <IonRow style={{ marginBottom: 40 }}>
                        <IonCol size="12">
                            <h1>Registro de contraordenações Indirectas</h1>
                            <p>Registro de contraordenações Indirectas</p>
                        </IonCol>
                    </IonRow>

                </IonGrid>

                <IonGrid className="coindirectaPartial">
                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='4'>
                            {/* Identificação Arguido */}
                            <IonHeader>
                                <IonLabel>Possui os elementos de identificação do arguido?</IonLabel>
                            </IonHeader>
                            <IonRadioGroup
                                // value={}
                                onIonChange={e => () => { }}>
                                <IonRow>
                                    <IonCol size='3'>
                                        <IonItem lines='none' className="veiculo-proprietario-radio radio-item">
                                            <IonRadio value="singular" />
                                            <IonLabel className="radioBox">Sim</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size='3'>
                                        <IonItem lines='none' className="veiculo-proprietario-radio radio-Item">
                                            <IonRadio value="colection" />
                                            <IonLabel className="radioBox">Não</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonRadioGroup>
                            {/* Identificação Arguido */}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size-sm='12' size-md="12" size-lg="11">
                            {/* Veículo */}
                            <Veiculo />
                            {/* Veículo */}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size-sm='12' size-md="12" size-lg="11">
                            {/*START: UNIDADE*/}
                            <Unidade />
                            {/*END: UNIDADE*/}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size-sm='12' size-md="12" size-lg="11">
                            {/*START: Infracção*/}
                            <Infraccao />
                            {/*END: Infracção*/}
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonContent>
        </IonPage>
    );
};

export default CoIndirecta;

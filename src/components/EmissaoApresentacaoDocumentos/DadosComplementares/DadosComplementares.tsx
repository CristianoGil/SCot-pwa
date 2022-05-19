import { IonCard, IonCardContent, IonCol, IonGrid, IonHeader, IonItem, IonLabel, IonRadio, IonRadioGroup, IonRow } from "@ionic/react";
import React, { useState } from "react";
import AcoesComplementares from "../../../components/Contra-Ordenacoes/Components/AcoesComplementares/AcoesComplementares";
import './DadosComplementares.scss';

const DadosComplementares: React.FC = () => {

    const [accoesComplementaresParentData,setAccoesComplementaresParentData] = useState<any>();
    return (

        <IonGrid className="dadosComplementares">

            <IonRow>
                <IonCol size-sm='12' size-md="12" size-lg="11">
                    {/*START: Proprietário*/}

                    <IonCard className={'co-pagamento'}>
                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='10' size-lg='4'>
                                        <IonHeader>
                                            <IonLabel>Proprietário</IonLabel>
                                        </IonHeader>
                                        <IonRadioGroup
                                            // value={}
                                            onIonChange={e => () => { }}>
                                            <IonRow>
                                                <IonCol size='4'>
                                                    <IonItem lines='none' className="veiculo-proprietario-radio radio-item">
                                                        <IonRadio value="arguido" />
                                                        <IonLabel className="radioBox">Arguido</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='4'>
                                                    <IonItem lines='none' className="veiculo-proprietario-radio radio-Item">
                                                        <IonRadio value="condutor" />
                                                        <IonLabel className="radioBox">Condutor</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='4'>
                                                    <IonItem lines='none' className="veiculo-proprietario-radio radio-Item">
                                                        <IonRadio value="outro" />
                                                        <IonLabel className="radioBox">Outro</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>

                                </IonRow>
                            </IonGrid>
                        </IonCardContent>
                    </IonCard>

                    {/*END: Proprietário*/}
                </IonCol>
            </IonRow>

            <IonRow>
                <IonCol size-sm='12' size-md="12" size-lg="11">
                    {/*START: Ações Complementares*/}
                    <AcoesComplementares setAccoesComplementaresParentData={setAccoesComplementaresParentData}/>
                    {/*END: Ações Complementares*/}
                </IonCol>
            </IonRow>
        </IonGrid>
    );

}

export default React.memo(DadosComplementares);
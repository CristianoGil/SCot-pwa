import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRadio, IonRadioGroup, IonRow } from "@ionic/react";
import React from "react";
import AcoesComplementares from "../Components/AcoesComplementares/AcoesComplementares";
import InfraccoesAdicionais from "../Components/InfraccoesAdicionais/InfraccoesAdicionais";
import Pagamento from "../Components/Pagamento/Pagamento";

const DadosComplementares: React.FC = () => {

    return (

        <IonGrid className="dadosComplementares">

            <IonRow>
                <IonCol size-sm='12' size-md="12" size-lg="11">
                    {/*START: Proprietário*/}

                    <IonCard className={'co-pagamento'}>
                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='10' size-lg='6'>
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

                                    <IonCol size-sm='12' size-md='10' size-lg='6'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Ref. Arquivo">Ref. Arquivo</IonLabel>
                                            <IonInput></IonInput>
                                        </IonItem>
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
                    {/*START: Pagamento*/}
                    <Pagamento />
                    {/*END: Pagamento*/}
                </IonCol>
            </IonRow>

            <IonRow>
                <IonCol size-sm='12' size-md="12" size-lg="11">
                    {/*START: Ações Complementares*/}
                    <AcoesComplementares />
                    {/*END: Ações Complementares*/}
                </IonCol>
            </IonRow>

            <IonRow>
                <IonCol size-sm='12' size-md="12" size-lg="11">
                    {/*START: Infracções adicionais*/}
                    <InfraccoesAdicionais />
                    {/*END: Infracções adicionais*/}
                </IonCol>
            </IonRow>
        </IonGrid>
    );

}

export default React.memo(DadosComplementares);
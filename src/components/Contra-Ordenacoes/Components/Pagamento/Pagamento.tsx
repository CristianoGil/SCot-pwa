import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRadio, IonRadioGroup, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import DatePicker from "../../../Combos/DatePicker";

const Pagamento: React.FC = () => {

    return (

        <IonCard className={'co-pagamento'}>
            <IonCardHeader>
                <IonCardTitle>Pagamento</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='2' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Tipo Pagamento</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="Tipo Pagamento">Tipo Pagamento 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='2' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Meio Pagamento</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="Meio Pagamento">Meio Pagamento 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='2'>
                            <IonItem>
                                <IonLabel position="floating" itemType="number" placeholder="Número do cheque">Número do cheque</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='2' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Banco Emissor</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="Banco Emissor">Banco Emissor</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='2'>
                            <IonItem>
                                <IonLabel position="floating" itemType="number" placeholder="Valor">Valor</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='2' style={{ marginTop: 16 }}>
                            <DatePicker inputName={'pagamento-data'} textLabel="Data" />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
}

export default Pagamento;
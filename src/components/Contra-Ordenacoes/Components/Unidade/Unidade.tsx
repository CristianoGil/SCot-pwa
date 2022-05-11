import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import DatePicker from "../../../Combos/DatePicker";

const Unidade: React.FC = () => {

    return (

        <IonCard className={'co-unidade'}>
            <IonCardHeader>
                <IonCardTitle>Unidade</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm="9" size-md="8" size-lg="4" style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Unidade/Comando</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="Unidade_Comando">ANSR</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='4'  style={{ marginTop: 16 }}>
                            <DatePicker inputName={'unidade-data_horaInfraccao'} textLabel="Data/Hora da infracção" />
                        </IonCol>

                        <IonCol size-sm="3" size-md="3" size-lg="3">
                            <IonItem>
                                <IonLabel position="floating" itemType="number"
                                          placeholder="Enter Number">Número do Talão</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
}

export default Unidade;
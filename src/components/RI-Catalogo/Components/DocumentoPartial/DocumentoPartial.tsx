import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { search, eye } from "ionicons/icons";
import DatePicker from "../../../Combos/DatePicker";

const DocumentoPartial: React.FC = () => {

    return (

        <IonCard className={'co-localInfraccao'}>
            <IonCardHeader>
                <IonCardTitle>Documento</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm="12" size-md="10" size-lg="6">
                            <IonItem>
                                <IonLabel
                                    position="floating" itemType="text"
                                    placeholder='Titular'>Titular</IonLabel>
                                <IonInput
                                    required={true}
                                    clearInput={true}
                                ></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='6' style={{ marginTop: 16 }}>
                            <IonItem lines='none'>
                                <IonButton style={{ background: 'transparent', borderRadius: 4, color: 'red' }}
                                    color="#"
                                    slot="start"
                                    size='default'
                                    onClick={() => { }}>LIMPAR FILTROS </IonButton>
                                <IonButton style={{ background: '#e0e0e0', borderRadius: 4, color: 'black' }}
                                    color="#"
                                    slot="start"
                                    size='default'
                                    onClick={() => { }}><IonIcon icon={eye} class="ion-padding-end" /> Filtros </IonButton>
                                <IonButton style={{ background: '#084F87', borderRadius: 4 }}
                                    color="#"
                                    slot="start"

                                    size='default'
                                    onClick={() => { }}><IonIcon icon={search} class="ion-padding-end" /> Pesquisar </IonButton>

                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Estado Policial</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="estadoPolicial">Estado Policial 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Tipo</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="tipo">Tipo 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <IonItem>
                                <IonLabel
                                    position="floating" itemType="text"
                                    placeholder='Número'>Número</IonLabel>
                                <IonInput
                                    required={true}
                                    clearInput={true}
                                ></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <DatePicker inputName={'docIdentificacao-dataEmissao'} textLabel="Data Validade" />
                        </IonCol>
                    </IonRow>

                    <IonRow>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Entidade</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="entidade">Entidade 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <DatePicker inputName={'docIdentificacao-dataEmissao'} textLabel="Data Emissão" />
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Local</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="local">Local 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
}

export default DocumentoPartial;
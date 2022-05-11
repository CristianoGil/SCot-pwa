import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { search, eye } from "ionicons/icons";

const OrganizacaoPartial: React.FC = () => {

    return (

        <IonCard className={'co-localInfraccao'}>
            <IonCardHeader>
                <IonCardTitle>Organização</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm="12" size-md="10" size-lg="6">
                            <IonItem>
                                <IonLabel
                                    position="floating" itemType="text"
                                    placeholder='Designação'>Designação</IonLabel>
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

                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <IonItem>
                                <IonLabel
                                    position="floating" itemType="text"
                                    placeholder='Arruamento'>Arruamento</IonLabel>
                                <IonInput
                                    required={true}
                                    clearInput={true}
                                ></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <IonItem>
                                <IonLabel
                                    position="floating" itemType="text"
                                    placeholder='Lote/Nº Polícia'>Lote/Nº Polícia</IonLabel>
                                <IonInput
                                    required={true}
                                    clearInput={true}
                                ></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <IonItem>
                                <IonLabel
                                    position="floating" itemType="text"
                                    placeholder='Fracção'>Fracção</IonLabel>
                                <IonInput
                                    required={true}
                                    clearInput={true}
                                ></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Zona/Bairro</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="zonaBairro">Zona/Bairro 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>

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
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
}

export default OrganizacaoPartial;
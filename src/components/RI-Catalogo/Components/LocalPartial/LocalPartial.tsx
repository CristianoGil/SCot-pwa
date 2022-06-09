import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { search, eye } from "ionicons/icons";
import { customPopoverOptions } from "../../../../utils/customPopoverOptions";

const LocalPartial: React.FC = () => {

    return (

        <IonCard className={'co-localInfraccao'}>
            <IonCardHeader>
                <IonCardTitle>Local</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm="12" size-md="10" size-lg="6">
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
                                <IonLabel position="floating">Tipo Arruamento</IonLabel>
                                <IonSelect interfaceOptions={customPopoverOptions} interface="popover">
                                    <IonSelectOption value="tipoArruamento">Tipo Arruamento 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel position="floating">Tipo</IonLabel>
                                <IonSelect interfaceOptions={customPopoverOptions} interface="popover">
                                    <IonSelectOption value="tipo">Tipo 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel position="floating">Subtipo</IonLabel>
                                <IonSelect interfaceOptions={customPopoverOptions} interface="popover">
                                    <IonSelectOption value="subtipo">Subtipo 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3'>
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
                    </IonRow>

                    <IonRow>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel position="floating">País</IonLabel>
                                <IonSelect interfaceOptions={customPopoverOptions} interface="popover">
                                    <IonSelectOption value="pais">País 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel position="floating">Distrito</IonLabel>
                                <IonSelect interfaceOptions={customPopoverOptions} interface="popover">
                                    <IonSelectOption value="distrito">Distrito 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel position="floating">Conselho</IonLabel>
                                <IonSelect interfaceOptions={customPopoverOptions} interface="popover">
                                    <IonSelectOption value="conselho">Conselho 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel position="floating">Fraguesia</IonLabel>
                                <IonSelect interfaceOptions={customPopoverOptions} interface="popover">
                                    <IonSelectOption value="fraguesia">Fraguesia 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel position="floating">Localidade</IonLabel>
                                <IonSelect interfaceOptions={customPopoverOptions} interface="popover">
                                    <IonSelectOption value="localidade">Localidade 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <IonItem>
                                <IonLabel
                                    position="floating" itemType="text"
                                    placeholder='Nº Polícia/Km'>Nº Polícia/Km</IonLabel>
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
                                    placeholder='Zona/Bairro'>Zona/Bairro</IonLabel>
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

export default LocalPartial;
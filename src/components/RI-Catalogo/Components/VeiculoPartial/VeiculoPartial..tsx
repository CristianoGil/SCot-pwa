import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { search, eye } from "ionicons/icons";
import { customPopoverOptions } from "../../../../utils/customPopoverOptions";

const VeiculoPartial: React.FC = () => {

    return (

        <IonCard className={'co-localInfraccao'}>
            <IonCardHeader>
                <IonCardTitle>Veículo</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm="12" size-md="10" size-lg="6">
                            <IonItem>
                                <IonLabel
                                    position="floating" itemType="text"
                                    placeholder='Matrícula'>Matrícula</IonLabel>
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
                        <IonCol size-sm="12" size-md="10" size-lg="3">
                            <IonItem>
                                <IonLabel
                                    position="floating" itemType="text"
                                    placeholder='Nº Chassis'>Nº Chassis</IonLabel>
                                <IonInput
                                    required={true}
                                    clearInput={true}
                                ></IonInput>
                            </IonItem>
                        </IonCol>

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
                                <IonLabel position="floating">Marca</IonLabel>
                                <IonSelect interfaceOptions={customPopoverOptions} interface="popover">
                                    <IonSelectOption value="marca">Marca 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel position="floating">Modelo</IonLabel>
                                <IonSelect interfaceOptions={customPopoverOptions} interface="popover">
                                    <IonSelectOption value="modelo">Modelo 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel position="floating">Cor</IonLabel>
                                <IonSelect interfaceOptions={customPopoverOptions} interface="popover">
                                    <IonSelectOption value="cor">Cor 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel position="floating"
                                >Categoria</IonLabel>
                                <IonSelect interfaceOptions={customPopoverOptions} interface="popover">
                                    <IonSelectOption value="categoria">Categoria 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel position="floating">Classe</IonLabel>
                                <IonSelect interfaceOptions={customPopoverOptions} interface="popover">
                                    <IonSelectOption value="classe">Classe 1</IonSelectOption>
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
                    </IonRow>

                    <IonRow>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel position="floating">Subclasse</IonLabel>
                                <IonSelect interfaceOptions={customPopoverOptions} interface="popover">
                                    <IonSelectOption value="subclasse">Subclasse 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
}

export default VeiculoPartial;
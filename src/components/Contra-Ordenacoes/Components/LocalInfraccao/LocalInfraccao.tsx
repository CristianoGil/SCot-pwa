import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonListHeader, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { search } from "ionicons/icons";

const LocalInfraccao: React.FC = () => {

    return (

        <IonCard className={'co-localInfraccao'}>
            <IonCardHeader>
                <IonCardTitle>Local Infracção</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm="9" size-md="8" size-lg="4" style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Distrito</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="distrito">Distrito 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm="9" size-md="8" size-lg="4" style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Conselho</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="conselho">Conselho 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm="9" size-md="8" size-lg="4" style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Freguesia</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="freguesia">Freguesia 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm="9" size-md="8" size-lg="4" style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Localidade</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="localidade">Localidade 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm="9" size-md="8" size-lg="4">
                            <IonItem>
                                <IonLabel position="floating" itemType="number" placeholder="Nº Polícia">Nº Polícia/km</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm="9" size-md="8" size-lg="4">
                            <IonItem>
                                <IonLabel position="floating" itemType="text" placeholder="Nº Polícia">Zona/Bairro</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm="9" size-md="8" size-lg="4">
                            <IonItem>
                                <IonLabel>Tipo</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="tipo">Tipo 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='8' size-md='6' size-lg='4'>
                            <IonItem>
                                <IonButton color='medium' fill="clear" id="open-search-input-1">
                                    <IonIcon icon={search} />
                                </IonButton>
                                <IonInput maxlength={9}
                                    minlength={9}
                                    //   color={}
                                    required={true}
                                    clearInput={true}
                                    name='arguido-nif'
                                    //   value={}
                                    //   onKeyUp={}
                                    placeholder='Arruamento' />
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='4' size-md='6' size-lg='2'>
                            <IonItem lines='none'>
                                <IonButton style={{ background: '#084F87', borderRadius: 4 }}
                                    color="#084F87"
                                    slot="start"
                                    //    disabled={}
                                    size='default'
                                    onClick={() => { }}> Pesquisar </IonButton>

                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
}

export default LocalInfraccao;
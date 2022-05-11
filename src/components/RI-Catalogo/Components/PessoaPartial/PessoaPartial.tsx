import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonListHeader, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { search, eye } from "ionicons/icons";
import DatePicker from "../../../Combos/DatePicker";

const PessoaPartial: React.FC = () => {

    return (

        <IonCard className={'co-localInfraccao'}>
            <IonCardHeader>
                <IonCardTitle>Pessoa</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm="12" size-md="10" size-lg="3">
                            <IonItem>
                                <IonLabel
                                    position="floating" itemType="text"
                                    placeholder='NIF'>NIF</IonLabel>
                                <IonInput
                                    maxlength={9}
                                    minlength={9}
                                    required={true}
                                    clearInput={true}
                                ></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm="12" size-md="10" size-lg="3">
                            <IonItem>
                                <IonLabel
                                    position="floating" itemType="text"
                                    placeholder='Nome'>Nome</IonLabel>
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
                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{marginTop: 16}}>
                            <DatePicker inputName={'docIdentificacao-dataEmissao'} textLabel="Data Nascimento" />
                        </IonCol>

                        <IonCol size-sm="12" size-md="10" size-lg="3">
                            <IonItem>
                                <IonLabel
                                    position="floating" itemType="text"
                                    placeholder='Documento Tipo'>Documento Tipo</IonLabel>
                                <IonInput
                                    required={true}
                                    clearInput={true}
                                ></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm="12" size-md="10" size-lg="3">
                            <IonItem>
                                <IonLabel
                                    position="floating" itemType="text"
                                    placeholder='Documento Número'>Documento Número</IonLabel>
                                <IonInput
                                    required={true}
                                    clearInput={true}
                                ></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm="12" size-md="10" size-lg="3">
                            <IonItem>
                                <IonLabel
                                    position="floating" itemType="text"
                                    placeholder='Morada Arruamento'>Morada Arruamento</IonLabel>
                                <IonInput
                                    required={true}
                                    clearInput={true}
                                ></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm="12" size-md="10" size-lg="3">
                            <IonItem>
                                <IonLabel
                                    position="floating" itemType="text"
                                    placeholder='Morada Arruamento'>Morada Lote/Nº Polícia</IonLabel>
                                <IonInput
                                    required={true}
                                    clearInput={true}
                                ></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm="12" size-md="10" size-lg="3">
                            <IonItem>
                                <IonLabel
                                    position="floating" itemType="text"
                                    placeholder='Morada Arruamento'>Morada Fracção</IonLabel>
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

export default PessoaPartial;
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonListHeader, IonRadio, IonRadioGroup, IonRow, IonSelect, IonSelectOption, IonTextarea } from "@ionic/react";
import { search, text } from "ionicons/icons";
import './Infraccao.scss';

const Infraccao: React.FC = () => {

    return (

        <IonCard className={'co-infraccao'}>
            <IonCardHeader>
                <IonCardTitle>Infracção</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <IonHeader>
                                <IonLabel>Presenciada pelo Autuante?</IonLabel>
                            </IonHeader>
                            <IonRadioGroup
                                // value={}
                                onIonChange={e => () => { }}>
                                <IonRow>
                                    <IonCol size='6'>
                                        <IonItem lines='none' className="veiculo-proprietario-radio radio-item">
                                            <IonRadio value="singular" />
                                            <IonLabel className="radioBox">Sim</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size='6'>
                                        <IonItem lines='none' className="veiculo-proprietario-radio radio-Item">
                                            <IonRadio value="colection" />
                                            <IonLabel className="radioBox">Não</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonRadioGroup>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <IonItem>
                                <IonLabel position="floating" itemType="text" placeholder="Autuante">Autuante</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Comarca</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="comarca">Comarca 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Entidade</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="entidade">Entidade 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='3'>
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
                                    placeholder='Código' />
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <IonItem lines='none'>
                                <IonButton style={{ background: '#084F87', borderRadius: 4 }}
                                    color="#084F87"
                                    slot="start"
                                    //    disabled={}
                                    size='default'
                                    onClick={() => { }}> Pesquisar </IonButton>

                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <IonItem>
                                <IonLabel>Tipificação da Infracção</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="tipificacaoDaInfraccao">Tipificação da Infracção 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <IonItem>
                                <IonLabel>Subtipificação da Infracção</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="subtipificacaoDaInfraccao">Subtipificação da Infracção 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='6'>
                            <IonItem>
                                <IonLabel position="floating" itemType="text" placeholder="Nome infringida">Nome infringida</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='6'>
                            <IonItem lines="none">
                                <IonLabel position="stacked">Descrição Sumária</IonLabel>
                                <IonTextarea rows={6} cols={10} placeholder="" value={''} onIonChange={e => () => { }}>

                                </IonTextarea>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='6'>
                            <IonHeader>
                                <IonLabel>Montante da Coima (EUR)</IonLabel>
                            </IonHeader>

                            <IonRow>
                                <IonCol size='3'>
                                    <IonItem>
                                        <IonLabel position="floating">min</IonLabel>
                                        <IonInput></IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol size='3'>
                                    <IonItem>
                                        <IonLabel position="floating">max</IonLabel>
                                        <IonInput></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>

                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='6' style={{ marginTop: 32 }}>
                            <IonItem>
                                <IonLabel position="floating" itemType="text" placeholder="Norma que prevê a Contraordenação">Norma que prevê a Contraordenação</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='6'>
                            <IonItem>
                                <IonLabel position="floating" itemType="text" placeholder="Sanção Acessória">Sanção Acessória</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>

                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='6'>
                            <IonItem>
                                <IonLabel position="floating" itemType="text" placeholder="Norma que prevê a Sanção Acessória">Norma que prevê a Sanção Acessória</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>

                        <IonCol size-sm='12' size-md='10' size-lg='12'>
                            <IonItem lines="none">
                                <IonLabel position="stacked">Observações</IonLabel>
                                <IonTextarea rows={6} cols={10} placeholder="" value={''} onIonChange={e => () => { }}>

                                </IonTextarea>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
}

export default Infraccao;
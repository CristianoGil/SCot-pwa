import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonGrid,
    IonIcon,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonRadio,
    IonRadioGroup,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonToggle,
} from '@ionic/react';
import {useState} from 'react';
import {search} from 'ionicons/icons';
import React from 'react';
import {useAppSelector} from '../../../app/hooks';
import {setVisiblePopoverIndentVeiculo} from '../../Menu/popoverIndentVeiculoSlice';
import './Arguido.scss';

const Arguido: React.FC = () => {

    const [paisDeEmissao, setPaisDeEmissao] = useState<string>();
    const [isProprietarioDoVeiculo, setIsProprietarioDoVeiculo] = useState(false);
    const [selectedSingularColetivo, setSelectedSingularColetivo] = useState<string>('');

    return (
        <IonCard className={'co-arguido'}>

            <IonCardHeader>
                <IonCardTitle>Arguido</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size='4'>
                            <IonItem lines={'none'}>
                                <IonLabel>O arguido é proprietário do veículo?</IonLabel>
                                <IonToggle
                                    slot="end"
                                    name="darkMode"
                                    checked={isProprietarioDoVeiculo}
                                    onIonChange={e => {
                                        setIsProprietarioDoVeiculo(e.detail.checked)

                                    }}
                                />
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size='5'>
                            <IonItem>
                                <IonButton color='medium' fill="clear" id="open-search-input-1">
                                    <IonIcon icon={search}/>
                                </IonButton>
                                <IonInput placeholder='NIF'/>

                            </IonItem>
                        </IonCol>
                        <IonCol size='3'>
                            <IonItem lines='none'>

                                <IonButton style={{background: '#084F87', borderRadius: 4}} color="#084F87" slot="start"
                                           size='default' onClick={() => {
                                    dispatch(setVisiblePopoverIndentVeiculo(true));
                                }}>
                                    Pesquisar
                                </IonButton>

                            </IonItem>
                        </IonCol>

                        <IonCol size='4'>

                            <div style={{
                                display: 'inline-flex',
                                borderRadius: 10,
                                background: '#FEF7EA',
                                width: '100%',
                                border: 'groove'
                            }}>
                                <IonImg src={'assets/images/Group 4529_icon.png'}
                                        style={{width: 'fit-content'}}></IonImg>
                                <strong style={{marginTop: 12, marginLeft: 2, color: 'black'}}>Dados sujeitos a
                                    validação</strong>
                            </div>

                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size='4' >

                            <IonRadioGroup value={selectedSingularColetivo}
                                           onIonChange={e => setSelectedSingularColetivo(e.detail.value)}>

                                <IonRow>
                                    <IonCol size='6'>
                                        <IonItem lines='none' className="veiculo-proprietario-radio radio-item">
                                            <IonRadio  value="biff"/>
                                            <IonLabel  >Singular</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size='6'>
                                        <IonItem lines='none' className="veiculo-proprietario-radio radio-Item">
                                            <IonRadio  value="griff"/>
                                            <IonLabel  >Coletivo</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>

                            </IonRadioGroup>
                        </IonCol>
                        <IonCol size='4' offset={'2'}>
                            <IonItem>
                                <IonLabel>País de emissão</IonLabel>
                                <IonSelect value={paisDeEmissao} interface="popover"
                                           onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                                    <IonSelectOption value="female">Female</IonSelectOption>
                                    <IonSelectOption value="male">Male</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                </IonGrid>

            </IonCardContent>
        </IonCard>
    )
}

export default Arguido

function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}


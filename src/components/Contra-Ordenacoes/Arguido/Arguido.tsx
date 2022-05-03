import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonContent,
    IonDatetime,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonListHeader,
    IonModal,
    IonPage,
    IonPopover,
    IonRadio,
    IonRadioGroup,
    IonRow,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonToolbar
} from '@ionic/react';
import {Dispatch, SetStateAction, useState} from 'react';
import {calendar, search} from 'ionicons/icons';
import {format, parseISO} from 'date-fns';
import {Link} from 'react-router-dom';
import React from 'react';
import {useAppSelector} from '../../../app/hooks';
import {setVisiblePopoverIndentVeiculo} from '../../Menu/popoverIndentVeiculoSlice';
import './Arguido.scss';

const Arguido: React.FC = () => {

    const [paisDeEmissao, setPaisDeEmissao] = useState<string>();
    const [isProprietarioDoVeiculo, setIsProprietarioDoVeiculo] = useState(false);
    const [selectedSingularColetivo, setSelectedSingularColetivo] = useState<string>('');
    const [number, setNumber] = useState<number>();
    const [popoverDate1, setPopoverDate1] = useState('');
    const [popoverDate2, setPopoverDate2] = useState('');
    const [popoverDate3, setPopoverDate3] = useState('');
    const popoverIndentVeiculoIsOpen = useAppSelector((state: { popoverIndentVeiculo: { isOpen: any; }; }) => state.popoverIndentVeiculo.isOpen)
    return (
        <IonCard>

            <IonCardHeader>
                <IonCardTitle>Arguido</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol sizeSm='6'>
                            <IonItem>
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
                        <IonCol sizeSm='3'>
                            <IonItem>
                                <IonButton color='medium' fill="clear" id="open-search-input-1">
                                    <IonIcon icon={search}/>
                                </IonButton>
                                <IonInput placeholder='NIF'/>

                            </IonItem>
                        </IonCol>
                        <IonCol sizeSm='3'>
                            <IonItem lines='none'>

                                <IonButton style={{background: '#084F87', borderRadius: 4}} color="#084F87" slot="start"
                                           size='default' onClick={() => {
                                    dispatch(setVisiblePopoverIndentVeiculo(true));
                                }}>
                                    Pesquisar
                                </IonButton>

                            </IonItem>
                        </IonCol>
                        <IonCol>

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
                        <IonCol sizeSm='3'>

                            <IonRadioGroup value={selectedSingularColetivo}
                                           onIonChange={e => setSelectedSingularColetivo(e.detail.value)}>

                                <IonItem lines='none'>
                                    <IonLabel>Singular</IonLabel>
                                    <IonRadio slot="start" value="biff"/>
                                </IonItem>

                                <IonItem lines='none'>
                                    <IonLabel>Coletivo</IonLabel>
                                    <IonRadio slot="start" value="griff"/>
                                </IonItem>

                            </IonRadioGroup>
                        </IonCol>
                        <IonCol sizeSm='3'>
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


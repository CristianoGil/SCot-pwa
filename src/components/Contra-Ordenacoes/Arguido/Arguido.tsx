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
    useIonAlert,
} from '@ionic/react';
import {useContext, useState} from 'react';
import {search} from 'ionicons/icons';
import React from 'react';
import {useAppSelector} from '../../../app/hooks';
import {setVisiblePopoverIndentVeiculo} from '../../Menu/popoverIndentVeiculoSlice';
import './Arguido.scss';
import Pais from '../../Combos/Pais';
import {AlertNetworkOfflineContext} from '../../../Context/AlertNetworkOfflineContext';
import { getNetworkState } from '../../../common/capacitor_global';
import { NetworkInterfaceContext } from '../../../Context/NetworkInterfaceContext';

const Arguido: React.FC = () => {

    const alertOfflineContext = useContext<any>(AlertNetworkOfflineContext)
    const networkInterfaceContext = useContext<any>(NetworkInterfaceContext);
    
    const [presentAlert, dismissAlert] = useIonAlert();

    const [paisDeEmissao, setPaisDeEmissao] = useState<string>();
    const [isProprietarioVeiculo, setIsProprietarioVeiculo] = useState(false);
    const [arguidoVeiculoSingularColetivo, setArguidoVeiculoSingularColetivo] = useState<string>('singular');

    //START:  INPUT NIF
    const [arguidoNif, setArguidoNif] = useState('');
    const keyup_arguidoNif = (e: any) => {
        setArguidoNif(e.target.value);
    }

    const [inputNif_color, setInputNif_color] = useState<string>();
    const inputNif_canSearch = () => {
        const chartsLength = arguidoNif.length;
        let inputColor: string;

        if (chartsLength > 0 && (chartsLength > 9 || 9 > chartsLength)) {
            inputColor = 'danger';
        } else if (chartsLength === 9) {
            inputColor = 'success';
        }

        setTimeout(() => {
            setInputNif_color(inputColor)
        });

        return chartsLength !== 9;
    }

    const handler_arguidoSearchByNif = (e: any) => {

        // dispatch(setVisiblePopoverIndentVeiculo(true));

        if (inputNif_canSearch()) {
            presentAlert({
                header: 'Atenção!',
                message: 'NIF inválido.',
                buttons: [
                    {text: 'Fechar'},
                ]
            })
            return;
        }

        if(networkInterfaceContext.stateNetwork() === 'offline') {
            alertOfflineContext.openModal();
            return;
        }

        e.preventDefault();
    }
    // END: INPUT NIF


    return (
        <IonCard className={'co-arguido'}>

            <IonCardHeader>
                <IonCardTitle>Arguido</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='4'>
                            <IonItem lines={'none'}>
                                <IonLabel>O arguido é proprietário do veículo?</IonLabel>
                                <IonToggle
                                    slot="end"
                                    name="arguido-proprietarioVeiculo"
                                    checked={isProprietarioVeiculo}
                                    onIonChange={e => {
                                        setIsProprietarioVeiculo(e.detail.checked)
                                    }}
                                />
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size-sm='8' size-md='6' size-lg='4'>
                            <IonItem>
                                <IonButton color='medium' fill="clear" id="open-search-input-1">
                                    <IonIcon icon={search}/>
                                </IonButton>
                                <IonInput maxlength={9}
                                          minlength={9}
                                          color={inputNif_color}
                                          required={true}
                                          clearInput={true}
                                          name='arguido-nif'
                                          value={arguidoNif}
                                          onKeyUp={keyup_arguidoNif}
                                          placeholder='NIF'/>
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='4' size-md='6' size-lg='2'>
                            <IonItem lines='none'>
                                <IonButton style={{background: '#084F87', borderRadius: 4}}
                                           color="#084F87"
                                           slot="start"
                                           disabled={inputNif_canSearch()}
                                           size='default'
                                           onClick={handler_arguidoSearchByNif}> Pesquisar </IonButton>

                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='8' size-lg='6' >
                            <div style={{
                                display: 'inline-flex',
                                borderRadius: 10,
                                background: '#FEF7EA',
                                width: '100%',
                                border: 'none'
                            }}>
                                <IonImg src={'assets/images/Group 4529_icon.png'}
                                        style={{width: 'fit-content'}}></IonImg>
                                <strong style={{marginTop: 12, marginLeft: 2, color: 'black'}}>Dados sujeitos a
                                    validação</strong>
                            </div>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md='8' size-lg='4'>

                            <IonRadioGroup value={arguidoVeiculoSingularColetivo}
                                           onIonChange={e => setArguidoVeiculoSingularColetivo(e.detail.value)}>
                                <IonRow>
                                    <IonCol size='6'>
                                        <IonItem lines='none' className="veiculo-proprietario-radio radio-item">
                                            <IonRadio value="singular"/>
                                            <IonLabel>Singular</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size='6'>
                                        <IonItem lines='none' className="veiculo-proprietario-radio radio-Item">
                                            <IonRadio value="colection"/>
                                            <IonLabel>Coletivo</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonRadioGroup>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='4'>
                            <Pais inputName={'arguido-paisEmissao'} textLabel={'País de emissão'}/>

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


import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonPopover,
    IonRadio,
    IonRadioGroup,
    IonRow,
    IonSegment,
    IonSegmentButton,
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonToolbar,
    useIonAlert,
    useIonLoading,
} from '@ionic/react';
import {useContext, useState} from 'react';
import {bookOutline, checkboxOutline, search, star} from 'ionicons/icons';
import React from 'react';
import {useAppSelector} from '../../../../app/hooks';
import {setVisiblePopoverIndentVeiculo} from '../../../Menu/popoverIndentVeiculoSlice';
import './Veiculo.scss';
import Pais from '../../../Combos/Pais';
import {AlertNetworkOfflineContext} from '../../../../Context/AlertNetworkOfflineContext';
import {getNetworkState} from '../../../../common/capacitor_global';
import _ from 'underscore';
import {Contraordenacao} from '../../../../api/Contraordenacao';
import {IPesquisarPessoaResponse} from '../../../../model/contraordenacao';
import CardListItem from '../../../CardListItem';
import DataTable from 'react-data-table-component';
import {ICoimasEmAtraso, IDocumentoPessoa, IMoradaPessoa, IPerson} from '../../../../model/person';
import {dateFormat} from '../../../../utils/apex-formatters';

interface IVeiculo {
    setParentVeiculoData?: any
}

const Veiculo: React.FC<IVeiculo> = (props) => {

    const alertOfflineContext = useContext<any>(AlertNetworkOfflineContext)

    const [presentAlert, dismissAlert] = useIonAlert();
    const [presentOnLoanding, dismissOnLoanding] = useIonLoading();
    const [paisDeEmissao, setPaisDeEmissao] = useState<string>();
    const [isProprietarioVeiculo, setIsProprietarioVeiculo] = useState(false);
    const [VeiculoVeiculoSingularColetivo, setVeiculoVeiculoSingularColetivo] = useState<string>('singular');
    const [openPopoverVeiculoData, setOpenPopoverVeiculoData] = useState(false);

    //START:  INPUT NIF
    const [VeiculoNif, setVeiculoNif] = useState('');
    const keyup_VeiculoNif = (e: any) => {
        setVeiculoNif(e.target.value);
    }

    const [inputNif_color, setInputNif_color] = useState<string>();
    const inputNif_canSearch = () => {
        const chartsLength = VeiculoNif.length;
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

    const handler_VeiculoSearchByNif = (e: any) => {
        e.preventDefault();
        dismissOnLoanding();

        if (inputNif_canSearch() || _.isEmpty(VeiculoNif)) {
            presentAlert({
                header: 'Atenção!',
                message: 'NIF inválido.',
                buttons: [
                    {text: 'Fechar'},
                ]
            })
            return;
        }

        if (!navigator.onLine) {
            alertOfflineContext.openModal();
            return;
        }


        presentOnLoanding({
            message: 'A pesquisar...'
        });

        searchPersonByNif();

    }

    const [VeiculoData, setVeiculoData] = useState<IPerson>();
    const searchPersonByNif = async () => {

        const instanceContraordenacao = new Contraordenacao();
        await instanceContraordenacao.pesquisarPessoa({nif: +VeiculoNif}).then((_VeiculoData: IPesquisarPessoaResponse) => {
            console.log('VeiculoData: ', _VeiculoData);


            setTimeout(() => {
                setOpenPopoverVeiculoData(true);
                setTimeout(() => {
                    setVeiculoData(_VeiculoData.pessoa);
                })
                dismissOnLoanding();
            }, 100)

        }).catch((e: any) => {
            presentAlert({
                header: 'Error!',
                message: 'Operação sem sucesso!\n' + e.message,
                buttons: [
                    {text: 'Fechar'},
                ]
            })
        }).finally(() => {
            dismissOnLoanding();
        })
    }
    // END: INPUT NIF

    const handlerFullfillForm = () => {
        props.setParentVeiculoData(VeiculoData);
        setOpenPopoverVeiculoData(false);
    }

    // START: Popover

    // Morada
    const [segmentMorada, setSegmentMorada] = useState('morada');

    // Documentos
    const [segmentDocumentos, setSegmentDocumentos] = useState('documentos');

    // END: Popover

    return (
        <IonCard className={'co-Veiculo'}>

            <IonCardHeader>
                <IonCardTitle>Veiculo</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='4'>
                            <IonItem lines={'none'}>
                                <IonLabel>O Veiculo é proprietário do veículo?</IonLabel>
                                <IonToggle
                                    slot="end"
                                    name="Veiculo-proprietarioVeiculo"
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
                                          name='Veiculo-nif'
                                          value={VeiculoNif}
                                          onKeyUp={keyup_VeiculoNif}
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
                                           onClick={handler_VeiculoSearchByNif}> Pesquisar </IonButton>

                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='8' size-lg='6'>
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

                            <IonRadioGroup value={VeiculoVeiculoSingularColetivo}
                                           onIonChange={e => setVeiculoVeiculoSingularColetivo(e.detail.value)}>
                                <IonRow>
                                    <IonCol size='6'>
                                        <IonItem lines='none' className="veiculo-proprietario-radio radio-item">
                                            <IonRadio value="singular"/>
                                            <IonLabel className="radioBox">Singular</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size='6'>
                                        <IonItem lines='none' className="veiculo-proprietario-radio radio-Item">
                                            <IonRadio value="colection"/>
                                            <IonLabel className="radioBox">Coletivo</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonRadioGroup>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='4'>
                            <Pais inputName={'Veiculo-paisEmissao'} textLabel={'País de emissão'}/>

                        </IonCol>
                    </IonRow>

                </IonGrid>

            </IonCardContent>


            <IonPopover
                isOpen={openPopoverVeiculoData}
                className="menu popoverVeiculo"
                showBackdrop={true}
                onDidDismiss={() => {
                    setOpenPopoverVeiculoData(false);
                }}>

                <IonHeader className="ion-no-border">
                    <IonToolbar color='transparent'>
                        <IonLabel slot='start'>
                            <h1>
                                Identificação do Veiculo
                            </h1>
                        </IonLabel>

                        <IonButton className="btn-use-data" fill="outline" color="primary" slot="end"
                                   onClick={handlerFullfillForm}
                        >
                            AT/IRN <IonIcon slot="start" icon={checkboxOutline}/>
                        </IonButton>

                        <IonButton className="btn-catalogo" fill="outline" color="medium" slot="end">
                            Catálogo <IonIcon slot="start" icon={bookOutline}/>
                        </IonButton>

                        <IonButton className="btn-close" fill="outline" color="medium" slot="end" onClick={() => {
                            setOpenPopoverVeiculoData(false);
                        }}>
                            Fechar
                        </IonButton>

                    </IonToolbar>
                </IonHeader>

            </IonPopover>

        </IonCard>


    )
}

export default Veiculo


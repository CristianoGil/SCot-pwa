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
import Pais from '../../../Combos/Veiculo/Pais';
import {AlertNetworkOfflineContext} from '../../../../Context/AlertNetworkOfflineContext';
import {getNetworkState} from '../../../../common/capacitor_global';
import _ from 'underscore';
import {Contraordenacao} from '../../../../api/Contraordenacao';
import {IPesquisarPessoaResponse, IPesquisarVeiculoResponse} from '../../../../model/contraordenacao';
import CardListItem from '../../../CardListItem';
import DataTable from 'react-data-table-component';
import {dateFormat} from '../../../../utils/apex-formatters';
import Marca from '../../../Combos/Veiculo/Marca';
import Modelo from '../../../Combos/Veiculo/Modelo';
import Cor from '../../../Combos/Veiculo/Cor';

interface IVeiculo {
    setParentVeiculoData?: any
}

const Veiculo: React.FC<IVeiculo> = (props) => {

    const alertOfflineContext = useContext<any>(AlertNetworkOfflineContext)

    const [presentAlert, dismissAlert] = useIonAlert();
    const [presentOnLoanding, dismissOnLoanding] = useIonLoading();
    const [paisDeEmissao, setPaisDeEmissao] = useState<string>();
    const [isConduzidoVeiculo, setIsConduzidoVeiculo] = useState(false);
    const [VeiculoVeiculoSingularColetivo, setVeiculoVeiculoSingularColetivo] = useState<string>('singular');
    const [openPopoverVeiculoData, setOpenPopoverVeiculoData] = useState(false);

    //START:  INPUT Matricula
    const [veiculoMatricula, setVeiculoMatricula] = useState('');
    const keyup_VeiculoMatricula = (e: any) => {
        setVeiculoMatricula(e.target.value);
    }

    const handler_VeiculoSearchByMatricula = (e: any) => {
        e.preventDefault();
        dismissOnLoanding();

        if (_.isEmpty(veiculoMatricula)) {
            presentAlert({
                header: 'Atenção!',
                message: 'Matricula inválido.',
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

        searchVeiculoByMatricula();

    }

    const [VeiculoData, setVeiculoData] = useState<IVeiculo>();
    const searchVeiculoByMatricula = async () => {

        const instanceContraordenacao = new Contraordenacao();
        await instanceContraordenacao.pesquisarVeiculo({matricula: veiculoMatricula}).then((_veiculoData: IPesquisarVeiculoResponse) => {
            console.log('VeiculoData: ', _veiculoData);


            setTimeout(() => {
                setOpenPopoverVeiculoData(true);
                setTimeout(() => {
                    // @ts-ignore
                    setVeiculoData(_veiculoData.veiculo);
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
    // END: INPUT Matricula

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
                                <IonLabel>O Veiculo é conduzido pelo arguido?</IonLabel>
                                <IonToggle
                                    slot="end"
                                    name="veiculo-conduzidoVeiculo"
                                    checked={isConduzidoVeiculo}
                                    onIonChange={e => {
                                        setIsConduzidoVeiculo(e.detail.checked)
                                    }}
                                />
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size-sm='8' size-md='5' size-lg='3'>
                            <IonItem>
                                <IonButton color='medium' fill="clear" id="open-search-input-1">
                                    <IonIcon icon={search}/>
                                </IonButton>
                                <IonInput
                                          required={true}
                                          clearInput={true}
                                          name='Veiculo-matricula'
                                          value={veiculoMatricula}
                                          onKeyUp={keyup_VeiculoMatricula}
                                          placeholder='Matrícula'/>
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='4' size-md='5' size-lg='2'>
                            <IonItem lines='none'>
                                <IonButton style={{background: '#084F87', borderRadius: 4}}
                                           color="#084F87"
                                           slot="start"
                                           size='default'
                                           onClick={handler_VeiculoSearchByMatricula}> Pesquisar </IonButton>

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
                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <Pais inputName={'veiculo-pais'} textLabel={'País'} interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <Marca inputName={'veiculo-marca'} textLabel={'Marca'} interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <Modelo inputName={'veiculo-modelo'} textLabel={'Modelo'} interface="popover"/>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <Cor inputName={'veiculo-cor'} textLabel={'Cor'} />
                        </IonCol>
                    </IonRow>

                </IonGrid>

            </IonCardContent>



            {/*START: POPOVER*/}
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
            {/*END: POPOVER*/}
        </IonCard>


    )
}

export default Veiculo


//
// <IonCard>
//
// <IonCardHeader>
// <IonCardTitle>Veículo</IonCardTitle>
// </IonCardHeader>
//
// <IonCardContent>
//     <IonGrid>
//         <IonRow>
//             <IonCol sizeSm='6'>
//                 <IonItem>
//                     <IonLabel>O veículo é conduzido pelo Arguido?</IonLabel>
//                     <IonToggle
//                         slot="end"
//                         name="darkMode"
//                         checked={isProprietarioDoVeiculo}
//                         onIonChange={e => {
//                             setIsProprietarioDoVeiculo(e.detail.checked)
//
//                         }}
//                     />
//                 </IonItem>
//             </IonCol>
//         </IonRow>
//         <IonRow>
//             <IonCol sizeSm='3'>
//                 <IonItem>
//                     <IonButton color='medium' fill="clear" id="open-search-input-1">
//                         <IonIcon icon={search}/>
//                     </IonButton>
//                     <IonInput placeholder='Matricula'/>
//
//                 </IonItem>
//             </IonCol>
//             <IonCol sizeSm='3'>
//                 <IonItem lines='none'>
//
//                     <IonButton style={{background: '#084F87', borderRadius: 4}}
//                                color="#084F87" slot="start" size='default'
//                                onClick={() => {
//                                    dispatch(setVisiblePopoverIndentVeiculo(true));
//                                }}>
//                         Pesquisar
//                     </IonButton>
//
//                 </IonItem>
//             </IonCol>
//             <IonCol>
//
//                 <div style={{
//                     display: 'inline-flex',
//                     borderRadius: 10,
//                     background: '#FEF7EA',
//                     width: '100%',
//                     border: 'groove'
//                 }}>
//                     <IonImg src={'assets/images/Group 4529_icon.png'}
//                             style={{width: 'fit-content'}}></IonImg>
//                     <strong style={{marginTop: 12, marginLeft: 2, color: 'black'}}>Dados
//                         sujeitos a validação</strong>
//                 </div>
//
//             </IonCol>
//         </IonRow>
//
//         <IonRow>
//             <IonCol sizeSm='3'>
//
//                 <IonItem>
//                     <IonLabel>País</IonLabel>
//                     <IonSelect value={paisDeEmissao} interface="popover"
//                                onIonChange={e => setPaisDeEmissao(e.detail.value)}>
//                         <IonSelectOption value="female">Female</IonSelectOption>
//                         <IonSelectOption value="male">Male</IonSelectOption>
//                     </IonSelect>
//                 </IonItem>
//             </IonCol>
//             <IonCol sizeSm='3'>
//                 <IonItem>
//                     <IonLabel>Marca</IonLabel>
//                     <IonSelect value={paisDeEmissao} interface="popover"
//                                onIonChange={e => setPaisDeEmissao(e.detail.value)}>
//                         <IonSelectOption value="female">Female</IonSelectOption>
//                         <IonSelectOption value="male">Male</IonSelectOption>
//                     </IonSelect>
//                 </IonItem>
//             </IonCol>
//
//             <IonCol sizeSm='3'>
//                 <IonItem>
//                     <IonLabel>Modelo</IonLabel>
//                     <IonSelect value={paisDeEmissao} interface="popover"
//                                onIonChange={e => setPaisDeEmissao(e.detail.value)}>
//                         <IonSelectOption value="female">Female</IonSelectOption>
//                         <IonSelectOption value="male">Male</IonSelectOption>
//                     </IonSelect>
//                 </IonItem>
//             </IonCol>
//
//             <IonCol sizeSm='3'>
//                 <IonItem>
//                     <IonLabel>Cor</IonLabel>
//                     <IonSelect value={paisDeEmissao} interface="popover"
//                                onIonChange={e => setPaisDeEmissao(e.detail.value)}>
//                         <IonSelectOption value="female">Female</IonSelectOption>
//                         <IonSelectOption value="male">Male</IonSelectOption>
//                     </IonSelect>
//                 </IonItem>
//             </IonCol>
//         </IonRow>
//
//         <IonRow>
//             <IonCol sizeSm='3'>
//
//                 <IonItem>
//                     <IonLabel>Categoria</IonLabel>
//                     <IonSelect value={paisDeEmissao} interface="popover"
//                                onIonChange={e => setPaisDeEmissao(e.detail.value)}>
//                         <IonSelectOption value="female">Female</IonSelectOption>
//                         <IonSelectOption value="male">Male</IonSelectOption>
//                     </IonSelect>
//                 </IonItem>
//             </IonCol>
//             <IonCol sizeSm='3'>
//                 <IonItem>
//                     <IonLabel>Classe</IonLabel>
//                     <IonSelect value={paisDeEmissao} interface="popover"
//                                onIonChange={e => setPaisDeEmissao(e.detail.value)}>
//                         <IonSelectOption value="female">Female</IonSelectOption>
//                         <IonSelectOption value="male">Male</IonSelectOption>
//                     </IonSelect>
//                 </IonItem>
//             </IonCol>
//
//             <IonCol sizeSm='3'>
//                 <IonItem>
//                     <IonLabel>Tipo</IonLabel>
//                     <IonSelect value={paisDeEmissao} interface="popover"
//                                onIonChange={e => setPaisDeEmissao(e.detail.value)}>
//                         <IonSelectOption value="female">Female</IonSelectOption>
//                         <IonSelectOption value="male">Male</IonSelectOption>
//                     </IonSelect>
//                 </IonItem>
//             </IonCol>
//
//             <IonCol sizeSm='3'>
//                 <IonItem>
//                     <IonLabel>Subclasse</IonLabel>
//                     <IonSelect value={paisDeEmissao} interface="popover"
//                                onIonChange={e => setPaisDeEmissao(e.detail.value)}>
//                         <IonSelectOption value="female">Female</IonSelectOption>
//                         <IonSelectOption value="male">Male</IonSelectOption>
//                     </IonSelect>
//                 </IonItem>
//             </IonCol>
//         </IonRow>
//     </IonGrid>
//
// </IonCardContent>
// </IonCard>
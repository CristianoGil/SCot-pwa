import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
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
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonToolbar,
    useIonAlert,
    useIonLoading,
} from '@ionic/react';
import {useContext, useState} from 'react';
import {bookOutline, search, star} from 'ionicons/icons';
import React from 'react';
import {useAppSelector} from '../../../app/hooks';
import {setVisiblePopoverIndentVeiculo} from '../../Menu/popoverIndentVeiculoSlice';
import './Arguido.scss';
import Pais from '../../Combos/Pais';
import {AlertNetworkOfflineContext} from '../../../Context/AlertNetworkOfflineContext';
import {getNetworkState} from '../../../common/capacitor_global';
import _ from 'underscore';
import {Contraordenacao} from '../../../api/Contraordenacao';
import {IPesquisarPessoaResponse} from '../../../model/contraordenacao';
import CardListItem from '../../CardListItem';
import DataTable from 'react-data-table-component';
import { IPerson } from '../../../model/person';

const Arguido: React.FC = () => {

    const alertOfflineContext = useContext<any>(AlertNetworkOfflineContext)

    const [presentAlert, dismissAlert] = useIonAlert();
    const [presentOnLoanding, dismissOnLoanding] = useIonLoading();
    const [paisDeEmissao, setPaisDeEmissao] = useState<string>();
    const [isProprietarioVeiculo, setIsProprietarioVeiculo] = useState(false);
    const [arguidoVeiculoSingularColetivo, setArguidoVeiculoSingularColetivo] = useState<string>('singular');
    const [openPopoverArguidoData, setOpenPopoverArguidoData] = useState(false);

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
        e.preventDefault();
        dismissOnLoanding();

        if (inputNif_canSearch() || _.isEmpty(arguidoNif)) {
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

    const [arguidoData, setArguidoData] = useState<IPerson>();
    const searchPersonByNif = async () => {

        const instanceContraordenacao = new Contraordenacao();
        await instanceContraordenacao.pesquisarPessoa({nif: +arguidoNif}).then((_arguidoData: IPesquisarPessoaResponse) => {
            console.log('arguidoData: ', _arguidoData);
            
            
            setTimeout(() => {
                setOpenPopoverArguidoData(true);
                setTimeout(() => {
                    setArguidoData(_arguidoData.pessoa);
                })
                dismissOnLoanding();
            },100)

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


            <IonPopover
                isOpen={openPopoverArguidoData}
                className="menu popoverArguido"
                showBackdrop={true}
                onDidDismiss={() => {
                    setOpenPopoverArguidoData(false);
                }}>

                <IonHeader className="ion-no-border">
                    <IonToolbar color='transparent'>
                        <IonLabel slot='start'>
                            <h1>
                                Identificação do Arguido
                            </h1>
                        </IonLabel>

                        <IonButton className="btn-catalogo" fill="outline" color="medium" slot="end">
                            Catálogo <IonIcon slot="start" icon={bookOutline}/>
                        </IonButton>

                        <IonButton className="btn-close" fill="outline" color="medium" slot="end" onClick={() => {
                            setOpenPopoverArguidoData(false);
                        }}>
                            Fechar
                        </IonButton>

                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    {/* Identificacao da pessoa */}
                    <IonCard style={{margin: 30}}>

                        <IonCardHeader>
                            <IonCardTitle>Informação do pessoal</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>

                                <CardListItem
                                    c1={{titulo: 'NIF', valor: arguidoData?.nif}}
                                    c2={{titulo: 'Nome', valor: arguidoData?.nome}}
                                    c3={{titulo: 'Tipo', valor: 'Passageiros'}}
                                    c4={{titulo: 'Subclasse', valor: 'n/d'}}
                                />

                                <CardListItem
                                    c1={{titulo: 'Matrícula', valor: '00-XX-01'}}
                                    c2={{titulo: 'Chassi', valor: 'VF12R5A1H52369818'}}
                                    c3={{titulo: 'Ano Origem', valor: '2021'}}
                                    c4={{titulo: 'País de Origem', valor: 'Portugal'}}
                                />

                                <CardListItem
                                    c1={{titulo: 'Marca', valor: 'Toyota'}}
                                    c2={{titulo: 'Modelo', valor: 'Corolla'}}
                                    c3={{titulo: 'Cor principal', valor: 'Preto'}}
                                    c4={{titulo: 'Situação do veículo', valor: 'Veículo regular'}}
                                />

                                <CardListItem
                                    c1={{titulo: 'Data primeira matrícula', valor: '01-01-2021'}}
                                    c2={{titulo: 'Dígito matrícula', valor: '0'}}
                                    c3={{titulo: 'Variante', valor: '2R5A'}}
                                    c4={{titulo: 'Versão', valor: '2R5A1H'}}
                                />

                                <CardListItem
                                    c1={{titulo: 'Peso bruto', valor: 'n/d'}}
                                    c2={{titulo: 'Peso bruto total', valor: '1658'}}
                                    c3={{titulo: 'Peso bruto conjunto', valor: 'n/d'}}
                                    c4={{titulo: 'Tara total', valor: '1176'}}
                                />

                                <CardListItem
                                    c1={{titulo: 'Data de validade', valor: 'n/d'}}
                                    c2={{titulo: 'Data de matrícula', valor: '2015-03-23'}}
                                    c3={{titulo: 'Nº homologação CE', valor: '213123/1123'}}
                                    c4={{titulo: 'Nº homologação Nacional', valor: '95481667954'}}
                                />

                                <CardListItem
                                    c1={{titulo: 'Cilindrada', valor: '2000'}}
                                    c2={{titulo: 'Potência efetiva', valor: '220'}}
                                    c3={{titulo: 'Tipo combustivel', valor: 'GASOLINA'}}
                                    c4={{titulo: 'Potêncial rpm', valor: '5250'}}
                                />

                                <CardListItem
                                    c1={{titulo: 'Fração pot. efetiva de tara total', valor: 'n/d'}}
                                    c2={{titulo: 'Nº de lugares', valor: '005'}}
                                    c3={{titulo: 'Lotação em pé', valor: 'n/d'}}
                                    c4={{titulo: 'Categoria CE', valor: 'M1'}}
                                />

                                <CardListItem
                                    c1={{titulo: 'Tipo de caixa', valor: 'FECH.C/S TECTO ABRIR'}}
                                    c2={{titulo: 'Distância entre eixos', valor: '2606'}}
                                    c3={{titulo: 'Peso max. admissível 1', valor: '900'}}
                                    c4={{titulo: 'Peso max. admissível 2', valor: '877'}}
                                />

                                <CardListItem
                                    c1={{titulo: 'Peso max. admissível 3', valor: 'n/d'}}
                                    c2={{titulo: 'Peso max. admissível 4', valor: 'n/d'}}
                                    c3={{titulo: 'Peso max. admissível 5', valor: 'n/d'}}
                                    c4={{titulo: 'Peso bruto reb. com travão', valor: '1200'}}
                                />

                                <CardListItem
                                    c1={{titulo: 'Peso bruto reb. sem travão', valor: 'n/d'}}
                                    c2={{titulo: 'Nível sonoro estacionário', valor: '80.0'}}
                                    c3={{titulo: 'Nível sonoro rpm', valor: '3750'}}
                                    c4={{titulo: 'Emissões CO tipo I', valor: '.307'}}
                                />

                                <CardListItem
                                    c1={{titulo: 'Emissão de partículas', valor: 'n/d'}}
                                    c2={{titulo: 'CO2 combinado', valor: '113'}}
                                    c3={{titulo: 'Medida pneus frente', valor: '205/60 R16'}}
                                    c4={{titulo: 'Medida pneus retaguarda', valor: '205/60 R16'}}
                                />

                                <CardListItem
                                    c1={{titulo: 'Comprimento caixa', valor: 'n/d'}}
                                    c2={{titulo: 'Poder elevação', valor: 'n/d'}}
                                />

                                <CardListItem
                                    c1={{
                                        titulo: 'Anotações',
                                        valor: 'PN: 205/55 R17; T125/70 R16 (PNEU EMERGENCIA) BIOCOMBUSTÍVEL: 5%;',
                                        tamCol: '12'
                                    }}
                                />
                            </IonGrid>

                        </IonCardContent>

                        <IonRow class="cardfooter">
                            <IonCol>

                                <IonItem lines='none'>
                                    <div className='ion-text-center'>
                                        <small>Esconder dados complementares do veículo</small><br/>
                                    </div>
                                </IonItem>

                            </IonCol>
                        </IonRow>
                    </IonCard>
                    {/* Identificacao da pessoa */}

                </IonContent>

            </IonPopover>

        </IonCard>


    )
}

export default Arguido

function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}


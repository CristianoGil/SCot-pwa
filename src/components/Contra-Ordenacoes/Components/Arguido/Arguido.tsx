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
import './Arguido.scss';
import Pais from '../../../Combos/Pessoa/Pais';
import {AlertNetworkOfflineContext} from '../../../../Context/AlertNetworkOfflineContext';
import {getNetworkState} from '../../../../common/capacitor_global';
import _ from 'underscore';
import {Contraordenacao} from '../../../../api/Contraordenacao';
import {IPesquisarPessoaResponse} from '../../../../model/contraordenacao';
import CardListItem from '../../../CardListItem';
import DataTable from 'react-data-table-component';
import {ICoimasEmAtraso, IDocumentoPessoa, IMoradaPessoa, IPerson} from '../../../../model/person';
import {dateFormat} from '../../../../utils/apex-formatters';

interface IArguido {
    setParentArguidoData?: any
}

const Arguido: React.FC<IArguido> = (props) => {

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
        props.setParentArguidoData(arguidoData);

        const _data = arguidoData || ({} as unknown as IPerson);

        setArguidoVeiculoSingularColetivo(_data.tipoPessoa);

        setOpenPopoverArguidoData(false);
    }

    // START: Popover

    // Morada
    const [segmentMorada, setSegmentMorada] = useState('morada');

    // Documentos
    const [segmentDocumentos, setSegmentDocumentos] = useState('documentos');

    // END: Popover

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
                            <div className="info-content-label" style={{
                                display: 'inline-flex',
                                borderRadius: 10,
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

                            <IonRadioGroup value={arguidoVeiculoSingularColetivo} onIonChange={e => setArguidoVeiculoSingularColetivo(e.detail.value)}>
                                <IonRow>

                                    <IonCol size='6'>
                                        <IonItem lines='none' className="veiculo-proprietario-radio radio-item">
                                            <IonRadio value="singular"/>
                                            <IonLabel className="radioBox">Singular</IonLabel>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol size='6'>
                                        <IonItem lines='none' className="veiculo-proprietario-radio radio-Item">
                                            <IonRadio value="coletivo"/>
                                            <IonLabel className="radioBox">Coletivo</IonLabel>
                                        </IonItem>
                                    </IonCol>

                                </IonRow>
                            </IonRadioGroup>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='4'>
                            <Pais inputName={'arguido-paisEmissao'}  textLabel={'País de emissão'} interface="popover"/>
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

                        <IonButton className="btn-use-data" fill="outline" color="primary" slot="end"
                                   onClick={handlerFullfillForm}
                        >
                            AT/IRN <IonIcon slot="start" icon={checkboxOutline}/>
                        </IonButton>

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
                            <IonCardTitle>Informação pessoal</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>
                                <CardListItem
                                    c1={{titulo: 'NIF', valor: arguidoData?.nif}}
                                    c2={{titulo: 'Nome', valor: arguidoData?.nome}}
                                    c3={{
                                        titulo: 'Data de Nascimento',
                                        valor: dateFormat(`${arguidoData?.dataNascimento}`, 'yyyy-MM-DD')
                                    }}

                                />
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Identificacao da pessoa */}

                    {/* START: Coimas */}
                    <IonCard style={{margin: 30}}>

                        <IonCardHeader>
                            <IonCardTitle>Coimas em Atraso</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>
                                {arguidoData?.isCoimasEmAtraso ?
                                    (arguidoData?.coimasEmAtraso || []).map((coimas: ICoimasEmAtraso, index) => {
                                            return (
                                                <IonCardContent key={`${coimas.id}-${coimas.data}-${index}`}>

                                                    <IonCardHeader>
                                                        <IonCardSubtitle>Coima - {++index}</IonCardSubtitle>
                                                    </IonCardHeader>

                                                    < CardListItem
                                                        c1={{
                                                            titulo: 'Data',
                                                            valor: dateFormat(`${coimas?.data}`, 'yyyy-MM-DD[ ]hh[h]mm')
                                                        }}
                                                        c2={{titulo: 'Número de Infração', valor: coimas?.numeroAuto}}
                                                        c3={{titulo: 'Codigo de Infração', valor: coimas?.codInfracao}}
                                                        c4={{
                                                            titulo: 'Valor',
                                                            valor: coimas?.valor
                                                        }}

                                                    />

                                                    < CardListItem
                                                        c1={{
                                                            titulo: 'Valor Checado',
                                                            valor: coimas?.valorChecado ? 'Sim' : 'Não'
                                                        }}
                                                        c2={{titulo: 'Custas', valor: coimas?.custas}}
                                                        c3={{
                                                            titulo: 'Custas Checada',
                                                            valor: coimas?.valorChecado ? 'Sim' : 'Não'
                                                        }}
                                                        c4={{
                                                            titulo: 'Total',
                                                            valor: coimas?.total
                                                        }}

                                                    />
                                                </IonCardContent>
                                            )
                                        }
                                    )
                                    :
                                    <CardListItem
                                        c1={{
                                            titulo: 'Nota:',
                                            valor: 'Não tem coimas em atraso',
                                            tamCol: '12'
                                        }}
                                    />
                                }
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* END: Coimas */}

                    {/* START: Morada  */}
                    <IonCard style={{margin: 30}}>
                        <IonGrid>
                            <IonRow>
                                <IonCol size-sm="12" size-md="12" size-lg="8">
                                    <IonToolbar>
                                        <IonSegment slot="start"
                                                    onIonChange={(e: any) => setSegmentMorada(e.detail.value)}
                                                    value={segmentMorada}>
                                            <IonSegmentButton value="morada">Morada</IonSegmentButton>
                                            <IonSegmentButton value="historico_da_morada">Histórico da
                                                Morada</IonSegmentButton>
                                        </IonSegment>
                                    </IonToolbar>
                                </IonCol>
                            </IonRow>
                        </IonGrid>

                        {segmentMorada === 'morada' ?

                            (arguidoData?.moradas || []).map((morada: IMoradaPessoa, index) => {
                                return (
                                    <IonCardContent style={{margin: 30, marginTop: 0, paddingTop: 0}}
                                                    key={`${morada.id}-${morada.morada}-${index}`}>

                                        <IonCardHeader>
                                            <IonCardSubtitle>Morada - {morada.morada}</IonCardSubtitle>
                                        </IonCardHeader>

                                        < CardListItem
                                            c1={{
                                                titulo: 'Local',
                                                valor: morada.local.descricao
                                            }}

                                            c2={{titulo: 'Localidade', valor: morada?.localidade}}
                                            c3={{titulo: 'Principal', valor: morada?.principal ? 'Sim' : 'Não'}}
                                            c4={{
                                                titulo: 'Código postal',
                                                valor: morada?.codigoPostal
                                            }}

                                        />

                                    </IonCardContent>
                                )
                            })

                            :

                            (arguidoData?.historicoMoradas || []).map((morada: IMoradaPessoa, index) => {
                                return (
                                    <IonCardContent style={{margin: 30, marginTop: 0, paddingTop: 0}}
                                                    key={`${morada.id}-${morada.morada}-${index}`}>

                                        <IonCardHeader>
                                            <IonCardSubtitle>Morada - {morada.morada}</IonCardSubtitle>
                                        </IonCardHeader>

                                        < CardListItem
                                            c1={{
                                                titulo: 'Local',
                                                valor: morada.local.descricao
                                            }}

                                            c2={{titulo: 'Localidade', valor: morada?.localidade}}
                                            c3={{titulo: 'Principal', valor: morada?.principal ? 'Sim' : 'Não'}}
                                            c4={{
                                                titulo: 'Código postal',
                                                valor: morada?.codigoPostal
                                            }}

                                        />

                                    </IonCardContent>
                                )
                            })

                        }


                    </IonCard>
                    {/* END: Morada  */}


                    {/* START: Documentos  */}
                    <IonCard style={{margin: 30}}>
                        <IonGrid>
                            <IonRow>
                                <IonCol size-sm="12" size-md="12" size-lg="8">
                                    <IonToolbar>
                                        <IonSegment slot="start"
                                                    onIonChange={(e: any) => setSegmentDocumentos(e.detail.value)}
                                                    value={segmentDocumentos}>
                                            <IonSegmentButton value="documentos">Documentos</IonSegmentButton>
                                            <IonSegmentButton value="historico_da_documentos">Histórico de
                                                Documentos</IonSegmentButton>
                                        </IonSegment>
                                    </IonToolbar>
                                </IonCol>
                            </IonRow>
                        </IonGrid>

                        {segmentDocumentos === 'documentos' ?

                            (arguidoData?.documentos || []).map((documento: IDocumentoPessoa, index) => {
                                return (
                                    <IonCardContent style={{margin: 30, marginTop: 0, paddingTop: 0}}
                                                    key={`${documento.id}-${documento.dataValidade}-${index}`}>

                                        <IonCardHeader>
                                            <IonCardSubtitle>Documento - {++index}</IonCardSubtitle>
                                        </IonCardHeader>

                                        < CardListItem
                                            c1={{
                                                titulo: 'Tipo',
                                                valor: documento.tipoDocumento.descricao
                                            }}

                                            c2={{titulo: 'Número', valor: documento?.numero}}
                                            c3={{
                                                titulo: 'Entidade de Emissão',
                                                valor: documento?.entidadeEmissao.descricao
                                            }}
                                            c4={{
                                                titulo: 'Data Validade',
                                                valor: dateFormat(`${documento?.dataValidade}`, 'yyyy-MM-DD')
                                            }}

                                        />
                                        < CardListItem
                                            c1={{
                                                titulo: 'Visualizado',
                                                valor: documento.visualizado ? 'Sim' : 'Nâo'
                                            }}

                                            c2={{titulo: 'Principal', valor: documento?.principal ? 'Sim' : 'Nâo'}}

                                        />
                                    </IonCardContent>
                                )
                            })

                            :

                            (arguidoData?.historicoDocumentos || []).map((documento: IDocumentoPessoa, index) => {
                                return (
                                    <IonCardContent style={{margin: 30, marginTop: 0, paddingTop: 0}}
                                                    key={`${documento.id}-${documento.dataValidade}-${index}`}>
                                        <IonCardHeader>
                                            <IonCardSubtitle>Documento - {++index}</IonCardSubtitle>
                                        </IonCardHeader>

                                        < CardListItem
                                            c1={{
                                                titulo: 'Tipo',
                                                valor: documento.tipoDocumento.descricao
                                            }}

                                            c2={{titulo: 'Número', valor: documento?.numero}}
                                            c3={{
                                                titulo: 'Entidade de Emissão',
                                                valor: documento?.entidadeEmissao.descricao
                                            }}
                                            c4={{
                                                titulo: 'Data Validade',
                                                valor: dateFormat(`${documento?.dataValidade}`, 'yyyy-MM-DD')
                                            }}

                                        />
                                        < CardListItem
                                            c1={{
                                                titulo: 'Visualizado',
                                                valor: documento.visualizado ? 'Sim' : 'Nâo'
                                            }}

                                            c2={{titulo: 'Principal', valor: documento?.principal ? 'Sim' : 'Nâo'}}

                                        />

                                    </IonCardContent>
                                )
                            })

                        }

                    </IonCard>
                    {/* END: Documentos  */}


                </IonContent>

            </IonPopover>

        </IonCard>


    )
}

export default Arguido


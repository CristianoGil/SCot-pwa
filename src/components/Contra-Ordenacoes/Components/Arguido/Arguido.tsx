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
    IonToggle,
    IonToolbar,
    useIonAlert,
    useIonLoading,
} from '@ionic/react';

import { useContext, useState } from 'react';
import { bookOutline, search } from 'ionicons/icons';
import React from 'react';
import './Arguido.scss';
import Pais from '../../../Combos/Pessoa/Pais';
import { AlertNetworkOfflineContext } from '../../../../Context/AlertNetworkOfflineContext';
import _ from 'underscore';
import { Contraordenacao } from '../../../../api/Contraordenacao';
import { IPesquisarPessoaResponse } from '../../../../model/contraordenacao';
import CardListItem from '../../../CardListItem';
import { IPerson } from '../../../../model/person';
import { dateFormat } from '../../../../utils/apex-formatters';
import { arguidoSchema } from '../../../../Validations/ArguidoValidation';
import { informationCircle } from "ionicons/icons";
import DataTable from 'react-data-table-component';
import { CoimasService } from '../../../../api/CoimasService';
import { SancoesService } from '../../../../api/SancoesService';
import { DocumentoApreendido } from '../../../../api/DocumentoApreendido';
import { CartaConducaoService } from '../../../../api/CartaConducaoService';

const columnsCoimasAtraso = [
    {
        name: 'Número auto',
        selector: (row: { numeroAuto: any; }) => row.numeroAuto,
    },
    {
        name: 'Código infração',
        selector: (row: { codigoInfracao: any; }) => row.codigoInfracao,
    },
    {
        name: 'Valor a pagar',
        selector: (row: { valorPagar: any; }) => row.valorPagar,
    },
    {
        name: 'Data primeira notificação',
        selector: (row: { primeiraNotificacao: any; }) => row.primeiraNotificacao,
    },


];


interface CoimasDto {
    numeroAuto: string, codigoInfracao: string, valorPagar: string, primeiraNotificacao: string
}
const dataCoimasAtraso: CoimasDto[] = []
//--------------------------------------

const columnsSancoesAcessorias = [
    {
        name: 'Auto',
        selector: (row: { auto: any; }) => row.auto,
    },
    {
        name: 'Código processo',
        selector: (row: { codigoProcesso: any; }) => row.codigoProcesso,
    },
    {
        name: 'Tribunal',
        selector: (row: { tribunal: any; }) => row.tribunal,
    },
    {
        name: 'Juízo',
        selector: (row: { juizo: any; }) => row.juizo,
    },
    {
        name: 'Data de inibição',
        selector: (row: { dataInibicao: any; }) => row.dataInibicao,
    },
    {
        name: 'Carta Entrada',
        selector: (row: { cartaEntrada: any; }) => row.cartaEntrada,
    },
    {
        name: 'Mais info',
        cell: (row: { accoes: any }) => (
            <IonButton onClick={() => { }} size="small" color="primary" >
                <IonIcon slot="start" icon={informationCircle} />
            </IonButton>
        )
    },

];

const dataSancoesAcessorias:  {
    id: string,
    auto: string | null,
    codigoProcesso: string |null,
    tribunal: string | null,
    juizo: string |null,
    dataInibicao: string | null,
    cartaEntrada: string,
    accoes: string
}[
] = []

//--------------------------------------

const columnsDocumentosApreendidos = [
    {
        name: 'Auto',
        selector: (row: { auto: any; }) => row.auto,
    },
    {
        name: 'Documento',
        selector: (row: { documento: any; }) => row.documento,
    },
    {
        name: 'Localização de documento',
        selector: (row: { localizacaoDocumento: any; }) => row.localizacaoDocumento,
    },
    {
        name: 'Mais info',
        selector: (row: { localizacaoDocumento: any; }) => row.localizacaoDocumento,
    },


];

const dataDocumentosApreendidos: {
    id: number;
    auto: string;
    documento: string;
    localizacaoDocumento: string;
}[] = []

//--------------------------------------

const columnsTituloConducao = [
    {
        name: 'Tipo',
        selector: (row: { tipo: any; }) => row.tipo,
    },
    {
        name: 'Número',
        selector: (row: { numero: any; }) => row.numero,
    },
    {
        name: 'Entidade',
        selector: (row: { entidade: any; }) => row.entidade,
    },
    {
        name: 'Data Emissão',
        selector: (row: { dataEmissao: any; }) => row.dataEmissao,
    },
    {
        name: 'Situação',
        selector: (row: { situacao: any; }) => row.situacao,
    },
    {
        name: 'Mais info',
        cell: (row: { accoes: any }) => (
            <IonButton onClick={() => { }} size="small" color="primary" >
                <IonIcon slot="start" icon={informationCircle} />
            </IonButton>
        )
    },

];

const dataTituloConducao: {
    id: number;
    tipo: string;
    numero: string;
    entidade: string;
    dataEmissao: string;
    situacao: string;
    accoes: string;
}[] = []

//--------------------------------------

const columnsTituloConducao_Categorias = [
    {
        name: 'Categoria',
        selector: (row: { categoria: any; }) => row.categoria,
    },
    {
        name: 'Desc Categoria',
        selector: (row: { descCategoria: any; }) => row.descCategoria,
    },
    {
        name: 'Data Início',
        selector: (row: { dataInicio: any; }) => row.dataInicio,
    },
    {
        name: 'Restrições',
        selector: (row: { restricoes: any; }) => row.restricoes,
    },

];

const dataTituloConducao_Categorias: {
    id: number;
    categoria: string;
    descCategoria: string;
    dataInicio: string;
    restricoes: string;
}[] = []


//--------------------------------------

const columnsOutrosDocumentos = [
    {
        name: 'Tipo',
        selector: (row: { tipo: any; }) => row.tipo,
    },
    {
        name: 'Número',
        selector: (row: { numero: any; }) => row.numero,
    },
    {
        name: 'Entidade',
        selector: (row: { entidade: any; }) => row.entidade,
    },
    {
        name: 'Data Emissão',
        selector: (row: { dataEmissao: any; }) => row.dataEmissao,
    },
    {
        name: 'Data Limite',
        selector: (row: { dataLimite: any; }) => row.dataLimite,
    },
    {
        name: 'Mais info',
        cell: (row: { accoes: any }) => (
            <IonButton onClick={() => { }} size="small" color="primary" >
                <IonIcon slot="start" icon={informationCircle} />
            </IonButton>
        )
    },

];

const dataOutrosDocumentos:
    {
        id: number;
        tipo: string;
        numero: string;
        entidade: string;
        dataEmissao: string;
        dataLimite: string;
        accoes: string;
    }[] = []

//--------------------------------------

const columnsMoradas = [
    {
        name: 'Morada',
        selector: (row: { morada: any; }) => row.morada,
    },

];

const moradas: { id: number; morada: string; }[] = []

interface IArguido {
    setParentArguidoData?: any
}

const Arguido: React.FC<IArguido> = (props) => {

    const alertOfflineContext = useContext<any>(AlertNetworkOfflineContext)

    const [dataCoimas, setDataCoimas] = useState(dataCoimasAtraso);

    const [dataSancoes, setDataSancoes] = useState(dataSancoesAcessorias)
    const [dataMoradas, setDataMoradas] = useState(moradas)
    const [dataDocumentos, setDataDocumentos] = useState(dataDocumentosApreendidos)
    const [dataCConducao, setDataConducao] = useState(dataTituloConducao)
    const [dataCConducaoCategorias, setDataConducaoCategorias] = useState(dataTituloConducao_Categorias)
    const [dataDocumentosContribuente, setDataDocumentosContribuente] = useState(dataOutrosDocumentos)
    const [presentAlert, dismissAlert] = useIonAlert();
    const [presentOnLoanding, dismissOnLoanding] = useIonLoading();
    const [isProprietarioVeiculo, setIsProprietarioVeiculo] = useState(false);
    const [arguidoVeiculoSingularColetivo, setArguidoVeiculoSingularColetivo] = useState<string>('singular');
    const [openPopoverArguidoData, setOpenPopoverArguidoData] = useState(false);
    const [currentArguidoData, setCurrentArguidoData] = useState<any>()
    //START:  INPUT NIF
    const [arguidoNif, setArguidoNif] = useState('');
    const keyup_arguidoNif = (e: any) => {
        setArguidoNif(e.target.value);
    }

    const [inputNif_color, setInputNif_color] = useState<string>();
    const inputNif_canSearch = () => {

        const nif_IsValid = arguidoSchema.isValidSync({ nif: arguidoNif })
        let inputColor: string;

        if (nif_IsValid) {
            inputColor = 'success';
        } else {
            inputColor = 'danger';
        }

        setTimeout(() => {
            setInputNif_color(inputColor)
        });

        return !nif_IsValid;
    }

    const handler_arguidoSearchByNif = (e: any) => {
        e.preventDefault();
        dismissOnLoanding();

        if (inputNif_canSearch() || _.isEmpty(arguidoNif)) {
            presentAlert({
                header: 'Atenção!',
                message: 'NIF inválido.',
                buttons: [
                    { text: 'Fechar' },
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
        await instanceContraordenacao.pesquisarPessoa({ nif: +arguidoNif }).then((_arguidoData: IPesquisarPessoaResponse) => {

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
                    { text: 'Fechar' },
                ]
            })
        }).finally(() => {
            dismissOnLoanding();
        })
    }
    // END: INPUT NIF

    const handlerFullfillForm = () => {

        props.setParentArguidoData(arguidoData);

        setCurrentArguidoData(arguidoData);

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

    // Pais
    const [paisEmissao, setPaisEmissao] = useState();

    React.useEffect(() => {
        const _data = {
            isProprietarioVeiculo: isProprietarioVeiculo,
            nif: arguidoNif,
            arguidoVeiculoSingularColetivo: arguidoVeiculoSingularColetivo,
            paisEmissao: paisEmissao
        }

        if (_.has(props, 'setParentArguidoData')) {
            let __data = _data;
            if (currentArguidoData) {
                __data = Object.assign(__data, currentArguidoData)
            }
            props.setParentArguidoData(__data)
        }

    }, [isProprietarioVeiculo, arguidoNif, arguidoVeiculoSingularColetivo, paisEmissao])


    const carregarInformacoesServico = () => {

        presentOnLoanding({
            message: 'Por favor aguarde...'
        });

        new Contraordenacao().pesquisarPessoa({ nif: +arguidoNif, consultarWebService: true }).then(response => {
            setArguidoData(response.pessoa);

            for (let index = 0; index < response.pessoa.moradas.length; index++) {
                setDataMoradas([...dataMoradas, {
                    id: index + 1,
                    morada: response.pessoa.moradas[index].fracao + " " + response.pessoa.moradas[index].principal
                }])
            }

            

            new CoimasService().getCoimasVoluntEmAtraso({
                companyId: "ANSR",
                userId: "loggedUser",
                password: "loggedUserPassword",
                docType: "NIF",
                docId: arguidoNif,

            }).then(wscoimasresponse => {
                console.table(wscoimasresponse.occurs)
                wscoimasresponse.occurs.forEach(coima => {
                    const coimaLine = {
                        numeroAuto: coima.lawsuitCod,
                        codigoInfracao: coima.infrctCod,
                        valorPagar: coima.debtValue,
                        primeiraNotificacao: coima.notifDate

                    }
                 
                    setDataCoimas([...dataCoimas, coimaLine])

                })

            }).catch(wscoimaserror => {
                console.log(wscoimaserror)
            })

            new SancoesService().pesquisarSancoesAcessorias({
                countryId: "PT",
                entityCode: 'PT',
                entityType: 'S',
                forca: 'loggedUserForca',
                idUtilizador: 'loggedUserId',
                numeroDocumento: arguidoNif,
                tipoDocumento: '7'
            }).then(sancoeswsresponse => {
                    for (let index = 0; index < sancoeswsresponse.acessoriasResponses.length; index++) {
                        const element = sancoeswsresponse.acessoriasResponses[index];
                        const sancao = {
                            id: String(index+1),
                            auto: element.codigoAuto,
                            codigoProcesso: element.codigoProcesso,
                            tribunal: element.tribunal,
                            juizo: element.juizo,
                            dataInibicao: element.dataIniCump,
                            cartaEntrada: element.cartaEntregue,
                            accoes: "ver detalhes"
                        }  
                        setDataSancoes([...dataSancoes, sancao]);                    }


            }).catch(sancoeserror => {
                console.assert(sancoeserror)
            })

            new DocumentoApreendido().consultaDocumentosApreendidos(
                {
                    designacao: 'focas.kandulo@ambisig.com',
                    entidade: 'loggerUser',
                    nomeUtilizador: 'loggedUser',
                    sistema: 'SCOT',
                    utilizador: 'loggedUser',
                    numeroDocumento: '4234234',
                    paisDocumento: 'PT',
                    tipoDocumento: 5,
                    tipoContribuinte: 1
                }
            ).then(docsresponse => {
                setDataDocumentos([...dataDocumentos,{
                    auto: docsresponse.indActivo,
                    documento: docsresponse.descTipo,
                    localizacaoDocumento: docsresponse.textoLocal,
                    id: docsresponse.idItem
                } ])
             
            }).catch(docserr => {
console.log("error due", docserr)

            })

            new CartaConducaoService().obterDadosCartaConducao({
                idSistema: 4,
                codPaisNIF: 'PT',
                numNIF: arguidoNif,
                idTipoDocumento: 1,
                codPaisDocumento: 'PT',
                numDocumento: arguidoNif,
                flObterImagensExterno: ''
            }).then(ccresponse => {
                setDataConducao([...dataCConducao, {
                    id: 1,
                    tipo: ccresponse.nomesProprios,
                    numero: ccresponse.numeroCarta,
                    entidade: ccresponse.entidadeEmissora,
                    dataEmissao: ccresponse.dataEmissao,
                    situacao: ccresponse.dscSituacao,
                    accoes: "Ver detalhes"
                }])
               

                // ccresponse.localNascimento
                // ccresponse.dataNascimento

                interface Restricoes {
                    restricao: Restricao[];
                }
                interface Restricao {
                    codRestricao: string;
                    dscRestricao: string;
                    txAnotacao: string;
                }
                const categorias: {
                    codCategoria: string;
                    dscCategoria: string;
                    dataInicio: string;
                    dataValidade: string;
                    restricoes: Restricoes;
                }[] = ccresponse.categoria.categoria

                for (let index = 0; index < categorias.length; index++) {
                    setDataConducaoCategorias([...dataCConducaoCategorias,{
                        id: index + 1,
                        categoria: categorias[index].codCategoria,
                        descCategoria: categorias[index].dscCategoria,
                        dataInicio: categorias[index].dataInicio,
                        restricoes: categorias[index].restricoes.restricao[0].dscRestricao
                    } ])
                }
                
            }).catch(ccerror => {
                console.assert(ccerror)
            })
            dismissOnLoanding()
        }).catch(e => {
            dismissOnLoanding()
            presentAlert({
                header: 'Error!',
                message: 'Operação sem sucesso!\n' + e.message,
                buttons: [
                    { text: 'Fechar' },
                ]
            })


        })

    }
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
                                    <IonIcon icon={search} />
                                </IonButton>
                                <IonInput maxlength={9}
                                    minlength={9}
                                    color={inputNif_color}
                                    required={true}
                                    clearInput={true}
                                    name='arguido-nif'
                                    value={arguidoNif}
                                    onKeyUp={keyup_arguidoNif}
                                    placeholder='NIF' />
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='4' size-md='6' size-lg='2'>
                            <IonItem lines='none'>
                                <IonButton style={{ background: '#084F87', borderRadius: 4 }}
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
                                    style={{ width: 'fit-content' }}></IonImg>
                                <strong style={{ marginTop: 12, marginLeft: 2, color: 'black' }}>Dados sujeitos a
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
                                            <IonRadio value="singular" />
                                            <IonLabel className="radioBox">Singular</IonLabel>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol size='6'>
                                        <IonItem lines='none' className="veiculo-proprietario-radio radio-Item">
                                            <IonRadio value="coletivo" />
                                            <IonLabel className="radioBox">Coletivo</IonLabel>
                                        </IonItem>
                                    </IonCol>

                                </IonRow>
                            </IonRadioGroup>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='4'>
                            <Pais selected={paisEmissao} setSelected={setPaisEmissao} inputName={'arguido-paisEmissao'} textLabel={'País de emissão'} interface="popover" />
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
                                Identificação do arguido
                            </h1>
                        </IonLabel>

                        <IonButton onClick={carregarInformacoesServico} className="btn-catalogo" fill="outline" color="medium" slot="end">
                            Catálogo <IonIcon slot="start" icon={bookOutline} />
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
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Informação IMT
                            </IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonButton className="btn-use-data" fill="solid" color="primary" slot="end"
                                onClick={handlerFullfillForm}>
                                Utilizar estes dados <IonIcon slot="start" icon={bookOutline} />
                            </IonButton>
                            <IonGrid>
                                <CardListItem
                                    c1={{ titulo: 'Nome Próprio', valor: arguidoData?.nome }}
                                    c2={{ titulo: 'Apelido', valor: arguidoData?.nome }}
                                    c3={{
                                        titulo: 'Local de Nascimento',
                                        valor: 'null'
                                    }}
                                    c4={{
                                        titulo: 'Data de Nascimento',
                                        valor: dateFormat(`${arguidoData?.dataNascimento}`, 'yyyy-MM-DD')
                                    }}

                                />
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Identificacao da pessoa */}

                    {/* START: Coimas */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Coimas em Atraso</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>
                                <DataTable
                                    columns={columnsCoimasAtraso}
                                    data={dataCoimas}
                                />
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* END: Coimas */}

                    {/* START: Sanções acessórias */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Sanções acessórias</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>

                                <DataTable
                                    columns={columnsSancoesAcessorias}
                                    data={dataSancoes}
                                />
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* END: Sanções acessórias */}

                    {/* START: Documentos apreendidos */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Documentos apreendidos</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>
                                <DataTable
                                    columns={columnsDocumentosApreendidos}
                                    data={dataDocumentos}
                                />

                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* END: Documentos apreendidos */}

                    {/* START: Título de condução */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Título de condução</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>
                                <DataTable
                                    columns={columnsTituloConducao}
                                    data={dataCConducao}
                                />

                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* END: Título de condução */}

                    {/* START: Título de condução - Categorias */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Título de condução - Categorias</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>
                                <DataTable
                                    columns={columnsTituloConducao_Categorias}
                                    data={dataCConducaoCategorias}
                                />

                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* END: Título de condução - Categorias */}

                    {/* START: Outros Documentos */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Outros Documentos</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>
                                <DataTable
                                    columns={columnsOutrosDocumentos}
                                    data={dataDocumentosContribuente}
                                />

                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* END: Outros Documentos */}

                    {/* START: Moradas */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Moradas</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>
                                <DataTable
                                    columns={columnsMoradas}
                                    data={dataMoradas}
                                />

                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* END: Moradas */}
                </IonContent>

            </IonPopover>

        </IonCard>


    )
}

export default Arguido


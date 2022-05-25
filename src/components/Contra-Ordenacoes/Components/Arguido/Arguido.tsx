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
    IonToggle,
    IonToolbar,
    useIonAlert,
    useIonLoading,
} from '@ionic/react';
import { useContext, useState } from 'react';
import { bookOutline, checkboxOutline, search } from 'ionicons/icons';
import React from 'react';
import './Arguido.scss';
import Pais from '../../../Combos/Pessoa/Pais';
import { AlertNetworkOfflineContext } from '../../../../Context/AlertNetworkOfflineContext';
import _ from 'underscore';
import { Contraordenacao } from '../../../../api/Contraordenacao';
import { IPesquisarPessoaResponse } from '../../../../model/contraordenacao';
import CardListItem from '../../../CardListItem';
import { ICoimasEmAtraso, IDocumentoPessoa, IMoradaPessoa, IPerson } from '../../../../model/person';
import { dateFormat } from '../../../../utils/apex-formatters';
import * as yup from 'yup';
import { arguidoSchema } from '../../../../Validations/ArguidoValidation';
import { informationCircle } from "ionicons/icons";
import DataTable from 'react-data-table-component';

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
        selector: (row: { valorPagar: any; }) => row.valorPagar,
    },
    {
        name: 'Mais info',
        cell: (row: { accoes: any }) => (
            <IonButton onClick={() => {}} size="small" color="primary" >
                <IonIcon slot="start" icon={informationCircle} />
            </IonButton>
        )
    },

];

const dataCoimasAtraso = [
    {
        id: 1,
        numeroAuto: 'null',
        codigoInfracao: 'null',
        valorPagar: 'null',
        accoes: 'null',
    },

]

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
            <IonButton onClick={() => {}} size="small" color="primary" >
                <IonIcon slot="start" icon={informationCircle} />
            </IonButton>
        )
    },

];

const dataSancoesAcessorias = [
    {
        id: 1,
        auto: 'null',
        codigoProcesso: 'null',
        tribunal: 'null',
        juizo: 'null',
        dataInibicao: 'null',
        cartaEntrada: 'null',
        accoes: 'null',
    },

]

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

];

const dataDocumentosApreendidos = [
    {
        id: 1,
        auto: 'null',
        documento: 'null',
        localizacaoDocumento: 'null',
    },

]

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
            <IonButton onClick={() => {}} size="small" color="primary" >
                <IonIcon slot="start" icon={informationCircle} />
            </IonButton>
        )
    },

];

const dataTituloConducao = [
    {
        id: 1,
        tipo: 'null',
        numero: 'null',
        entidade: 'null',
        dataEmissao: 'null',
        situacao: 'null',
        accoes: 'null',
    },

]

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

const dataTituloConducao_Categorias = [
    {
        id: 1,
        categoria: 'null',
        descCategoria: 'null',
        dataInicio: 'null',
        restricoes: 'null',
    },

]


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
            <IonButton onClick={() => {}} size="small" color="primary" >
                <IonIcon slot="start" icon={informationCircle} />
            </IonButton>
        )
    },

];

const dataOutrosDocumentos = [
    {
        id: 1,
        tipo: 'null',
        numero: 'null',
        entidade: 'null',
        dataEmissao: 'null',
        dataLimite: 'null',
        accoes: 'null',
    },

]

//--------------------------------------

const columnsMoradas = [
    {
        name: 'Morada',
        selector: (row: { morada: any; }) => row.morada,
    },
];

const dataMoradas = [
    {
        id: 1,
        morada: 'null',
    },

]

interface IArguido {
    setParentArguidoData?: any
}

const Arguido: React.FC<IArguido> = (props) => {

    const alertOfflineContext = useContext<any>(AlertNetworkOfflineContext)

    const [presentAlert, dismissAlert] = useIonAlert();
    const [presentOnLoanding, dismissOnLoanding] = useIonLoading();
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
            arguidoNif: arguidoNif,
            arguidoVeiculoSingularColetivo: arguidoVeiculoSingularColetivo,
            paisEmissao: paisEmissao
        }

        if (_.has(props, 'setParentArguidoData')) {
            props.setParentArguidoData(_data)
        }

    }, [isProprietarioVeiculo, arguidoNif, arguidoVeiculoSingularColetivo, paisEmissao])
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

                            <IonRadioGroup value={arguidoVeiculoSingularColetivo} onIonChange={e => setArguidoVeiculoSingularColetivo(e.detail.value)}>
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

                        <IonButton className="btn-catalogo" fill="outline" color="medium" slot="end">
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
                                data={dataCoimasAtraso}
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
                                data={dataSancoesAcessorias}
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
                                data={dataDocumentosApreendidos}
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
                                data={dataTituloConducao}
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
                                data={dataTituloConducao_Categorias}
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
                                data={dataOutrosDocumentos}
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


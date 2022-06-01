import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonListHeader, IonPopover, IonRadio, IonRadioGroup, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonToolbar } from "@ionic/react";
import { open, trash, remove, bookOutline } from "ionicons/icons";
import { resolve } from "path";
import React from "react";
import { useState } from "react";
import DataTable from 'react-data-table-component';
import { Contraordenacao } from "../../../../api/Contraordenacao";
import { CarregarCombosApreensaoDocumento, MotivosApreensao } from "../../../../model/documentoapreendido";
import CardListItem from "../../../CardListItem";
import DatePicker from "../../../Combos/DatePicker";
import NumeroDocumento from "../../../NumeroDocumento/NumeroDocumento";
import './AcoesComplementares.scss';

interface IProps {
    setAccoesComplementaresParentData?: any
}

const AcoesComplementares: React.FC<IProps> = (props) => {

    const [openPopoverApreensaoDocumentosData, setOpenPopoverApreensaoDocumentosData] = useState(false);
    const [openPopoverFichaControladorData, setOpenPopoverFichaControladorData] = useState(false);

    /* Enumeração de tipo de documento */
    enum TipoDocumento {
        APREENSAO_DOCUMENTOS = 1,
        APREENSAO_VEICULO = 2,
        BLOQUEAMENTO_REMOCAO_VEICULO = 3,
        SUBSTITUICAO_DOCUMENTOS = 4,
        FICHA_CONTROLADOR = 5,
    }
    /* Enumeração de tipo de documento */

    const handleButtonClick_ABRIR = (tipoDocumento: any) => {

        switch (tipoDocumento) {

            case TipoDocumento.APREENSAO_DOCUMENTOS: {
                setOpenPopoverApreensaoDocumentosData(true);
                break;
            }

            case TipoDocumento.APREENSAO_VEICULO: {

                break;
            }

            case TipoDocumento.BLOQUEAMENTO_REMOCAO_VEICULO: {

                break;
            }

            case TipoDocumento.SUBSTITUICAO_DOCUMENTOS: {

                break;
            }

            case TipoDocumento.FICHA_CONTROLADOR: {
                setOpenPopoverFichaControladorData(true);
                break;
            }
            default: {
                break;
            }
        }
    };

    const handleButtonClick_EXCLUIR = (state: any) => {
        console.log('clicked (EXCLUIR)');
        console.log(state);
    };

    const columns = [
        {
            name: 'Tipo de Documento',
            selector: (row: { tipoDocumento: any; }) => row.tipoDocumento,
        },
        {
            name: 'Estado',
            cell: (row: { estado: any }) => (
                <>
                    <IonIcon slot="start" icon={remove} />
                </>
            )
        },
        {
            name: 'Ações',
            cell: (row: { abreTipoDocumento: any }) => (
                <>
                    <IonButton onClick={() => handleButtonClick_ABRIR(row.abreTipoDocumento)} size="small" color="primary" >
                        ABRIR
                        <IonIcon slot="start" icon={open} />
                    </IonButton>

                    <IonButton onClick={() => handleButtonClick_EXCLUIR(row.abreTipoDocumento)} size="small" color="danger" >
                        EXCLUIR
                        <IonIcon slot="start" icon={trash} />
                    </IonButton>
                </>
            )
        },
    ];

    const data = [
        {
            id: 1,
            tipoDocumento: 'Apreensão Documentos',
            estado: 'null',
            abreTipoDocumento: TipoDocumento.APREENSAO_DOCUMENTOS,
        },
        {
            id: 2,
            tipoDocumento: 'Apreensão Veículo',
            estado: 'null',
            abreTipoDocumento: TipoDocumento.APREENSAO_VEICULO,
        },
        {
            id: 3,
            tipoDocumento: 'Bloqueamento/Remoção de Veículo',
            estado: 'null',
            abreTipoDocumento: TipoDocumento.BLOQUEAMENTO_REMOCAO_VEICULO,
        },
        {
            id: 4,
            tipoDocumento: 'Substituição de Documentos',
            estado: 'null',
            abreTipoDocumento: TipoDocumento.SUBSTITUICAO_DOCUMENTOS,
        },
        {
            id: 5,
            tipoDocumento: 'Ficha controlador',
            estado: 'null',
            abreTipoDocumento: TipoDocumento.FICHA_CONTROLADOR,
        },
    ]

    //-------------------------[Motivos Apreensao]

    const columnsMotivosApreensao = [
        {
            name: 'id',
            selector: (row: { _id: any; }) => row._id,
        },
        {
            name: 'Motivo',
            cell: (row: { motivo: any }) => (
                <>
                    <IonIcon slot="start" icon={remove} />
                </>
            )
        },
        {
            name: 'Ações',
            cell: (row: { accoes: any }) => (
                <>
                    <IonButton onClick={() => { }} size="small" color="primary" >
                        ABRIR
                        <IonIcon slot="start" icon={open} />
                    </IonButton>

                    <IonButton onClick={() => { }} size="small" color="danger" >
                        EXCLUIR
                        <IonIcon slot="start" icon={trash} />
                    </IonButton>
                </>
            )
        },
    ];

    interface MotivoApreensaoTable {
        id: number,
        _id: number,
        motivo: string,
        accoes: string,
    }
    const dataMotivosApreensao: MotivoApreensaoTable[] = []
    //-------------------------[Dados Apreensao Documentos]

    const columnsDadosApreensaoDocumentos = [
        {
            name: 'Documento',
            selector: (row: { documento: any; }) => row.documento,
        },
        {
            name: 'Número',
            selector: (row: { numero: any; }) => row.numero,
        },
        {
            name: 'Ações',
            cell: (row: { accoes: any }) => (
                <>
                    <IonButton onClick={() => { }} size="small" color="primary" >
                        ABRIR
                        <IonIcon slot="start" icon={open} />
                    </IonButton>

                    <IonButton onClick={() => { }} size="small" color="danger" >
                        EXCLUIR
                        <IonIcon slot="start" icon={trash} />
                    </IonButton>
                </>
            )
        },
    ];

    interface DadosApreensaoDocumentos {
        id: number,
        numero: number,
        documento: string,
        accoes: string,
    }
    const dataDadosApreensaoDocumentos: DadosApreensaoDocumentos[] = []

    const [combos, setCombos] = useState<MotivosApreensao[]>();
    const [motivosApreensao, setMotivosApreensao] = useState<MotivosApreensao[]>();
    const [dadosApreensaoDocumento, setDadosApreensaoDocumento] = useState<MotivosApreensao[]>();
    const [documento, setDocumento] = useState('');
    const [motivoApreensao, setMotivoApreensao] = useState('');
    const [idMotivoApreensao, setIdMotivoApreensao] = useState(0);
    const [tamanhoMotivoApreensao, setTamanhoMotivoApreensao] = useState(0);
    const [numDocumento, setNumDocumento] = useState('');
    const [localApresentacao, setLocalApresentacao] = useState('');
    const getCombos = async (): Promise<CarregarCombosApreensaoDocumento> => await new Contraordenacao().carregarCombosMotivoApreensao()

    // CarregarCombosApreensaoDocumento
    React.useEffect(() => {
        getCombos().then((combos) => {
            setCombos(combos?.motivosApreensao)
            setDadosApreensaoDocumento(combos?.documentosDadosApreensao)
        }).catch((error) => {
            console.error("Load emissao combos: \n", error);
        })
    }, []);

    const onClick_addAMotivoApreensao = () => {

        const _idMotivoApreensao: any = combos?.find(motivo => motivo?.descricao === motivoApreensao)?.id
        setIdMotivoApreensao(_idMotivoApreensao)

        dataMotivosApreensao.push({
            _id: idMotivoApreensao,
            id: idMotivoApreensao,
            motivo: motivoApreensao,
            accoes: "null"
        })
        setTamanhoMotivoApreensao(dataMotivosApreensao?.length)

    }

    const onClick_addDadosDocumentoApreensao = () => {
        const id: any = dadosApreensaoDocumento?.find(doc => doc?.descricao === documento)?.id

        dataDadosApreensaoDocumentos.push({
            accoes: "",
            documento: documento,
            id: id,
            numero: +numDocumento
        })

    }

    const keyup_numDocumento = (e: any) => {
        setNumDocumento(e.target.value);


    }
    const keyup_localApresentacao = (e: any) => {
        setLocalApresentacao(e.target.value);

    }

    const keyup_regularSituacaoLocal = (e: any) => {
        setRegularSituacaoLocal(e.target.value);
    }

    const keyup_levantarDocsDiaUtilLocal = (e: any) => {
        setLevantarDocsDiaUtilLocal(e.target.value);
    }

    // checkbox handlers constants 
    const [regularSituacaoCheckbox, setRegularSituacaoCheckbox] = useState(false);
    const [regularSituacaoLocal, setRegularSituacaoLocal] = useState('');

    const [levantarDocsDiaCheckbox, setLevantarDocsDiaCheckbox] = useState(false);
    const [levantarDocsDiaUtilLocal, setLevantarDocsDiaUtilLocal] = useState('');

    const [enviaCamaraMunicipal, setEnviaCamaraMunicipal] = useState(false);
    const [camaraMunicipal, setCamaraMunicipal] = useState('');

    const [podeLevantarTituloConducao, setPodeLevantarTituloConducao] = useState(false);
    const [tituloConducao, setTituloConducao] = useState('');

    const keyup_tituloConducao = (e: any) => {
        setTituloConducao(e.target.value);
    }

    interface CamaraMunicipal {
        id: any,
        descricao: any
    }
    const camarasMunicipais: CamaraMunicipal[] = [];

    const [isDiaPagamento, setIsDiaPagamento] = useState(false);
    const [diaPagamento, setDiaPagamento] = useState('');

    interface DiaPagamento {
        id: any,
        descricao: any
    }
    const diasPagamentos: DiaPagamento[] = [];

    const [aplicarSansao, setAplicarSansao] = useState(false);
    const [sancaoAplicada, setSancaoAplicada] = useState('');
    const keyup_sancaoAplicada = (e: any) => {
        setSancaoAplicada(e.target.value);
    }

    const [numeroDocumento, setNumeroDocumento] = useState('');
    const keyup_numeroDocumento = (e: any) => {
        setNumeroDocumento(e.target.value)
    }

    // Ficha controlador
    const [activeSegment, setActiveSegment] = useState('dadosGerais');
    const [dataHora, setDataHora] = useState<string | number>();
    const [dataUltimaAtualizacao, setDataUltimaAtualizacao] = useState<string | number>();
    // AutuadoTesteminha
    const [selectedAutuado_Testemunha, setSelectedAutuado_Testemunha] = useState<string>('fiscal');

    React.useEffect(() => {
        const data = {
            dataMotivosApreensao: dataMotivosApreensao,
            tamanhoMotivoApreensao: tamanhoMotivoApreensao,
            dataDadosApreensaoDocumentos: dataDadosApreensaoDocumentos,
            numDocumento: numDocumento,
            localApresentacao: localApresentacao,
            levantarDocsDiaUtilLocal: levantarDocsDiaUtilLocal,
            regularSituacaoLocal: regularSituacaoLocal,
            camaraMunicipal: camaraMunicipal,
            tituloConducao: tituloConducao,
            diaPagamento: diaPagamento,
            sancaoAplicada: sancaoAplicada,
            numeroDocumento: numeroDocumento
        }

        props.setAccoesComplementaresParentData(data);
    }, [])

    return (

        <IonCard className={'co-acoesComplementares'}>
            <IonCardHeader>
                <IonCardTitle>Ações Complementares</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='12'>
                            <DataTable
                                columns={columns}
                                data={data}
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>

            {/*Popover: Apreensão de documentos*/}
            <IonPopover
                isOpen={openPopoverApreensaoDocumentosData}
                className="menu popoverArguido"
                showBackdrop={true}
                onDidDismiss={() => {
                    setOpenPopoverApreensaoDocumentosData(false);
                }}>

                <IonHeader className="ion-no-border">
                    <IonToolbar color='transparent'>
                        <IonLabel slot='start'>
                            <h1>
                                Apreensão de Documentos
                            </h1>
                        </IonLabel>

                        <IonButton className="btn-use-data" fill="outline" color="primary" slot="end"
                            onClick={() => { }}
                        >
                            EMITIR
                        </IonButton>

                        <IonButton className="btn-catalogo" fill="outline" color="medium" slot="end">
                            IMPRIMIR <IonIcon slot="start" icon={bookOutline} />
                        </IonButton>

                        <IonButton className="btn-close" fill="outline" color="danger" slot="end" onClick={() => {
                            setOpenPopoverApreensaoDocumentosData(false);
                        }}>
                            CANCELAR
                        </IonButton>

                    </IonToolbar>
                </IonHeader>

                <IonContent>

                    {/* Motivos de Apreensão */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size-sm="9" size-md="10" size-lg="9" style={{ marginTop: 16 }}>
                                        <IonItem>
                                            <IonLabel>Motivos da Apreensão *</IonLabel>
                                            <IonSelect interface="popover" onIonChange={e => setMotivoApreensao(e.detail.value)}>
                                                {combos?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={local.id}>{`${local.descricao}`}</IonSelectOption>
                                                    )
                                                })}
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                                        <IonItem lines='none'>
                                            <IonButton style={{ background: '#084F87', borderRadius: 4 }}
                                                color="#084F87"
                                                slot="start"
                                                size='default'
                                                onClick={onClick_addAMotivoApreensao}> ADICIONAR </IonButton>

                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow style={{ marginTop: 20 }}>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>
                                        <DataTable
                                            columns={columnsMotivosApreensao}
                                            data={dataMotivosApreensao}
                                        />
                                    </IonCol>
                                </IonRow>

                                <IonRow style={{ marginTop: 20 }}>

                                    <IonCol size-sm='12' size-md='10' size-lg='6' style={{ marginTop: 22 }}>
                                        <IonHeader style={{ marginBottom: 8 }}>
                                            <IonLabel>Presenciada pelo Autuante?</IonLabel>
                                        </IonHeader>
                                        <strong>Não</strong>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='10' size-lg='6'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome infringida">Nº da Apreensão de Documentos *</IonLabel>
                                            <IonInput
                                                disabled
                                                value={tamanhoMotivoApreensao}></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Motivos de Apreensão */}

                    {/* Dados de Apreensão dos Documentos */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Dados de Apreensão dos Documentos</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size-sm="9" size-md="10" size-lg="5" style={{ marginTop: 16 }}>
                                        <IonItem>
                                            <IonLabel>Documento *</IonLabel>
                                            <IonSelect interface="popover" onIonChange={e => setDocumento(e.detail.value)}>
                                                {combos?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={local.id}>{`${local.descricao}`}</IonSelectOption>
                                                    )
                                                })}
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='10' size-lg='4'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome infringida">Número</IonLabel>
                                            <IonInput value={numDocumento}
                                                onKeyUp={keyup_numDocumento}

                                            ></IonInput>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                                        <IonItem lines='none'>
                                            <IonButton style={{ background: '#084F87', borderRadius: 4 }}
                                                color="#084F87"
                                                slot="start"
                                                //    disabled={}
                                                size='default'
                                                onClick={onClick_addDadosDocumentoApreensao}> ADICIONAR </IonButton>

                                        </IonItem>
                                    </IonCol>
                                </IonRow>

                                <IonRow style={{ marginTop: 20 }}>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>
                                        <DataTable
                                            columns={columnsDadosApreensaoDocumentos}
                                            data={dataDadosApreensaoDocumentos}
                                        />
                                    </IonCol>
                                </IonRow>
                                <IonRow style={{ marginTop: 20 }}>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome infringida">Local de Apresentação</IonLabel>
                                            <IonInput
                                                value={localApresentacao}
                                                onKeyUp={keyup_localApresentacao}>

                                            </IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Dados de Apreensão dos Documentos */}

                    {/* Acções Associadas */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Acções Associadas</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>

                                {/* radioButton input */}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox checked={regularSituacaoCheckbox} onIonChange={e => setRegularSituacaoCheckbox(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                A fim de regularizar a situação, o interessado deverá dirigir-se a
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>

                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome infringida">Descreva aqui o local</IonLabel>
                                            <IonInput
                                                disabled={!regularSituacaoCheckbox}
                                                value={regularSituacaoLocal}
                                                onKeyUp={keyup_regularSituacaoLocal}
                                            ></IonInput>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>

                                {/* radioButton input */}


                                {/* radioButton input */}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox

                                                checked={levantarDocsDiaCheckbox}
                                                onIonChange={e => setLevantarDocsDiaCheckbox(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                os Documentos do Veículo poderão ser levantados nos primeiros cinco dias úteis no
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>

                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome infringida">Descreva aqui o local</IonLabel>
                                            <IonInput

                                                disabled={!levantarDocsDiaCheckbox}
                                                value={levantarDocsDiaUtilLocal}
                                                onKeyUp={keyup_levantarDocsDiaUtilLocal}
                                            ></IonInput>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox checked={enviaCamaraMunicipal} onIonChange={e => setEnviaCamaraMunicipal(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                ou envio a Câmara Municipal de
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>

                                        <IonItem>
                                            <IonLabel></IonLabel>

                                            <IonSelect interface="popover" value={camaraMunicipal} disabled={!enviaCamaraMunicipal} onIonChange={e => setCamaraMunicipal(e.detail.value)}>
                                                {camarasMunicipais?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={local.id}>{`${local.descricao}`}</IonSelectOption>
                                                    )
                                                })}
                                            </IonSelect>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>

                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox checked={podeLevantarTituloConducao} onIonChange={e => setPodeLevantarTituloConducao(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                O Título de Condução poderá ser levantado nos primeiros cinco dias úteis no
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>

                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome infringida"></IonLabel>
                                            <IonInput value={tituloConducao}
                                                disabled={!podeLevantarTituloConducao}
                                                onKeyUp={keyup_tituloConducao}
                                            ></IonInput>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>

                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox checked={isDiaPagamento} onIonChange={e => setIsDiaPagamento(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                a partir do oitavo dia útil, até ao pagamento integral,
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>

                                        <IonItem>
                                            <IonLabel></IonLabel>
                                            <IonSelect interface="popover" disabled={!isDiaPagamento} onIonChange={e => setDiaPagamento(e.detail.value)} >
                                                {diasPagamentos?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={local.id}>{`${local.descricao}`}</IonSelectOption>
                                                    )
                                                })}


                                            </IonSelect>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>

                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox checked={aplicarSansao} onIonChange={e => setAplicarSansao(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                A condução do veículo com o documento de identificação apreendido é sancionada nos termos do nº8 do art. 161 CE com coima de 300 a 1500 euros, sendo o veículo apreendido nos termos do art. 162º nº1 alínea a) do mesmo diploma.
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>

                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome infringida"></IonLabel>
                                            <IonInput value={sancaoAplicada}
                                                disabled={!aplicarSansao}
                                                onKeyUp={keyup_sancaoAplicada}></IonInput>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>

                                {/* radioButton input */}
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>

                    <IonCard style={{ margin: 30 }}>
                        <IonCardContent>
                            <IonGrid>
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12'>
                                        <p style={{ color: 'red' }}>Apenas deverá preencher este número caso não tenha sido possível imprimir o documento e o tenha registado manualmente em pré-impresso(Não será gerado o respectivo expediente).</p>
                                    </IonCol>

                                </IonRow>
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='4'>

                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Número de Documento">Número de Documento</IonLabel>
                                            <IonInput
                                                value={numeroDocumento}
                                                onKeyUp={keyup_numeroDocumento}
                                            ></IonInput>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                            </IonGrid>
                        </IonCardContent>
                    </IonCard>
                    {/* Número de Documentos */}
                </IonContent>

            </IonPopover>
            {/*Popover: Apreensão de documentos*/}

            {/*Popover: Ficha controlador*/}
            <IonPopover
                isOpen={openPopoverFichaControladorData}
                className="menu popoverArguido"
                showBackdrop={true}
                onDidDismiss={() => {
                    setOpenPopoverFichaControladorData(false);
                }}>

                <IonHeader className="ion-no-border">
                    <IonToolbar color='transparent'>
                        <IonLabel slot='start'>
                            <h1>
                                Ficha de Controlador
                            </h1>
                        </IonLabel>

                        <IonButton className="btn-use-data" fill="outline" color="primary" slot="end"
                            onClick={() => { }}
                        >
                            EMITIR
                        </IonButton>

                        <IonButton className="btn-catalogo" fill="outline" color="medium" slot="end">
                            IMPRIMIR <IonIcon slot="start" icon={bookOutline} />
                        </IonButton>

                        <IonButton className="btn-close" fill="outline" color="danger" slot="end" onClick={() => {
                            setOpenPopoverFichaControladorData(false);
                        }}>
                            CANCELAR
                        </IonButton>

                    </IonToolbar>
                </IonHeader>

                <IonContent>


                    {/* START: Ficha de controlador  */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader style={{ padding: 0 }}>
                            <IonGrid style={{ padding: 0 }}>
                                <IonRow>
                                    <IonCol size-sm="12" size-md="12" size-lg="8">
                                        <IonToolbar>
                                            <IonSegment slot="start"
                                                onIonChange={(e: any) => setActiveSegment(e.detail.value)}
                                                value={activeSegment}>
                                                <IonSegmentButton value="dadosGerais">Dados gerais</IonSegmentButton>
                                                <IonSegmentButton value="alcool">Álcool</IonSegmentButton>
                                                <IonSegmentButton value="estupefacientes_outrosPsicotropicos">Estupefacientes e/ou outros psictrópicos</IonSegmentButton>

                                            </IonSegment>
                                        </IonToolbar>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCardHeader>

                        <IonCardContent>


                            {/*Dados gerais*/}
                            <IonGrid className={activeSegment == "dadosGerais" ? "" : "ion-hide"}>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='4' style={{ marginTop: 16 }}>
                                        <DatePicker inputName={'unidade-data_horaInfraccao'} textLabel="Data/Hora *" setSelected={setDataHora}
                                            selected={dataHora} />
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='12' size-lg='4' style={{ marginTop: 16 }}>
                                        <DatePicker inputName={'unidade-data_horaInfraccao'} textLabel="Data de última atualização" setSelected={setDataUltimaAtualizacao}
                                            selected={dataUltimaAtualizacao} />
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='12' size-lg='4' style={{ marginTop: 16 }}>
                                        <IonItem lines='none'>
                                            <div>
                                                <small>ID Terminal</small><br />
                                                <strong>null</strong>
                                            </div>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='6' style={{ marginTop: 16 }}>

                                        <IonRadioGroup value={selectedAutuado_Testemunha}
                                            onIonChange={e => setSelectedAutuado_Testemunha(e.detail.value)}>

                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonListHeader>
                                                        <IonLabel>
                                                            Qualidade
                                                        </IonLabel>
                                                    </IonListHeader>
                                                </IonCol>
                                                <IonCol size='6'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="fiscal" />
                                                        <IonLabel className="radioBox">Autuado</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='6'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="outro" />
                                                        <IonLabel className="radioBox">Testemunha</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>

                                </IonRow>

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='12' style={{ marginTop: 16 }}>

                                        <IonRadioGroup value={selectedAutuado_Testemunha}
                                            onIonChange={e => setSelectedAutuado_Testemunha(e.detail.value)}>

                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonListHeader>
                                                        <IonLabel>
                                                            Ficha Controlador de *
                                                        </IonLabel>
                                                    </IonListHeader>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonCheckbox value="fiscal" />
                                                        <IonLabel className="radioBox">Álcool</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='9'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonCheckbox value="outro" />
                                                        <IonLabel className="radioBox">Estupefacientes e/ou outros psicotrópicos</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>

                                </IonRow>

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='12' style={{ marginTop: 16 }}>

                                        <IonRadioGroup value={selectedAutuado_Testemunha}
                                            onIonChange={e => setSelectedAutuado_Testemunha(e.detail.value)}>

                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonListHeader>
                                                        <IonLabel>
                                                            Circunstâncias de exame álcool *
                                                        </IonLabel>
                                                    </IonListHeader>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="fiscal" />
                                                        <IonLabel className="radioBox">Acidente</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="outro" />
                                                        <IonLabel className="radioBox">Aletória</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="outro" />
                                                        <IonLabel className="radioBox">Início de coondução</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="outro" />
                                                        <IonLabel className="radioBox">Manobra irregular</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>

                                </IonRow>

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='12' style={{ marginTop: 16 }}>

                                        <IonRadioGroup value={selectedAutuado_Testemunha}
                                            onIonChange={e => setSelectedAutuado_Testemunha(e.detail.value)}>

                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonListHeader>
                                                        <IonLabel>
                                                            Circunstância de exame estupefacientes e/ou outros psicotrópicos *
                                                        </IonLabel>
                                                    </IonListHeader>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="fiscal" />
                                                        <IonLabel className="radioBox">Acidente</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="outro" />
                                                        <IonLabel className="radioBox">Indicios</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>

                                </IonRow>
                            </IonGrid>
                            {/*Dados gerais*/}

                            {/*Álcool*/}
                            <IonGrid className={activeSegment == "alcool" ? "" : "ion-hide"}>

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='6' style={{ marginTop: 16 }}>

                                        <IonRadioGroup value={selectedAutuado_Testemunha}
                                            onIonChange={e => setSelectedAutuado_Testemunha(e.detail.value)}>

                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonListHeader>
                                                        <IonLabel>
                                                            Recusa fazer o teste?
                                                        </IonLabel>
                                                    </IonListHeader>
                                                </IonCol>
                                                <IonCol size='6'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="fiscal" />
                                                        <IonLabel className="radioBox">Não</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='6'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="outro" />
                                                        <IonLabel className="radioBox">Sim</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>
                                </IonRow>

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='12' style={{ marginTop: 16 }}>

                                        <IonRadioGroup value={selectedAutuado_Testemunha}
                                            onIonChange={e => setSelectedAutuado_Testemunha(e.detail.value)}>

                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonListHeader>
                                                        <IonLabel>
                                                            Tipo de teste *
                                                        </IonLabel>
                                                    </IonListHeader>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="fiscal" />
                                                        <IonLabel className="radioBox">Teste de ar expirado</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="outro" />
                                                        <IonLabel className="radioBox">Análise sangue</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="outro" />
                                                        <IonLabel className="radioBox">Exame médico</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="outro" />
                                                        <IonLabel className="radioBox">Punível à TAS 0.200 g/l</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>

                                </IonRow>
                            </IonGrid>
                            {/*Álcool*/}

                            {/*Estupefacientes e/ou outros psictrópicos*/}
                            <IonGrid className={activeSegment == "estupefacientes_outrosPsicotropicos" ? "" : "ion-hide"}>

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='6'>

                                        <IonRadioGroup value={selectedAutuado_Testemunha}
                                            onIonChange={e => setSelectedAutuado_Testemunha(e.detail.value)}>

                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonListHeader>
                                                        <IonLabel>
                                                            Recusa fazer o teste?
                                                        </IonLabel>
                                                    </IonListHeader>
                                                </IonCol>
                                                <IonCol size='6'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="fiscal" />
                                                        <IonLabel className="radioBox">Não</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='6'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="outro" />
                                                        <IonLabel className="radioBox">Sim</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>
                                </IonRow>

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='12'>

                                        <IonRadioGroup value={selectedAutuado_Testemunha}
                                            onIonChange={e => setSelectedAutuado_Testemunha(e.detail.value)}>

                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonListHeader>
                                                        <IonLabel>
                                                            Tipo de teste *
                                                        </IonLabel>
                                                    </IonListHeader>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="fiscal" />
                                                        <IonLabel className="radioBox">Aci</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="outro" />
                                                        <IonLabel className="radioBox">Análise sangue</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="outro" />
                                                        <IonLabel className="radioBox">Exame médico</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>

                                </IonRow>

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='12' style={{ marginTop: 16 }}>

                                        <IonRadioGroup value={selectedAutuado_Testemunha}
                                            onIonChange={e => setSelectedAutuado_Testemunha(e.detail.value)}>

                                            <IonRow>
                                                <IonCol size='3'>
                                                    <IonListHeader>
                                                        <IonLabel>
                                                            Anfetaminas *
                                                        </IonLabel>
                                                    </IonListHeader>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="fiscal" />
                                                        <IonLabel className="radioBox">Não</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="outro" />
                                                        <IonLabel className="radioBox">Sim</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>

                                </IonRow>

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='12'>

                                        <IonRadioGroup value={selectedAutuado_Testemunha}
                                            onIonChange={e => setSelectedAutuado_Testemunha(e.detail.value)}>

                                            <IonRow>
                                                <IonCol size='3'>
                                                    <IonListHeader>
                                                        <IonLabel>
                                                            Canabis *
                                                        </IonLabel>
                                                    </IonListHeader>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="fiscal" />
                                                        <IonLabel className="radioBox">Não</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="outro" />
                                                        <IonLabel className="radioBox">Sim</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>

                                            <IonRow>
                                                <IonCol size-sm='12' size-md='12' size-lg='12'>

                                                    <IonRadioGroup value={selectedAutuado_Testemunha}
                                                        onIonChange={e => setSelectedAutuado_Testemunha(e.detail.value)}>

                                                        <IonRow>
                                                            <IonCol size='3'>
                                                                <IonListHeader>
                                                                    <IonLabel>
                                                                        Cocaína *
                                                                    </IonLabel>
                                                                </IonListHeader>
                                                            </IonCol>
                                                            <IonCol size='3'>
                                                                <IonItem
                                                                    lines='none'
                                                                    className="infoAdicionais-domicilio-radio radio-item">
                                                                    <IonRadio value="fiscal" />
                                                                    <IonLabel className="radioBox">Não</IonLabel>
                                                                </IonItem>
                                                            </IonCol>
                                                            <IonCol size='3'>
                                                                <IonItem
                                                                    lines='none'
                                                                    className="infoAdicionais-domicilio-radio radio-item">
                                                                    <IonRadio value="outro" />
                                                                    <IonLabel className="radioBox">Sim</IonLabel>
                                                                </IonItem>
                                                            </IonCol>
                                                        </IonRow>

                                                        <IonRow>
                                                            <IonCol size-sm='12' size-md='12' size-lg='12'>

                                                                <IonRadioGroup value={selectedAutuado_Testemunha}
                                                                    onIonChange={e => setSelectedAutuado_Testemunha(e.detail.value)}>

                                                                    <IonRow>
                                                                        <IonCol size='3'>
                                                                            <IonListHeader>
                                                                                <IonLabel>
                                                                                    Metanfetaminas *
                                                                                </IonLabel>
                                                                            </IonListHeader>
                                                                        </IonCol>
                                                                        <IonCol size='3'>
                                                                            <IonItem
                                                                                lines='none'
                                                                                className="infoAdicionais-domicilio-radio radio-item">
                                                                                <IonRadio value="fiscal" />
                                                                                <IonLabel className="radioBox">Não</IonLabel>
                                                                            </IonItem>
                                                                        </IonCol>
                                                                        <IonCol size='3'>
                                                                            <IonItem
                                                                                lines='none'
                                                                                className="infoAdicionais-domicilio-radio radio-item">
                                                                                <IonRadio value="outro" />
                                                                                <IonLabel className="radioBox">Sim</IonLabel>
                                                                            </IonItem>
                                                                        </IonCol>
                                                                    </IonRow>

                                                                    <IonRow>
                                                                        <IonCol size-sm='12' size-md='12' size-lg='12'>

                                                                            <IonRadioGroup value={selectedAutuado_Testemunha}
                                                                                onIonChange={e => setSelectedAutuado_Testemunha(e.detail.value)}>

                                                                                <IonRow>
                                                                                    <IonCol size='3'>
                                                                                        <IonListHeader>
                                                                                            <IonLabel>
                                                                                                Ópio *
                                                                                            </IonLabel>
                                                                                        </IonListHeader>
                                                                                    </IonCol>
                                                                                    <IonCol size='3'>
                                                                                        <IonItem
                                                                                            lines='none'
                                                                                            className="infoAdicionais-domicilio-radio radio-item">
                                                                                            <IonRadio value="fiscal" />
                                                                                            <IonLabel className="radioBox">Não</IonLabel>
                                                                                        </IonItem>
                                                                                    </IonCol>
                                                                                    <IonCol size='3'>
                                                                                        <IonItem
                                                                                            lines='none'
                                                                                            className="infoAdicionais-domicilio-radio radio-item">
                                                                                            <IonRadio value="outro" />
                                                                                            <IonLabel className="radioBox">Sim</IonLabel>
                                                                                        </IonItem>
                                                                                    </IonCol>
                                                                                </IonRow>
                                                                            </IonRadioGroup>
                                                                        </IonCol>

                                                                    </IonRow>
                                                                </IonRadioGroup>
                                                            </IonCol>

                                                        </IonRow>
                                                    </IonRadioGroup>
                                                </IonCol>

                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>

                                </IonRow>
                            </IonGrid>
                            {/*Estupefacientes e/ou outros psictrópicos*/}
                        </IonCardContent>
                    </IonCard>
                    {/* END: Ficha de controlador  */}


                    {/* Elementos identificadores */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Elementos identificadores
                            </IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>

                            <IonGrid>
                                <div style={{ fontWeight: 'bold', fontSize: 18 }}>Local de Infração</div>
                                <CardListItem
                                    c1={{ titulo: 'Distrito', valor: 'null' }}
                                    c2={{ titulo: 'Concelho', valor: 'null' }}
                                    c3={{ titulo: 'Freguesia', valor: 'null' }}
                                />

                                <CardListItem
                                    c1={{ titulo: 'Localidade', valor: 'null' }}
                                    c2={{ titulo: 'Tipo Local', valor: 'null' }}
                                    c3={{ titulo: 'Zona / Bairro', valor: 'null' }}
                                />

                                <CardListItem
                                    c1={{ titulo: 'Tipo de Via', valor: 'null' }}
                                    c2={{ titulo: 'Arruamento / Via', valor: 'null' }}
                                    c3={{ titulo: 'N° Polícia / KM', valor: 'null' }}
                                />

                                <div style={{ fontWeight: 'bold', fontSize: 18, marginTop: 30 }}>Dados de identificação do examinado</div>
                                <CardListItem
                                    c1={{ titulo: 'Data de Nascimento', valor: 'null' }}
                                    c2={{ titulo: 'Sexo', valor: 'null' }}
                                />

                                <div style={{ fontWeight: 'bold', fontSize: 18, marginTop: 30 }}>Dados de identificação do Veículo</div>
                                <CardListItem
                                    c1={{ titulo: 'Tipo de Veículo', valor: 'null' }}
                                    c2={{ titulo: 'Matrícula', valor: 'null' }}
                                />
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Elementos identificadores */}

                    {/* Número de Documentos */}
                    <IonCard style={{ margin: 30 }}>
                        <IonCardContent>
                            <IonGrid>
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12'>
                                        <p style={{ color: 'red' }}>Apenas deverá preencher este número caso não tenha sido possível imprimir o documento e o tenha registado manualmente em pré-impresso(Não será gerado o respectivo expediente).</p>
                                    </IonCol>

                                </IonRow>
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='4'>

                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Número de Documento">Número de Documento</IonLabel>
                                            <IonInput
                                                value={numeroDocumento}
                                                onKeyUp={keyup_numeroDocumento}
                                            ></IonInput>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                            </IonGrid>
                        </IonCardContent>
                    </IonCard>
                    {/* Número de Documentos */}
                </IonContent>

            </IonPopover>
            {/*Popover: Ficha controlador*/}
        </IonCard>
    );
}

export default AcoesComplementares;
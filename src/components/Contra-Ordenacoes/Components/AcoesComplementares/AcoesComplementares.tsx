import { IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonListHeader, IonPopover, IonRadio, IonRadioGroup, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonTextarea, IonToolbar, useIonAlert, useIonLoading } from "@ionic/react";
import { open, trash, remove, bookOutline } from "ionicons/icons";
import React, { useContext } from "react";
import { useState } from "react";
import DataTable from 'react-data-table-component';
import { Contraordenacao } from "../../../../api/Contraordenacao";
import { FichaControleService } from "../../../../api/FichaControleService";
import { UserContext } from "../../../../Context/UserContext";
import { CarregarCombosApreensaoDocumento, IComboApreensaoDocumento, MotivosApreensao } from "../../../../model/documentoapreendido";
import { IID_DESCRICAO } from "../../../../model/extendable";
import CardListItem from "../../../CardListItem";
import DatePicker from "../../../Combos/DatePicker";
import InfraccoesAdicionais from "../InfraccoesAdicionais/InfraccoesAdicionais";
import './AcoesComplementares.scss';

interface IProps {
    setAccoesComplementaresParentData?: any
    currentDadosInfracaoData?: any,
    currentIntervenientesData?: any
    setFichaControleData?: any

}

const AcoesComplementares: React.FC<IProps> = (props) => {
    const userContext = useContext<any>(UserContext);

    const [openPopoverApreensaoDocumentosData, setOpenPopoverApreensaoDocumentosData] = useState(false);
    const [openPopoverApreensaoVeiculoData, setOpenPopoverApreensaoVeiculoData] = useState(false);
    const [openPopoverBloqueamento_RemocaoVeiculoData, setOpenPopoverBloqueamento_RemocaoVeiculoData] = useState(false);
    const [openPopoverSubstituicaoDocumentosData, setOpenPopoverSubstituicaoDocumentosData] = useState(false);
    const [openPopoverApresentacaoDocumentoData, setOpenPopoverApresentacaoDocumentoData] = useState(false);
    const [openPopoverFichaControladorData, setOpenPopoverFichaControladorData] = useState(false);
    const [isFichaControlePreenchida, setIsFichaControlePreenchida] = useState(false)
    /* Enumeração de tipo de documento */
    enum TipoDocumento {
        APREENSAO_DOCUMENTOS = 1,
        APREENSAO_VEICULO = 2,
        BLOQUEAMENTO_REMOCAO_VEICULO = 3,
        SUBSTITUICAO_DOCUMENTOS = 4,
        APRESENTACAO_DOCUMENTOS = 5,
        FICHA_CONTROLADOR = 6,
    }
    /* Enumeração de tipo de documento */

    const handleButtonClick_ABRIR = (tipoDocumento: any) => {

        switch (tipoDocumento) {

            case TipoDocumento.APREENSAO_DOCUMENTOS: {
                setOpenPopoverApreensaoDocumentosData(true);
                break;
            }

            case TipoDocumento.APREENSAO_VEICULO: {
                setOpenPopoverApreensaoVeiculoData(true);
                break;
            }

            case TipoDocumento.BLOQUEAMENTO_REMOCAO_VEICULO: {
                setOpenPopoverBloqueamento_RemocaoVeiculoData(true);
                break;
            }

            case TipoDocumento.SUBSTITUICAO_DOCUMENTOS: {
                setOpenPopoverSubstituicaoDocumentosData(true);
                break;
            }

            case TipoDocumento.APRESENTACAO_DOCUMENTOS: {
                setOpenPopoverApresentacaoDocumentoData(true);
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
    const [isSavedApreensaoDocumento, setIsSavedApreensaoDocumento] = useState(false);
    const [isSavedApreensaoVeiculo, setIsSavedApreensaoVeiculo] = useState(false);
    const [isSavedBloqueamento, setIsSavedBloqueamento] = useState(false);
    const [isSavedSubstituicao, setIsSubstituicao] = useState(false);
    const [isSavedApresentacaoDocumento, setIsSavedApresentacaoDocumento] = useState(false);

    const columnsTituloConducao = [

        {
            name: 'Motivo',
            selector: (row: { descricao: any; }) => row.descricao,
        },
        {
            name: 'Ações',
            cell: (row: { id?: any }) => (
                <>
                    <IonButton onClick={() => {

                        setDocumentosSubstituirTituloConducao(documentosSubstituirTituloConducao.filter(m => { return m.id !== row.id }))


                    }} size="small" color="danger">
                        EXCLUIR
                        <IonIcon slot="start" icon={trash} />
                    </IonButton>
                </>
            )
        },
    ];

    const dataTituloConducao: IID_DESCRICAO[] = []

    const handleButtonClick_EXCLUIR = (state: any) => {
        console.log('clicked (EXCLUIR)');
        console.log(state);
    };

    const data = [
        {
            id: 1,
            tipoDocumento: 'Apreensão Documentos',
            estado: isSavedApreensaoDocumento,
            abreTipoDocumento: TipoDocumento.APREENSAO_DOCUMENTOS,
            isVisibleBtnExcluir: isSavedApreensaoDocumento,
        },
        {
            id: 2,
            tipoDocumento: 'Apreensão Veículo',
            estado: isSavedApreensaoVeiculo,
            abreTipoDocumento: TipoDocumento.APREENSAO_VEICULO,
            isVisibleBtnExcluir: isSavedApreensaoVeiculo,
        },
        {
            id: 3,
            tipoDocumento: 'Bloqueamento/Remoção de Veículo',
            estado: isSavedBloqueamento,
            abreTipoDocumento: TipoDocumento.BLOQUEAMENTO_REMOCAO_VEICULO,
            isVisibleBtnExcluir: isSavedBloqueamento,
        },
        {
            id: 4,
            tipoDocumento: 'Substituição de Documentos',
            estado: isSavedSubstituicao,
            abreTipoDocumento: TipoDocumento.SUBSTITUICAO_DOCUMENTOS,
            isVisibleBtnExcluir: isSavedSubstituicao,
        },
        {
            id: 5,
            tipoDocumento: 'Apresentação de documentos',
            estado: isSavedApresentacaoDocumento,
            abreTipoDocumento: TipoDocumento.APRESENTACAO_DOCUMENTOS,
            isVisibleBtnExcluir: isSavedApresentacaoDocumento,
        },
        {
            id: 6,
            tipoDocumento: 'Ficha controlador',
            estado: isFichaControlePreenchida,
            abreTipoDocumento: TipoDocumento.FICHA_CONTROLADOR,
            isVisibleBtnExcluir: isFichaControlePreenchida,
        },
    ]


    const columns = [
        {
            name: 'Tipo de Documento',
            selector: (row: { tipoDocumento: any; }) => row.tipoDocumento,
        },
        {
            name: 'Estado',
            cell: (row: { estado: any }) => (
                row.estado ? <> <IonBadge color="success">Emitido</IonBadge></> : ""
            )
        },
        {
            name: 'Ações',
            cell: (row: { abreTipoDocumento: any, isVisibleBtnExcluir: boolean }) => (
                <>
                    <IonButton onClick={() => handleButtonClick_ABRIR(row.abreTipoDocumento)} size="small" color="primary" >
                        ABRIR
                        <IonIcon slot="start" icon={open} />
                    </IonButton>

                    <IonButton onClick={() => handleButtonClick_EXCLUIR(row.abreTipoDocumento)} size="small" color="danger" className={row.isVisibleBtnExcluir ? "" : "ion-hide"}>
                        EXCLUIR
                        <IonIcon slot="start" icon={trash} />
                    </IonButton>
                </>
            )
        },
    ];



    //-------------------------[Motivos Apreensao]

    const columnsMotivosApreensao = [
        {
            name: 'Motivo',
            selector: (row: { descricao: string }) => row.descricao
        },

        {
            name: 'Ações',
            cell: (row: { id: number }) => (
                <>
                    <IonButton onClick={() => {
                        setMotivosApreensao(motivosApreensao.filter(m => { return m.id !== row.id }))
                        setTamanhoMotivoApreensao(tamanhoMotivoApreensao - 1)

                    }} size="small" color="danger" >
                        EXCLUIR
                        <IonIcon slot="start" icon={trash} />
                    </IonButton>
                </>
            )
        },
    ];

    //-------------------------[Motivos Apreensao Veiculos]
    const columnsMotivosApreensaoVeiculo = [
        {
            name: 'Motivo',
            selector: (row: { descricao: string }) => row.descricao
        },

        {
            name: 'Ações',
            cell: (row: { id?: number }) => (
                <>
                    <IonButton onClick={() => {
                        setMotivosApreensaoVeiculo(motivosApreensaoVeiculo.filter(m => { return m.id !== row.id }))

                    }} size="small" color="danger" >
                        EXCLUIR
                        <IonIcon slot="start" icon={trash} />
                    </IonButton>
                </>
            )
        },
    ];



    let dataMotivosApreensao: MotivosApreensao[] = []
    let dataMotivosApreensaoVeiculo: IID_DESCRICAO[] = []
    //-------------------------[Dados Apreensao Documentos]

    const columnsDadosApreensaoDocumentos = [
        {
            name: 'Documento',
            selector: (row: { documento: any }) => row.documento?.descricao,
        },
        {
            name: 'Número',
            selector: (row: { numero: any; }) => row.numero,
        },
        {
            name: 'Ações',
            cell: (row: { id: any }) => (
                <>

                    <IonButton onClick={() => {

                        setDocumentosApreendidos(documentosApreendidos.filter(m => { return m.id !== row.id }))


                    }} size="small" color="danger" >
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
    const dataDadosApreensaoDocumentos: IComboApreensaoDocumento[] = []

    const [combos, setCombos] = useState<MotivosApreensao[]>();
    const [motivosApreensao, setMotivosApreensao] = useState(dataMotivosApreensao);
    const [dadosApreensaoDocumento, setDadosApreensaoDocumento] = useState(dataMotivosApreensao);
    const [documentosApreendidos, setDocumentosApreendidos] = useState(dataDadosApreensaoDocumentos);
    const [documento, setDocumento] = useState<any>();
    const [motivoApreensao, setMotivoApreensao] = useState<any>();
    const [idMotivoApreensao, setIdMotivoApreensao] = useState(0);
    const [tamanhoMotivoApreensao, setTamanhoMotivoApreensao] = useState(0);
    const [numDocumento, setNumDocumento] = useState('');
    const [localApresentacao, setLocalApresentacao] = useState('');
    const [camarasMunicipais, setCamarasMunicipais] = useState<IID_DESCRICAO[]>();
    const getCombos = async (): Promise<CarregarCombosApreensaoDocumento> => await new Contraordenacao().carregarCombosMotivoApreensao()
    const carregarCombosLocalizacao = async (): Promise<any> => await new Contraordenacao().carregarCombosLocalizacao()
    const carregarCombosApreensaoVeiculos = async (): Promise<any> => await new Contraordenacao().carregarCombosApreensaoVeiculos()
    const carregarCombosAutoBloqueamentoRemocaoVeiculos = async (): Promise<any> => await new Contraordenacao().carregarCombosAutoBloqueamentoRemocaoVeiculos()
    const carregarCombosPagamento = async (): Promise<any> => await new Contraordenacao().carregarCombosPagamento()
    const carregarCombosSubstituicaoDocumentos = async (): Promise<any> => await new Contraordenacao().carregarCombosSubstituicaoDocumentos()

    interface CombosAlcoolResponse {
        marcaModelo: IID_DESCRICAO[],
        serie: IID_DESCRICAO[],
        tipoVerificacao: IID_DESCRICAO[]

    }
    const getCombosAlcool = async (): Promise<CombosAlcoolResponse> => await new Contraordenacao().carregarCombosAlcool()


    const onClick_addAMotivoApreensao = () => {

        const motivo = JSON.parse(motivoApreensao)

        if (motivosApreensao?.find(m => motivo.id === m.id)) {
            presentAlert({
                header: 'Error!',
                message: 'Motivo já adicionado!\n',
                buttons: [
                    { text: 'Fechar' },
                ]
            })
        } else {

            setMotivosApreensao([...motivosApreensao, motivo])
            setTamanhoMotivoApreensao(+motivosApreensao?.length + 1)

        }



    }

    const onClick_addDadosDocumentoApreensao = () => {
        const idDescricaoDocumento: MotivosApreensao = JSON.parse(documento)
        const documentoApreendido =
        {
            documento: {
                descricao: idDescricaoDocumento.descricao
            }, numero: numDocumento,
            id: idDescricaoDocumento.id
        }
        if (documentosApreendidos?.find(doc => doc.id === documentoApreendido.id || doc.numero === numDocumento)) {
            presentAlert({
                header: 'Error!',
                message: 'Documento e/ou mesmo número já adicionado!\n',
                buttons: [
                    { text: 'Fechar' },
                ]
            })
        } else {
            setDocumentosApreendidos([...documentosApreendidos, documentoApreendido])
            setNumDocumento("")
        }

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
    const [camaraMunicipal, setCamaraMunicipal] = useState<any>();;

    const [podeLevantarTituloConducao, setPodeLevantarTituloConducao] = useState(false);
    const [tituloConducao, setTituloConducao] = useState('');

    const keyup_tituloConducao = (e: any) => {
        setTituloConducao(e.target.value);
    }

    interface CamaraMunicipal {
        id: any,
        descricao: any
    }

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

    const [userTerminal, setUserTerminal] = useState('');
    const [tipoDeFichaControlador, setTipoDeFichaControlador] = useState('Álcool');
    const [circunstanciaExameAlcool, setCircunstanciaExameAlcool] = useState();
    const [circunstanciaExameEstupefacientes, setCircunstanciaExameEstupefacientes] = useState();
    const [recusaTesteEstupifaciente, setRecusaTesteEstupifaciente] = useState();
    const [recusaTesteAlcool, setRecusaTesteAlcool] = useState();
    const [tipoTesteAlcool, setTipoTesteAlcool] = useState();
    const [anfetaminas, setAnfetaminas] = useState();
    const [canabis, setCanabis] = useState();
    const [cocaina, setCocaina] = useState();
    const [metanfetaminas, setMetanfetaminas] = useState();
    const [opio, setOpio] = useState();
    const [tipoTesteEstupifaciente, setTipoTesteEstupifaciente] = useState();
    const [alcoolimetroMarcas, setAlcoolimetroMarcas] = useState<IID_DESCRICAO[]>();
    const [alcoolimetroSeries, setAlcoolimetroSeries] = useState<IID_DESCRICAO[]>();
    const [alcoolimetroTipoVerificacoes, setAlcoolimetroVerificacoes] = useState<IID_DESCRICAO[]>();

    const [alcoolimetroMarca, setAlcoolimetroMarca] = useState<IID_DESCRICAO>();
    const [alcoolimetroSerie, setAlcoolimetroSerie] = useState<IID_DESCRICAO>();
    const [alcoolimetroTipoVerificacao, setAlcoolimetroVerificacao] = useState<IID_DESCRICAO>();

    const [alcoolimetroNumero, setAlcoolimetroNumero] = useState();
    const [alcoolimetroDataHoraInfracao, setAlcoolimetroDataHoraInfracao] = useState();
    const [alcoolimetroNumeroTalao, setAlcoolimetroNumeroTalao] = useState();
    const [alcoolimetroValorRegistado, setAlcoolimetroValorRegistado] = useState();
    const [alcoolimetroValorApurado, setAlcoolimetroValorApurado] = useState();

    const [fielDepositario, setFielDepositario] = useState("");
    const [nomefielDepositario, setNomeFielDepositario] = useState("");
    const [moradafielDepositario, setMoradaFielDepositario] = useState("");
    const [documentoDepositario, setDocumentoDepositario] = useState("");
    const [kmsApreensaoVeiculo, setKmsApreensaoVeiculo] = useState("");
    const [localDeposito, setLocalDeposito] = useState("");
    const [numeroDocumentoDepositario, setNumeroDocumentoDepositario] = useState("");
    const [numeroApreensaoVeiculo, setNumeroApreensaoVeiculo] = useState("");
    const [motivosApreensaoVeiculo, setMotivosApreensaoVeiculo] = useState(dataMotivosApreensaoVeiculo);
    const [motivoApreensaoVeiculo, setMotivoApreensaoVeiculo] = useState<any>();
    const [motivosApreensaoVeiculoCombo, setMotivosApreensaoVeiculoCombo] = useState<IID_DESCRICAO[]>();
    const [documentoAccaoAssoc, setDocumentoAccaoAssoc] = useState("");
    const [numeroDocumentoAccaoAssoc, setNumeroDocumentoAccaoAssoc] = useState("");
    const [isDocumentoVeiculoVirtudeDe, setIsDocumentoVeiculoVirtudeDe] = useState(false);
    const [motivoDocumentoVeiculo, setMotivoDocumentoVeiculo] = useState("");
    const [localLevantarIMTT, setLocalLevantarIMTT] = useState<any>();
    const [locaisLevantarIMTT, setLocaisLevantarIMTT] = useState<IID_DESCRICAO[]>();
    const [isAvisoApreensaoDocumentoPassado, setIsAvisoApreensaoDocumentoPassado] = useState(false);
    const [isApreensaoVeiculoProduzEfeito, setIsApreensaoVeiculoProduzEfeito] = useState(false);
    const [dataProduzEfeitoApreensao, setDataProduzEfeitoApreensao] = useState("");
    const [isApreendidoDocumentos, setIsApreendidoDocumentos] = useState(false);

    // start auto bloqueamento veiculo 


    const [houveBloquamento, setHouveBloqueamento] = useState(false);
    const [numeroBloqueamentoRemocaoVeiculo, setNumeroBloqueamentoRemocaoVeiculo] = useState('');
    const [legislacoesAssociadas, setLegislacoesAssociadas] = useState<IID_DESCRICAO[]>();
    const [legislacoesAssociadasRemocao, setLegislacoesAssociadasRemocao] = useState<IID_DESCRICAO[]>();
    const [legislacaoAssociadaBloqueamento, setLegislacaoAssociadaBloqueamento] = useState<any>();
    const [houveRemocao, setHouveRemocao] = useState(false);
    const [dataRemocao, setDataRemocao] = useState('');
    const [legislacaoAssociadaRemocao, setLegislacaoAssociadaRemocao] = useState<any>();
    const [localDestinoRemocao, setLocalDestinoRemocao] = useState('');
    const [motivoNaoRemocao, setMotivoNaoRemocao] = useState('');
    const [meiosPagamento, setMeiosPagamento] = useState<IID_DESCRICAO[]>();
    const [meioPagamento, setMeioPagamento] = useState<any>();
    const [numeroCheque, setNumeroCheque] = useState('');
    const [bancosEmissores, setBancosEmissores] = useState<IID_DESCRICAO[]>();
    const [bancoEmissor, setBancoEmissor] = useState<any>();
    const [valorBloqueamento, setValorBloqueamento] = useState(0);
    const [valorRemocao, setValorRemocao] = useState(0);
    const [valorTotalBloqueamentoRemocao, setValorTotalBloqueamentoRemocao] = useState(0);
    const [notaCobrancaManual, setNotaCobrancaManual] = useState('');

    // end auto bloqueamento veiculo 

    // apresentacao documento
    const [numeroApresentacaoDocumento, setNumeroApresentacaoDocumento] = useState('');
    const [isTituloConducao, setIsTituloConducao] = useState<boolean>();
    const [isCertificadoMatricula, setIsCertificadoMatricula] = useState<boolean>();
    const [isDocumentoInspecaoVeiculo, setIsDocumentoInspecaoVeiculo] = useState<boolean>();
    const [isCertificadoSeguroValidoVeiculo, setIsCertificadoSeguroValidoVeiculo] = useState<boolean>();
    const [isBilheteIdentidade, setIsBilheteIdentidade] = useState<boolean>();
    const [isCartaoCidadao, setIsCartaoCidadao] = useState<boolean>();
    const [isPassaporte, setIsPassaporte] = useState<boolean>();
    const [isTituloResidencia, setIsTituloResidencia] = useState<boolean>();
    const [isOutro, setIsOutro] = useState<boolean>();
    const [isInserirEmailEnvioDocumento, setIsInserirEmailEnvioDocumento] = useState<boolean>();
    const [isInserirNumeroProcessoReferenteObrigatoriedadeEntregaDocumento, setIsInserirNumeroProcessoReferenteObrigatoriedadeEntregaDocumento] = useState<boolean>();

    const [localApresentacaoEntrega, setLocalApresentacaoEntrega] = useState('');

    const [nomeProprietario, setNomeProprietario] = useState('');
    const [moradaProprietario, setMoradaProprietario] = useState('');
    const [documentoProprietario, setDocumentoProprietario] = useState<String>();
    const [numeroDocumentoProprietario, setNumeroDocumentoProprietario] = useState('');
    const [numeroDocumentoApresentacaoDocumento, setNumeroDocumentoApresentacaoDocumento] = useState('');


    // apresentacao documento 


    //Substituicao de Documentos
    const [substituirCertificadoMatricula, setSubstituirCertificadoMatricula] = useState(false);
    const [numeroSubstituicaoDocumento, setNumeroSubstituicaoDocumento] = useState('');
    const [tipoDocumentoSubstituicao, setTipoDocumentoSubstituicao] = useState<any>();
    const [tiposDocumentoSubstituicao, setTiposDocumentoSubstituicao] = useState<IID_DESCRICAO[]>();
    const [numeroTipoDocumentoSubstituicao, setNumeroTipoDocumentoSubstituicao] = useState('');
    const [numeroChassi, setNumeroChassi] = useState('');
    const [combustivel, setCombustivel] = useState<any>();
    const [combustiveis, setCombustiveis] = useState<IID_DESCRICAO[]>();
    const [pesoBruto, setPesoBruto] = useState('');
    const [taxa, setTaxa] = useState('');

    const [lotacao, setLotacao] = useState('');
    const [cilindrada, setCilidranda] = useState('');
    const [pneumaticoFrente, setPneumaticoFrente] = useState('');
    const [pneumaticoRetaguarda, setPneumaticoRetaguarda] = useState('');
    const [ateDia, setAteDia] = useState(false);
    const [dataGuia, setDataGuia] = useState('');
    const [ateLocal, setLocal] = useState(false);
    const [validadeLocal, setValidadeLocal] = useState('');


    const [substituirCartaConducao, setSubstituirCartaConducao] = useState(false);
    const [documentosCartaConducao, setDocumentosCartaConducao] = useState<IID_DESCRICAO[]>();
    const [documentoCartaConducao, setDocumentoCartaConducao] = useState<any>();
    const [grupo2, setGrupo2] = useState(false);
    const [dataEmissao, setDataEmissao] = useState('');
    const [documentosCombo, setDocumentosCombo] = useState<IID_DESCRICAO[]>();
    const [documentoCombo, setDocumentoCombo] = useState<any>();
    const [documentosSubstituirTituloConducao, setDocumentosSubstituirTituloConducao] = useState(dataTituloConducao);
    const [dataValidadeGuia, setDataValidadeGuia] = useState('');
    const [ateDiaGuia, setAteDiaGuia] = useState(false);

    const [localValidadeGuia, setLocalValidadeGuia] = useState('');
    const [observacaoSubstituicaoTituloConducao, setObservacaoSubstituicaoTituloConducao] = useState('');
    const [ateDiaLocal, setAteDiaLocal] = useState(false);

    //Substituicao de Documentos
    const [presentAlert, dismissAlert] = useIonAlert();
    const [presentOnLoanding, dismissOnLoanding] = useIonLoading();


    const onChange_tipoControlador = (e: any) => {
        setTipoDeFichaControlador(e.detail.value)
    }

    const onkeyup_alcoolimetroNumero = (e: any) => {
        setAlcoolimetroNumero(e.target.value)
    }

    const onkeyup_alcoolimetroNumeroTalao = (e: any) => {
        setAlcoolimetroNumeroTalao(e.target.value)
    }
    const onkeyup_alcoolimetroValorRegistado = (e: any) => {
        setAlcoolimetroValorRegistado(e.target.value)
    }
    const onkeyup_alcoolimetroValorApurado = (e: any) => {
        setAlcoolimetroValorApurado(e.target.value)
    }


    React.useEffect(() => {
        const data = {
            motivosApreensao: motivosApreensao,
            tamanhoMotivosApreensao: tamanhoMotivoApreensao,
            documentosApreendidos: documentosApreendidos,
            numDocumento: numDocumento,
            dataHora: dataHora,
            localApresentacao: localApresentacao,
            localLevantarDocumentos: levantarDocsDiaUtilLocal,
            localRegularizacao: regularSituacaoLocal,
            camaraMunicipal: camaraMunicipal,
            tituloConducao: tituloConducao,
            diaPagamento: diaPagamento,
            sancaoAplicada: sancaoAplicada,
            aplicarSansao: aplicarSansao,
            numeroDocumento: numeroDocumento,

            // apreensao de veiculos
            motivosApreensaoVeiculo: motivosApreensaoVeiculo,
            tipoFielDepositario: fielDepositario,
            numeroApreensaoVeiculo: numeroApreensaoVeiculo,
            nomeFielDepositario: nomefielDepositario,
            moradaFielDepositario: moradafielDepositario,
            documentoFielDepositario: documentoDepositario,
            numeroFielDepositario: numeroDocumentoDepositario,
            dadosApreensaoKm: kmsApreensaoVeiculo,
            dadosApreensaoLocalDeposito: localDeposito,
            documentoVeiculoNaoFoiApreendidoEmVirtude: motivoDocumentoVeiculo,
            documentoApreensao: documentoAccaoAssoc,
            numeroDocumentoApreensao: numeroDocumentoAccaoAssoc,
            arguidoPoderaLevantarDocumentoNoServicoIMTT: localLevantarIMTT,
            foiPassadoAvisoApreensaoDocumentos: isAvisoApreensaoDocumentoPassado,
            dataEfeitoApreensaoVeiculo: dataProduzEfeitoApreensao,
            // apreensao de veiculos

            // auto BloqueamentoRemocao
            houveBloquamento: houveBloquamento,
            houveRemocao: houveRemocao,
            numeroBloqueamentoRemocaoVeiculo: numeroBloqueamentoRemocaoVeiculo,
            legislacaoAssociadaBloqueamento: legislacaoAssociadaBloqueamento,
            legislacaoAssociadaRemocao:legislacaoAssociadaRemocao,
            dataRemocao: dataRemocao,
            localDestinoRemocao: localDestinoRemocao,
            motivoNaoRemocao: motivoNaoRemocao,
            meioPagamento: meioPagamento,
            numeroCheque: numeroCheque,
            bancoEmissor: bancoEmissor,
            valorBloqueamento: valorBloqueamento,
            valorRemocao: valorRemocao,
            valorTotalBloqueamentoRemocao: valorTotalBloqueamentoRemocao,
            notaCobrancaManual: notaCobrancaManual,

            // auto BloqueamentoRemocao


            // apresentacao documento
            numeroApresentacaoDocumento: numeroApresentacaoDocumento,
            isTituloConducao: isTituloConducao,
            isCertificadoMatricula: isCertificadoMatricula,
            isDocumentoInspecaoVeiculo: isDocumentoInspecaoVeiculo,
            isCertificadoSeguroValidoVeiculo: isCertificadoSeguroValidoVeiculo,
            isBilheteIdentidade: isBilheteIdentidade,
            isCartaoCidadao: isCartaoCidadao,
            isPassaporte: isPassaporte,
            isTituloResidencia: isTituloResidencia,
            isOutro: isOutro,
            isInserirEmailEnvioDocumento: isInserirEmailEnvioDocumento,
            isInserirNumeroProcessoReferenteObrigatoriedadeEntregaDocumento: isInserirNumeroProcessoReferenteObrigatoriedadeEntregaDocumento,
            localApresentacaoEntrega: localApresentacaoEntrega,
            nomeProprietario: nomeProprietario,
            moradaProprietario:moradaProprietario,
            documentoProprietario: documentoProprietario,
            numeroDocumentoProprietario: numeroDocumentoProprietario,
            numeroDocumentoApresentacaoDocumento: numeroDocumentoApresentacaoDocumento,

            // apresentacao documento

            // substituicao de documentos
            substituirCertificadoMatricula:substituirCertificadoMatricula,
            numeroSubstituicaoDocumento:numeroSubstituicaoDocumento,
            tipoDocumentoSubstituicao:tipoDocumentoSubstituicao,
            numeroTipoDocumentoSubstituicao:numeroTipoDocumentoSubstituicao,
            numeroChassi:numeroChassi,
            combustivel:combustivel,
            pesoBruto:pesoBruto,
            taxa:taxa,
            lotacao:lotacao,
            cilindrada:cilindrada,
            pneumaticoFrente:pneumaticoFrente,
            pneumaticoRetaguarda:pneumaticoRetaguarda,
            ateDia:ateDia,
            dataGuia:dataGuia,
            ateLocal:ateLocal,
            validadeLocal:validadeLocal,
            substituirCartaConducao:substituirCartaConducao,
            documentoCartaConducao:documentoCartaConducao,
            grupo2:grupo2,
            dataEmissao:dataEmissao,
            documentoCombo:documentoCombo,
            documentosSubstituirTituloConducao:documentosSubstituirTituloConducao,
            dataValidadeGuia:dataValidadeGuia,
            ateDiaGuia:ateDiaGuia,
            localValidadeGuia:localValidadeGuia,
            observacaoSubstituicaoTituloConducao:observacaoSubstituicaoTituloConducao,
            ateDiaLocal:ateDiaLocal,
            // substituicao de documentos

            isFichaControlePreenchida: isFichaControlePreenchida,
            tipoDeFichaControlador: tipoDeFichaControlador,
            circunstanciaExameAlcool: circunstanciaExameAlcool,
            circunstanciaExameEstupefacientes: circunstanciaExameEstupefacientes,
            recusaTesteEstupifaciente: recusaTesteEstupifaciente,
            recusaTesteAlcool: recusaTesteAlcool,
            tipoTesteAlcool: tipoTesteAlcool,
            anfetaminas: anfetaminas,
            canabis: canabis,
            metanfetaminas: metanfetaminas,
            opio: opio,
            tipoTesteEstupifaciente: tipoTesteEstupifaciente,
            alcoolimetroMarca: alcoolimetroMarca,
            alcoolimetroSerie: alcoolimetroSerie,
            alcoolimetroTipoVerificacao: alcoolimetroTipoVerificacao,
            alcoolimetroDataHoraInfracao: alcoolimetroDataHoraInfracao,
            alcoolimetroNumeroTalao: alcoolimetroNumeroTalao,
            alcoolimetroValorRegistado: alcoolimetroValorRegistado,
            alcoolimetroValorApurado: alcoolimetroValorApurado
        }

        props.setAccoesComplementaresParentData(data);
    }, [moradaProprietario,numeroApresentacaoDocumento, isTituloConducao, isCertificadoMatricula, isDocumentoInspecaoVeiculo, isCertificadoSeguroValidoVeiculo, isBilheteIdentidade, isCartaoCidadao, isPassaporte, isTituloResidencia, isOutro, isInserirEmailEnvioDocumento, isInserirNumeroProcessoReferenteObrigatoriedadeEntregaDocumento, localApresentacaoEntrega, nomeProprietario, moradaProprietario, documentoProprietario, numeroDocumentoProprietario, numeroDocumentoApresentacaoDocumento, notaCobrancaManual, valorTotalBloqueamentoRemocao, valorRemocao, valorBloqueamento, bancoEmissor, numeroCheque, meioPagamento, motivoNaoRemocao, localDestinoRemocao, legislacaoAssociadaRemocao, dataRemocao, houveRemocao, legislacaoAssociadaBloqueamento, houveBloquamento, numeroBloqueamentoRemocaoVeiculo, motivosApreensao, tamanhoMotivoApreensao, documentosApreendidos, numDocumento, dataHora, localApresentacao, levantarDocsDiaUtilLocal, regularSituacaoLocal, camaraMunicipal, tituloConducao, diaPagamento, sancaoAplicada, numeroDocumento, isFichaControlePreenchida, tipoDeFichaControlador, circunstanciaExameAlcool, circunstanciaExameEstupefacientes, recusaTesteEstupifaciente, recusaTesteAlcool, tipoTesteAlcool, anfetaminas, canabis, cocaina, metanfetaminas, opio, tipoTesteEstupifaciente, alcoolimetroMarca, alcoolimetroSerie, alcoolimetroTipoVerificacao, alcoolimetroNumero, alcoolimetroDataHoraInfracao, alcoolimetroNumeroTalao, alcoolimetroValorRegistado, alcoolimetroValorApurado,numeroChassi,combustivel,pesoBruto,taxa,lotacao,cilindrada,pneumaticoFrente,pneumaticoRetaguarda,ateDia,dataGuia,ateLocal,validadeLocal,substituirCartaConducao,documentoCartaConducao,grupo2,dataEmissao,documentoCombo,documentosSubstituirTituloConducao,dataValidadeGuia,ateDiaGuia,localValidadeGuia,observacaoSubstituicaoTituloConducao,ateDiaLocal,substituirCertificadoMatricula,numeroSubstituicaoDocumento,tipoDocumentoSubstituicao,numeroTipoDocumentoSubstituicao])

    // CarregarCombosApreensaoDocumento
    React.useEffect(() => {
        getCombos().then((combos) => {
            setCombos(combos?.motivosApreensao)
            setDadosApreensaoDocumento(combos?.documentosDadosApreensao)

        }).catch((error) => {
            console.error("Load emissao combos: \n", error);
        })
        getCombosAlcool().then(combosAlcool => {
            setAlcoolimetroMarcas(combosAlcool.marcaModelo)
            setAlcoolimetroSeries(combosAlcool.serie)
            setAlcoolimetroVerificacoes(combosAlcool.tipoVerificacao)
        }).catch(err => {
            console.error("Load alcool combos: \n", err);
        })

        carregarCombosLocalizacao().then((response_local) => {
            const _local = response_local
            setCamarasMunicipais(_local?.distritos)

        }).catch((error) => {
            console.error("Load localizacao combos: \n", error);
        })
        carregarCombosApreensaoVeiculos().then((apreensaoVeiculos) => {
            console.log(apreensaoVeiculos)
            setMotivosApreensaoVeiculoCombo(apreensaoVeiculos?.motivosApreensao)
            setLocaisLevantarIMTT(apreensaoVeiculos?.unidades)
        }).catch((error) => {
            console.error("Load apreensaoVeiculos combos: \n", error);
        })
        carregarCombosAutoBloqueamentoRemocaoVeiculos().then((autobloqueioVeiculos) => {
            setLegislacoesAssociadas(autobloqueioVeiculos?.legislacoesAssociadas)
            setLegislacoesAssociadasRemocao(autobloqueioVeiculos?.legislacoesAssociadasRemocao)

        }).catch((error) => {
            console.error("Load auto bloqueamento combos: \n", error);
        })

        carregarCombosPagamento().then((pagamentos) => {
            setBancosEmissores(pagamentos?.bancosEmissores)
            setMeiosPagamento(pagamentos?.meiosPagamento)

        }).catch((error) => {
            console.error("Load auto bloqueamento combos: \n", error);
        })
        carregarCombosSubstituicaoDocumentos().then((substituicao_res) => {
            setCombustiveis(substituicao_res?.combustiveis)
            setTiposDocumentoSubstituicao(substituicao_res?.tiposDocumento)
            // setCategoriasSubstituicaoDocumento(substituicao_res?.categorias)
        }).catch((error) => {
            console.error("Load substituicaoDocumento combos: \n", error);
        })



    }, []);

    const on_addFichaControdor = () => {

        presentOnLoanding({
            message: 'A guardar...'
        });
        new FichaControleService().gravarFichaControle(
            {
                arg0: 0,
                arg1:
                    [{
                        anfetaminas: anfetaminas,
                        canabis: canabis,
                        circunstanciaAlcool: circunstanciaExameAlcool,
                        circunstanciaEstupefacientes: circunstanciaExameEstupefacientes,
                        cocaina: cocaina,
                        concelho: props.currentDadosInfracaoData?.localInfracaoData?.concelho?.descricao,
                        data: dataHora,
                        dataAtualizacao: dataUltimaAtualizacao,
                        distrito: props.currentDadosInfracaoData?.localInfracaoData?.distrito?.descricao,
                        idUtilizador: userContext.user.nomeUsuario,
                        idade: "",
                        matricula: props.currentIntervenientesData?.veiculo?.matricula,
                        metanfetaminas: metanfetaminas,
                        numDocumento: numeroDocumento,
                        opio: opio,
                        qualidade: "",
                        recusaAlcool: recusaTesteAlcool,
                        recusaEstupefacientes: recusaTesteEstupifaciente,
                        sexo: "",
                        taxaAlcool: alcoolimetroValorRegistado,
                        taxaAlcoolContra: alcoolimetroValorApurado,
                        tipoLocal: props.currentDadosInfracaoData?.localInfracaoData?.tipo,
                        tipoVia: props.currentDadosInfracaoData?.localInfracaoData?.arruamento,
                        via: props.currentDadosInfracaoData?.localInfracaoData?.arruamento
                    }]
            }).then(response_ficha => {
                dismissOnLoanding();
                presentAlert({
                    header: 'Resultado Ficha controlador \n' + response_ficha.resultado,
                    buttons: [
                        { text: 'Fechar' },
                    ]
                })
                setIsFichaControlePreenchida(true)

            }).catch(err_ficha => {
                presentAlert({
                    header: 'Error!',
                    message: 'Operação sem sucesso!\n' + err_ficha.message,
                    buttons: [
                        { text: 'Fechar' },
                    ]
                })
            }).finally(() => {
                dismissOnLoanding();
            })
    }

    const onClick_SaveApreensaoDocumentos = () => {
        setIsSavedApreensaoDocumento(true)
        console.log(isSavedApreensaoDocumento)
        setOpenPopoverApreensaoDocumentosData(false);
    }


    // start Apreensao Veiculo functions

    const onClick_saveApreensaoVeiculo = () => {
        setIsSavedApreensaoVeiculo(true)
        setOpenPopoverApreensaoVeiculoData(false)
    }
    const onClick_addMotivoApreensaoVeiculo = () => {
        if (motivosApreensaoVeiculo?.find(m => motivoApreensaoVeiculo.id === m.id)) {
            presentAlert({
                header: 'Error!',
                message: 'Motivo já adicionado!\n',
                buttons: [
                    { text: 'Fechar' },
                ]
            })
        } else {

            setMotivosApreensaoVeiculo([...motivosApreensaoVeiculo, motivoApreensaoVeiculo])

        }



    }
    const onKeyup_setNumeroApreensaoVeiculo = (e: any) => {
        setNumeroApreensaoVeiculo(e.target.value)
    }

    const onKeyup_setNomeFielDepositario = (e: any) => {
        setNomeFielDepositario(e.target.value)
    }
    const onKeyup_setMoradaFielDepositario = (e: any) => {
        setMoradaFielDepositario(e.target.value)
    }
    const onChange_documentoDepositario = (e: any) => {
        setDocumentoDepositario(e.detail.value)
    }

    const onKeyup_numeroDocumentoDepositario = (e: any) => {
        setNumeroDocumentoDepositario(e.target.value)
    }

    const onKeyup_kmsApreensaoVeiculo = (e: any) => {
        setKmsApreensaoVeiculo(e.target.value)
    }
    const onKeyup_localDeposito = (e: any) => {
        setLocalDeposito(e.target.value)
    }


    const keyup_motivoDocumentoVeiculo = (e: any) => {
        setMotivoDocumentoVeiculo(e.target.value)
    }
    const onKeyup_numeroDocumentoAccaoAssoc = (e: any) => {
        setNumeroDocumentoAccaoAssoc(e.target.value)
    }



    // end Apreensao Veiculo states and functions


    // start auto bloqueamento 


    const onKeyup_numeroBloqueamentoRemocaoViatura = (e: any) => {
        setNumeroBloqueamentoRemocaoVeiculo(e.target.value)
    }

    const onKeyup_localDestinoRemocao = (e: any) => {
        setLocalDestinoRemocao(e.target.value)
    }
    const onkeyup_motivoNaoRemocao = (e: any) => {
        setMotivoNaoRemocao(e.target.value)
    }

    const onKeyup_numeroCheque = (e: any) => {
        setNumeroCheque(e.target.value)
    }

    const onkeyup_valorBloqueamento = (e: any) => {
        setValorBloqueamento(e.target.value)
        setValorTotalBloqueamentoRemocao(+valorRemocao + +valorBloqueamento)

    }

    const onkeyup_valorRemocao = (e: any) => {
        setValorRemocao(e.target.value)


        setValorTotalBloqueamentoRemocao(+valorRemocao + +valorBloqueamento)

    }

    const onkeyup_notaCobrancaManual = (e: any) => {
        setNotaCobrancaManual(e.target.value)
    }

    // end auto bloqueamento 

    //start Apresentacao do documento

    const onkeyup_numeroApresentacaoDocumento = (e: any) => {
        setNumeroApresentacaoDocumento(e.target.value)

    }
    const onkeyup_nomeProprietario = (e: any) => {
        setNomeProprietario(e.target.value)

    }
    const onkeyup_moradaProprietario = (e: any) => {
        setMoradaProprietario(e.target.value)

    }
    const onkeyup_numeroDocumentoProprietario = (e: any) => {
        setNumeroDocumentoProprietario(e.target.value)

    }
    const onkeyup_localApresentacaoEntrega = (e: any) => {
        setLocalApresentacaoEntrega(e.target.value)

    }

    const onkeyup_numeroDocumentoApresentacaoDocumento = (e: any) => {
        setNumeroDocumentoApresentacaoDocumento(e.target.value)

    }
    // end Apresentacao do documento
    // start substituicao de documento 

    const onkeyup_numeroSubstituicaoDocumento = (e: any) => {
        setNumeroSubstituicaoDocumento(e.target.value)

    }
    const onkeyup_numeroTipoDocumentoSubstituicao = (e: any) => {
        setNumeroTipoDocumentoSubstituicao(e.target.value)

    }
    const onkeyup_numeroChassi = (e: any) => {
        setNumeroChassi(e.target.value)

    }

    const onkeyup_pesoBruto = (e: any) => {
        setPesoBruto(e.target.value)

    }
    const onkeyup_lotacao = (e: any) => {
        setLotacao(e.target.value)

    }
    const onkeyup_cilidranda = (e: any) => {
        setCilidranda(e.target.value)

    }
    const onkeyup_taxa = (e: any) => {
        setTaxa(e.target.value)

    }
    const onkeyup_pneumaticoFrente = (e: any) => {
        setPneumaticoFrente(e.target.value)

    }
    const onkeyup_pneumaticoRetaguarda = (e: any) => {
        setPneumaticoRetaguarda(e.target.value)

    }
    const onChange_ateDia = (e: any) => {
        setAteDia(e.target.value)
    }
    const onChange_ateLocal = (e: any) => {
        setLocal(e.target.value)
    }

    const onkeyup_validadeLocal = (e: any) => {
        setValidadeLocal(e.target.value)

    }

    //titulo conducao


    const onChange_grupo2 = (e: any) => {
        setGrupo2(e.target.value)
    }
    const onChange_ateDiaLocal = (e: any) => {
        setAteDiaLocal(e.target.value)
    }
    const onChange_ateDiaGuia = (e: any) => {
        setAteDiaGuia(e.target.value)
    }

    const onClick_addDocumentoSubstituicao = () => {


        if (documentosSubstituirTituloConducao?.find(doc => documentoCombo.id === doc.id)) {
            presentAlert({
                header: 'Error!',
                message: 'documento já adicionado!\n',
                buttons: [
                    { text: 'Fechar' },
                ]
            })
        } else {

            setDocumentosSubstituirTituloConducao([...documentosSubstituirTituloConducao, documentoCombo])

        }



    }
    const onkeyup_localValidadeGuia = (e: any) => {
        setLocalValidadeGuia(e.target.value)

    }
    const onkeyup_observacaoSubstituicaoTituloConducao = (e: any) => {
        setObservacaoSubstituicaoTituloConducao(e.target.value)

    }
    // end substituicao de documento  

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

                        <IonButton className="" fill="outline" color="primary" slot="end"
                            onClick={() => { }}
                        >
                            EMITIR
                        </IonButton>

                        <IonButton className="btn-catalogo" fill="outline" color="medium" slot="end" onClick={onClick_SaveApreensaoDocumentos}>
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
                                            <IonSelect interface="popover" value={motivoApreensao} onIonChange={(e) => setMotivoApreensao(e.detail.value)}>
                                                {combos?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={JSON.stringify({ id: local.id, descricao: local.descricao })}>{`${local.descricao}`}</IonSelectOption>
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
                                            data={motivosApreensao}
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
                                            <IonSelect interface="popover" value={documento} onIonChange={(e) => setDocumento(e.detail.value)}>
                                                {dadosApreensaoDocumento?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={JSON.stringify(local)}>{`${local.descricao}`}</IonSelectOption>
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
                                            data={documentosApreendidos}
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
                                                            value={JSON.stringify(local)}>{`${local.descricao}`}</IonSelectOption>
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
                                            <IonLabel position="floating" itemType="text" placeholder="Norma infringida"></IonLabel>
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
                                            <IonSelect interface="popover" disabled={!isDiaPagamento} value={diaPagamento} onIonChange={e => setDiaPagamento(e.detail.value)} >
                                                {camarasMunicipais?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={local}>{`${local.descricao}`}</IonSelectOption>
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
                                            <IonLabel position="floating" itemType="text" placeholder="Norma infringida"></IonLabel>
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

            {/*Popover: Apreensão de veículo*/}
            <IonPopover
                isOpen={openPopoverApreensaoVeiculoData}
                className="menu popoverArguido"
                showBackdrop={true}
                onDidDismiss={() => {
                    setOpenPopoverApreensaoVeiculoData(false);
                }}>

                <IonHeader className="ion-no-border">
                    <IonToolbar color='transparent'>
                        <IonLabel slot='start'>
                            <h1>
                                Apreensão de veículo
                            </h1>
                        </IonLabel>

                        <IonButton className="" fill="outline" color="primary" slot="end"
                            onClick={onClick_saveApreensaoVeiculo}
                        >
                            EMITIR
                        </IonButton>

                        <IonButton className="btn-catalogo" fill="outline" color="medium" slot="end" >
                            IMPRIMIR <IonIcon slot="start" icon={bookOutline} />
                        </IonButton>

                        <IonButton className="btn-close" fill="outline" color="danger" slot="end" onClick={() => {
                            setOpenPopoverApreensaoVeiculoData(false);
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
                                            <IonSelect interface="popover" onIonChange={e => setMotivoApreensaoVeiculo(e.detail.value)}>
                                                {motivosApreensaoVeiculoCombo?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={local}>{`${local.descricao}`}</IonSelectOption>
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
                                                onClick={onClick_addMotivoApreensaoVeiculo}> ADICIONAR </IonButton>

                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow style={{ marginTop: 20 }}>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>
                                        <DataTable
                                            columns={columnsMotivosApreensaoVeiculo}
                                            data={motivosApreensaoVeiculo}
                                        />
                                    </IonCol>
                                </IonRow>
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Motivos de Apreensão */}

                    {/* Fiel depositário */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Fiel depositário</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='12'>

                                        <IonRadioGroup value={fielDepositario}
                                            onIonChange={e => setFielDepositario(e.detail.value)}>

                                            <IonRow>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Condutor" />
                                                        <IonLabel className="radioBox">Condutor</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Proprietário" />
                                                        <IonLabel className="radioBox">Proprietário</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Terceiro" />
                                                        <IonLabel className="radioBox">Terceiro</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="GNR" />
                                                        <IonLabel className="radioBox">GNR</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="number" placeholder="Nome">N° da apreensão de veículo</IonLabel>
                                            <IonInput value={numeroApreensaoVeiculo} onKeyUp={onKeyup_setNumeroApreensaoVeiculo}>

                                            </IonInput>
                                        </IonItem>
                                    </IonCol>

                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome">Nome</IonLabel>
                                            <IonInput value={nomefielDepositario} onKeyUp={onKeyup_setNomeFielDepositario}>

                                            </IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Morada">Morada</IonLabel>
                                            <IonInput value={moradafielDepositario} onKeyUp={onKeyup_setMoradaFielDepositario}>

                                            </IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm="9" size-md="10" size-lg="8" style={{ marginTop: 16 }}>
                                        <IonItem>
                                            <IonLabel>Documento *</IonLabel>
                                            <IonSelect interface="popover" value={documentoDepositario} onIonChange={onChange_documentoDepositario}>
                                                {dadosApreensaoDocumento?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={local}>{`${local.descricao}`}</IonSelectOption>
                                                    )
                                                })}
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='10' size-lg='4'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome infringida">Número</IonLabel>
                                            <IonInput value={numeroDocumentoDepositario}
                                                onKeyUp={onKeyup_numeroDocumentoDepositario}

                                            ></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>

                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Fiel depositário */}

                    {/* Dados de apreensão do veículo */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Dados de apreensão do veículo</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>

                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='4'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="kms">kms</IonLabel>
                                            <IonInput value={kmsApreensaoVeiculo} onKeyUp={onKeyup_kmsApreensaoVeiculo}></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol size-sm='12' size-md='10' size-lg='4'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="kms">Local de depósito</IonLabel>
                                            <IonInput value={localDeposito} onKeyUp={onKeyup_localDeposito}></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>

                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Dados de apreensão do veículo */}

                    {/* Acções associadas */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Acções associadas</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent style={{ marginBottom: 300 }}>
                            <IonGrid>
                                {/*group1*/}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox

                                                checked={isDocumentoVeiculoVirtudeDe}
                                                onIonChange={e => setIsDocumentoVeiculoVirtudeDe(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                O documento de identificação do veículo não apreendido em virtude de
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>

                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome infringida">Descreva aqui o motivo</IonLabel>
                                            <IonInput

                                                disabled={!isDocumentoVeiculoVirtudeDe}
                                                value={motivoDocumentoVeiculo}
                                                onKeyUp={keyup_motivoDocumentoVeiculo}
                                            ></IonInput>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                {/*group1*/}


                                {/*group2*/}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox

                                                checked={isApreendidoDocumentos}
                                                onIonChange={e => setIsApreendidoDocumentos(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                Apreensão de documentos
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm="9" size-md="10" size-lg="8" style={{ marginTop: 16 }}>
                                        <IonItem>
                                            <IonLabel>Documento</IonLabel>
                                            <IonSelect interface="popover" disabled={!isApreendidoDocumentos} onIonChange={e => setDocumentoAccaoAssoc(e.detail.value)}>
                                                {dadosApreensaoDocumento?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={local}>{`${local.descricao}`}</IonSelectOption>
                                                    )
                                                })}
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='10' size-lg='4'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome infringida">Número</IonLabel>
                                            <IonInput value={numeroDocumentoAccaoAssoc}
                                                onKeyUp={onKeyup_numeroDocumentoAccaoAssoc}

                                            ></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm="9" size-md="10" size-lg="8" style={{ marginTop: 16 }}>
                                        <IonItem>
                                            <IonLabel>O arguido poderá levantar o(s) documento(s) provisoriamente apreendido(s), no serviço desconcentrado do IMTT de</IonLabel>
                                            <IonSelect interface="popover" value={localLevantarIMTT} onIonChange={e => setLocalLevantarIMTT(e.detail.value)}>
                                                {locaisLevantarIMTT?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={local}>{`${local.descricao}`}</IonSelectOption>
                                                    )
                                                })}
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                {/*group2*/}

                                {/*group3*/}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox

                                                checked={isAvisoApreensaoDocumentoPassado}
                                                onIonChange={e => setIsAvisoApreensaoDocumentoPassado(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                Foi passado o aviso de apreensão de documentos
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                {/*group3*/}

                                {/*group4*/}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ padding: 21, marginTop: -20 }}>



                                        <IonCheckbox

                                            checked={isApreensaoVeiculoProduzEfeito}
                                            onIonChange={e => setIsApreensaoVeiculoProduzEfeito(e.detail.checked)} />


                                        <IonLabel class="ion-margin-start">
                                            Para efeitos do dispositivo no nº5 do art. 174º do CE, a presente apreensão do veículo só produz efeitos a partir da data do dia

                                            <DatePicker inputName={'acoesComplementares-data_hora'} textLabel="Data/Hora *" setSelected={setDataProduzEfeitoApreensao}
                                                selected={dataProduzEfeitoApreensao} />
                                            data do termo de validade da Guia de Substituição emitida em substituição dos documentos provisoriamente apreendidos,nos termos do nº3 do art. 174º do CE (Infracções com sanções por cumprir).
                                        </IonLabel>
                                    </IonCol>

                                </IonRow>
                                {/*group4*/}
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Acções associadas */}
                </IonContent>

            </IonPopover>
            {/*Popover: Apreensão de veículo*/}

            {/*Popover: Bloqueamento/Remoção de veículo*/}
            <IonPopover
                isOpen={openPopoverBloqueamento_RemocaoVeiculoData}
                className="menu popoverArguido"
                showBackdrop={true}
                onDidDismiss={() => {
                    setOpenPopoverBloqueamento_RemocaoVeiculoData(false);
                }}>

                <IonHeader className="ion-no-border">
                    <IonToolbar color='transparent'>
                        <IonLabel slot='start'>
                            <h1>
                                Auto de bloqueamento
                            </h1>
                        </IonLabel>

                        <IonButton className="" fill="outline" color="primary" slot="end"
                            onClick={() => {
                                setIsSavedBloqueamento(true)
                                setOpenPopoverBloqueamento_RemocaoVeiculoData(false);

                            }}
                        >
                            EMITIR
                        </IonButton>

                        <IonButton className="btn-catalogo" fill="outline" color="medium" slot="end">
                            IMPRIMIR <IonIcon slot="start" icon={bookOutline} />
                        </IonButton>

                        <IonButton className="btn-close" fill="outline" color="danger" slot="end" onClick={() => {
                            setOpenPopoverBloqueamento_RemocaoVeiculoData(false);
                        }}>
                            CANCELAR
                        </IonButton>

                    </IonToolbar>
                </IonHeader>

                <IonContent>

                    {/* Bloqueamento */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Elementos identificadores
                            </IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>

                            <IonGrid>

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='6'>

                                        <IonRadioGroup value={houveBloquamento}
                                            onIonChange={e => setHouveBloqueamento(e.detail.value)}>

                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonListHeader>
                                                        <IonLabel>
                                                            Houve bloqueamento? *
                                                        </IonLabel>
                                                    </IonListHeader>
                                                </IonCol>
                                                <IonCol size='6'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Sim" />
                                                        <IonLabel className="radioBox">Sim</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='6'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Não" />
                                                        <IonLabel className="radioBox">Não</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='12' size-lg='6' style={{ marginTop: 32 }}>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="N° do Bloq./Remoção do veículo">N° do Bloq./Remoção do veículo</IonLabel>
                                            <IonInput value={numeroBloqueamentoRemocaoVeiculo} onKeyUp={onKeyup_numeroBloqueamentoRemocaoViatura}></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol size-sm='12' size-md='12' size-lg='12'>
                                        <IonItem>
                                            <IonLabel>Legislação associada</IonLabel>
                                            <IonSelect interface="popover" value={legislacaoAssociadaBloqueamento} onIonChange={e => setLegislacaoAssociadaBloqueamento(e.detail.value)}>
                                                {legislacoesAssociadas?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={local}>{`${local.descricao}`}</IonSelectOption>
                                                    )
                                                })}
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Bloqueamento */}

                    {/* Remoção */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Remoção
                            </IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>

                            <IonGrid>

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='6'>

                                        <IonRadioGroup value={houveRemocao}
                                            onIonChange={e => setHouveRemocao(e.detail.value)}>

                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonListHeader>
                                                        <IonLabel>
                                                            Houve remoção? *
                                                        </IonLabel>
                                                    </IonListHeader>
                                                </IonCol>
                                                <IonCol size='6'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Sim" />
                                                        <IonLabel className="radioBox">Sim</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='6'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Não" />
                                                        <IonLabel className="radioBox">Não</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='12' size-lg='6' style={{ marginTop: 46 }}>
                                        <DatePicker inputName={'acoesComplementares-data_hora'} textLabel="Data/Hora *" setSelected={setDataRemocao}
                                            selected={dataRemocao} />
                                    </IonCol>

                                    <IonCol size-sm='12' size-md='12' size-lg='12'>
                                        <IonItem>
                                            <IonLabel>Legislação associada</IonLabel>
                                            <IonSelect interface="popover" value={legislacaoAssociadaRemocao} onIonChange={e => setLegislacaoAssociadaRemocao(e.detail.value)}>
                                                {legislacoesAssociadasRemocao?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={local}>{`${local.descricao}`}</IonSelectOption>
                                                    )
                                                })}
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol size-sm='12' size-md='12' size-lg='12'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Número">Local de destino</IonLabel>
                                            <IonInput value={localDestinoRemocao} onKeyUp={onKeyup_localDestinoRemocao} ></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol size-sm='12' size-md='12' size-lg='12'>
                                        <IonItem lines="none">
                                            <IonLabel position="stacked">Motivo (Não remoção)</IonLabel>
                                            <IonTextarea
                                                rows={6}
                                                cols={10}
                                                placeholder=""
                                                value={motivoNaoRemocao}
                                                onKeyUp={onkeyup_motivoNaoRemocao}>
                                            </IonTextarea>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Remoção */}


                    {/* Pagamento */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Pagamento
                            </IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>

                            <IonGrid>

                                <IonRow>

                                    <IonCol size-sm='12' size-md='12' size-lg='4' style={{ marginTop: 16 }}>
                                        <IonItem>
                                            <IonLabel>Meio pagamento</IonLabel>
                                            <IonSelect interface="popover" value={meioPagamento} onIonChange={e => setMeioPagamento(e.detail.value)}>
                                                {meiosPagamento?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={local}>{`${local.descricao}`}</IonSelectOption>
                                                    )
                                                })}
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol size-sm='12' size-md='12' size-lg='4'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Número">Número do cheque</IonLabel>
                                            <IonInput value={numeroCheque} onKeyUp={onKeyup_numeroCheque}></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol size-sm='12' size-md='12' size-lg='4' style={{ marginTop: 16 }}>
                                        <IonItem>
                                            <IonLabel>Banco emissor</IonLabel>
                                            <IonSelect interface="popover" value={bancoEmissor} onIonChange={e => setBancoEmissor(e.detail.value)}>
                                                {bancosEmissores?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={local}>{`${local.descricao}`}</IonSelectOption>
                                                    )
                                                })}
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>

                                <IonRow>

                                    <IonCol size-sm='12' size-md='12' size-lg='3'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Valor bloqueamento">Valor bloqueamento</IonLabel>
                                            <IonInput value={valorBloqueamento} onKeyUp={onkeyup_valorBloqueamento}></IonInput>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='12' size-lg='3' style={{ marginTop: 24 }}>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Valor remoção">Valor remoção</IonLabel>
                                            <IonInput value={valorRemocao} onKeyUp={onkeyup_valorRemocao}></IonInput>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='12' size-lg='3' style={{ marginTop: 24 }}>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Valor total">Valor total</IonLabel>
                                            <IonInput value={valorTotalBloqueamentoRemocao} disabled></IonInput>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='12' size-lg='3'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Número">N° nota de cobrança (Manual)</IonLabel>
                                            <IonInput value={notaCobrancaManual} onKeyUp={onkeyup_notaCobrancaManual}></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Pagamento */}
                </IonContent>

            </IonPopover>
            {/*Popover: Bloqueamento/Remoção de veículo*/}

            {/*Popover: Substituição de documentos*/}
            <IonPopover
                isOpen={openPopoverSubstituicaoDocumentosData}
                className="menu popoverArguido"
                showBackdrop={true}
                onDidDismiss={() => {
                    setOpenPopoverSubstituicaoDocumentosData(false);
                }}>

                <IonHeader className="ion-no-border">
                    <IonToolbar color='transparent'>
                        <IonLabel slot='start'>
                            <h1>
                                Guia de substituição de documentos
                            </h1>
                        </IonLabel>

                        <IonButton className="" fill="outline" color="primary" slot="end"
                            onClick={() => {
                                setIsSubstituicao(true)
                                setOpenPopoverSubstituicaoDocumentosData(false)

                            }}
                        >
                            EMITIR
                        </IonButton>

                        <IonButton className="btn-catalogo" fill="outline" color="medium" slot="end">
                            IMPRIMIR <IonIcon slot="start" icon={bookOutline} />
                        </IonButton>

                        <IonButton className="btn-close" fill="outline" color="danger" slot="end" onClick={() => {
                            setOpenPopoverSubstituicaoDocumentosData(false);
                        }}>
                            CANCELAR
                        </IonButton>

                    </IonToolbar>
                </IonHeader>

                <IonContent>

                    {/* Certificado de matrícula */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Certificado de matrícula</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>

                                <IonRow>

                                    <IonCol size-sm='12' size-md='12' size-lg='12' className="ion-margin-start">
                                        <h2 style={{ fontWeight: 'bold' }}>- N/A</h2>
                                    </IonCol>

                                    <IonCol size-sm='12' size-md='12' size-lg='6'>

                                        <IonRadioGroup value={substituirCertificadoMatricula}
                                            onIonChange={e => setSubstituirCertificadoMatricula(e.detail.value)}>

                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonListHeader>
                                                        <IonLabel>
                                                            Substituir? *
                                                        </IonLabel>
                                                    </IonListHeader>
                                                </IonCol>
                                                <IonCol size='6'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Sim" />
                                                        <IonLabel className="radioBox">Sim</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='6'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Não" />
                                                        <IonLabel className="radioBox">Não</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='12' size-lg='6' style={{ marginTop: 32 }}>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="N° da substituição de documentos">N° da substituição de documentos *</IonLabel>
                                            <IonInput value={numeroSubstituicaoDocumento} onKeyUp={onkeyup_numeroSubstituicaoDocumento}></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm="9" size-md="10" size-lg="6" style={{ marginTop: 16 }}>
                                        <IonItem>
                                            <IonLabel>Tipo de documento *</IonLabel>
                                            <IonSelect interface="popover" value={tipoDocumentoSubstituicao} onIonChange={(e) => setTipoDocumentoSubstituicao(e.detail.value)}>
                                                {tiposDocumentoSubstituicao?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={local}>{`${local.descricao}`}</IonSelectOption>
                                                    )
                                                })}
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='10' size-lg='4'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome infringida">Número</IonLabel>
                                            <IonInput value={numeroTipoDocumentoSubstituicao}
                                                onKeyUp={onkeyup_numeroTipoDocumentoSubstituicao}

                                            ></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>

                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='3'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Número chassi">Número chassi</IonLabel>
                                            <IonInput value={numeroChassi}
                                                onKeyUp={onkeyup_numeroChassi}

                                            ></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol size-sm="9" size-md="10" size-lg="4" style={{ marginTop: 16 }}>
                                        <IonItem>
                                            <IonLabel>Combustivel</IonLabel>
                                            <IonSelect interface="popover" value={combustivel} onIonChange={(e) => setCombustivel(e.detail.value)}>
                                                {combustiveis?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={local}>{`${local.descricao}`}</IonSelectOption>
                                                    )
                                                })}
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>

                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='3'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Peso bruto (kg)">Peso bruto (kg)</IonLabel>
                                            <IonInput value={pesoBruto}
                                                onKeyUp={onkeyup_pesoBruto}

                                            ></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol size-sm='12' size-md='10' size-lg='3'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Taxa (kg)">Taxa (kg)</IonLabel>
                                            <IonInput value={taxa}
                                                onKeyUp={onkeyup_taxa}

                                            ></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>


                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='3'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Lotação">Lotação</IonLabel>
                                            <IonInput value={lotacao}
                                                onKeyUp={onkeyup_lotacao}

                                            ></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol size-sm='12' size-md='10' size-lg='3'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Cilindrada">Cilindrada</IonLabel>
                                            <IonInput value={cilindrada}
                                                onKeyUp={onkeyup_cilidranda}

                                            ></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>

                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='4'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Pneumáticos frente">Pneumáticos frente</IonLabel>
                                            <IonInput value={pneumaticoFrente}
                                                onKeyUp={onkeyup_pneumaticoFrente}

                                            ></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol size-sm='12' size-md='10' size-lg='4'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Pneumáticos retaguarda">Pneumáticos retaguarda</IonLabel>
                                            <IonInput value={pneumaticoRetaguarda}
                                                onKeyUp={onkeyup_pneumaticoRetaguarda}

                                            ></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>

                                <IonRow style={{ marginTop: 16 }}>
                                    <IonCol size='12'>
                                        <IonListHeader>
                                            <IonLabel>
                                                A presente guia é válida
                                            </IonLabel>
                                        </IonListHeader>
                                    </IonCol>
                                    <IonCol size='3'>
                                        <IonItem
                                            lines='none'
                                            className="infoAdicionais-domicilio-radio radio-item">
                                            <IonRadio value={ateDia} onChange={onChange_ateDia} />
                                            <IonLabel className="radioBox">até ao dia</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size='6'>
                                        <DatePicker inputName={'acoesComplementares-data'} textLabel="Data" setSelected={setDataGuia}
                                            selected={dataGuia} />
                                    </IonCol>
                                </IonRow>

                                <IonRow>
                                    <IonCol size='12'>
                                        <IonListHeader>
                                            <IonLabel>
                                                A presente guia é válida
                                            </IonLabel>
                                        </IonListHeader>
                                    </IonCol>
                                    <IonCol size='3'>
                                        <IonItem
                                            lines='none'
                                            className="infoAdicionais-domicilio-radio radio-item">
                                            <IonRadio value={ateLocal} onChange={onChange_ateLocal} />
                                            <IonLabel className="radioBox">até ao local</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size='6' style={{ marginTop: -16 }}>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Número">Local</IonLabel>
                                            <IonInput value={validadeLocal} onKeyUp={onkeyup_validadeLocal}></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Certificado de matrícula */}

                    {/* Título de condução */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Título de condução</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>

                                <IonRow>

                                    <IonCol size-sm='12' size-md='12' size-lg='12' className="ion-margin-start">
                                        <h2 style={{ fontWeight: 'bold' }}>, Carta de condução - -</h2>
                                    </IonCol>

                                    <IonCol size-sm='12' size-md='12' size-lg='6'>

                                        <IonRadioGroup value={substituirCartaConducao}
                                            onIonChange={e => setSubstituirCartaConducao(e.detail.value)}>

                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonListHeader>
                                                        <IonLabel>
                                                            Substituir? *
                                                        </IonLabel>
                                                    </IonListHeader>
                                                </IonCol>
                                                <IonCol size='6'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Sim" />
                                                        <IonLabel className="radioBox">Sim</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='6'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Não" />
                                                        <IonLabel className="radioBox">Não</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm="9" size-md="10" size-lg="4" style={{ marginTop: 16 }}>
                                        <IonItem>
                                            <IonLabel>Documento *</IonLabel>
                                            <IonSelect interface="popover" value={documentoCartaConducao} onIonChange={(e) => setDocumentoCartaConducao(e.detail.value)}>
                                                {tiposDocumentoSubstituicao?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={local}>{`${local.descricao}`}</IonSelectOption>
                                                    )
                                                })}
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='10' size-lg='4' style={{ marginTop: 16 }}>
                                        <IonItem
                                            lines='none'
                                            className="tituloCondutor-radio radio-item">
                                            <IonCheckbox value={grupo2} onChange={onChange_grupo2} />
                                            <IonLabel className="radioBox">Grupo 2</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='10' size-lg='4' style={{ marginTop: 16 }}>
                                        <DatePicker inputName={'TituloConducao-dataEmissao'} textLabel="Data emissão" setSelected={setDataEmissao}
                                            selected={dataEmissao} />
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm="9" size-md="10" size-lg="9" style={{ marginTop: 16 }}>
                                        <IonItem>
                                            <IonLabel>Documento *</IonLabel>
                                            <IonSelect interface="popover" value={documentoCombo} onIonChange={(e) => setDocumentoCombo(e.detail.value)}>
                                                {tiposDocumentoSubstituicao?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={local}>{`${local.descricao}`}</IonSelectOption>
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
                                                onClick={onClick_addDocumentoSubstituicao}> ADICIONAR </IonButton>

                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow style={{ marginTop: 16 }}>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>
                                        <DataTable
                                            columns={columnsTituloConducao}
                                            data={documentosSubstituirTituloConducao}
                                        />
                                    </IonCol>
                                </IonRow>

                                <IonRow style={{ marginTop: 16 }}>
                                    <IonCol size='12'>
                                        <IonListHeader>
                                            <IonLabel>
                                                A presente guia é válida
                                            </IonLabel>
                                        </IonListHeader>
                                    </IonCol>
                                    <IonCol size='3'>
                                        <IonItem
                                            lines='none'
                                            className="infoAdicionais-domicilio-radio radio-item">
                                            <IonRadio value={ateDiaGuia} onChange={onChange_ateDiaGuia} />
                                            <IonLabel className="radioBox">até ao dia</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size='6'>
                                        <DatePicker inputName={'acoesComplementares-data'} textLabel="Data" setSelected={setDataValidadeGuia}
                                            selected={dataValidadeGuia} />
                                    </IonCol>
                                </IonRow>

                                <IonRow>
                                    <IonCol size='12'>
                                        <IonListHeader>
                                            <IonLabel>
                                                A presente guia é válida
                                            </IonLabel>
                                        </IonListHeader>
                                    </IonCol>
                                    <IonCol size='3'>
                                        <IonItem
                                            lines='none'
                                            className="infoAdicionais-domicilio-radio radio-item">
                                            <IonRadio value={ateDiaLocal} onChange={onChange_ateDiaLocal} />
                                            <IonLabel className="radioBox">até ao local</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size='6' style={{ marginTop: -16 }}>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Número">Local</IonLabel>
                                            <IonInput value={localValidadeGuia} onKeyUp={onkeyup_localValidadeGuia}></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='12'>
                                        <IonItem lines="none">
                                            <IonLabel position="stacked">Observações</IonLabel>
                                            <IonTextarea
                                                rows={6}
                                                cols={10}
                                                placeholder="" value={observacaoSubstituicaoTituloConducao} onKeyUp={onkeyup_observacaoSubstituicaoTituloConducao}>
                                            </IonTextarea>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>

                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Título de condução */}
                </IonContent>

            </IonPopover>
            {/*Popover: Substituição de documentos*/}

            {/*Popover: Apresentação de documentos*/}
            <IonPopover
                isOpen={openPopoverApresentacaoDocumentoData}
                className="menu popoverArguido"
                showBackdrop={true}
                onDidDismiss={() => {
                    setOpenPopoverApresentacaoDocumentoData(false);
                }}>

                <IonHeader className="ion-no-border">
                    <IonToolbar color='transparent'>
                        <IonLabel slot='start'>
                            <h1>
                                Aviso para apresentação de documentos
                            </h1>
                        </IonLabel>

                        <IonButton className="" fill="outline" color="primary" slot="end"
                            onClick={() => {
                                setOpenPopoverApresentacaoDocumentoData(false);
                                setIsSavedApresentacaoDocumento(true)
                            }}
                        >
                            EMITIR
                        </IonButton>

                        <IonButton className="btn-catalogo" fill="outline" color="medium" slot="end">
                            IMPRIMIR <IonIcon slot="start" icon={bookOutline} />
                        </IonButton>

                        <IonButton className="btn-close" fill="outline" color="danger" slot="end" onClick={() => {
                            setOpenPopoverApresentacaoDocumentoData(false);
                        }}>
                            CANCELAR
                        </IonButton>

                    </IonToolbar>
                </IonHeader>

                <IonContent>

                    {/* N° da apresentação de documentos */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>N° da apresentação de documentos*</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>

                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='6'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="kms">N° da apresentação de documentos *</IonLabel>
                                            <IonInput value={numeroApresentacaoDocumento} onKeyUp={onkeyup_numeroApresentacaoDocumento}></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>

                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* N° da apresentação de documentos */}


                    {/* Documentos a apresentar */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Documentos a apresentar *</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>
                                {/*group1*/}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox

                                                checked={isTituloConducao}
                                                onIonChange={e => setIsTituloConducao(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                Título de condução
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                {/*group1*/}

                                {/*group2*/}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox

                                                checked={isCertificadoMatricula}
                                                onIonChange={e => setIsCertificadoMatricula(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                Certificado de matrícula
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                {/*group2*/}

                                {/*group3*/}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox

                                                checked={isDocumentoInspecaoVeiculo}
                                                onIonChange={e => setIsDocumentoInspecaoVeiculo(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                Documento de inspecção do veículo
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                {/*group3*/}

                                {/*group4*/}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox

                                                checked={isCertificadoSeguroValidoVeiculo}
                                                onIonChange={e => setIsCertificadoSeguroValidoVeiculo(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                Certificado de seguro válido do veículo
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                {/*group4*/}

                                {/*group5*/}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox

                                                checked={isBilheteIdentidade}
                                                onIonChange={e => setIsBilheteIdentidade(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                Bilhete de identidade
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                {/*group5*/}

                                {/*group6*/}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox

                                                checked={isCartaoCidadao}
                                                onIonChange={e => setIsCartaoCidadao(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                Cartão de cidadão
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                {/*group6*/}

                                {/*group7*/}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox

                                                checked={isPassaporte}
                                                onIonChange={e => setIsPassaporte(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                Passaporte
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                {/*group7*/}

                                {/*group8*/}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox

                                                checked={isTituloResidencia}
                                                onIonChange={e => setIsTituloResidencia(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                Título de residência
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                {/*group8*/}

                                {/*group9*/}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox

                                                checked={isOutro}
                                                onIonChange={e => setIsOutro(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                Outros
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                {/*group9*/}
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Documentos a apresentar */}

                    {/* Local de apresentação/entrega */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Local de apresentação/entrega *</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size-sm="12" size-md="12" size-lg="12">
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Local de apresentação/entrega *">Local de apresentação/entrega *</IonLabel>
                                            <IonInput value={localApresentacaoEntrega} onKeyUp={onkeyup_localApresentacaoEntrega}></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                {/*group1*/}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox

                                                checked={isInserirNumeroProcessoReferenteObrigatoriedadeEntregaDocumento}
                                                onIonChange={e => setIsInserirNumeroProcessoReferenteObrigatoriedadeEntregaDocumento(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                Inserir o nº do processo referente à obrigatoriedade de entrega do documento
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                {/*group1*/}

                                {/*group2*/}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox

                                                checked={isInserirEmailEnvioDocumento}
                                                onIonChange={e => setIsInserirEmailEnvioDocumento(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                Inserir o email para envio do documento retirado da aplicação móvel
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                {/*group2*/}
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Local de apresentação/entrega */}

                    {/* Proprietário */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Proprietário</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>

                                <IonRow>
                                    <IonCol size-sm="12" size-md="12" size-lg="12">
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome">Nome</IonLabel>
                                            <IonInput value={nomeProprietario} onKeyUp={onkeyup_nomeProprietario}></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>

                                <IonRow>
                                    <IonCol size-sm="12" size-md="12" size-lg="12">
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Morada">Morada</IonLabel>
                                            <IonInput value={moradaProprietario} onKeyUp={onkeyup_moradaProprietario}></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>

                                <IonRow>
                                    <IonCol size-sm="9" size-md="10" size-lg="8" style={{ marginTop: 16 }}>
                                        <IonItem>
                                            <IonLabel>Documento *</IonLabel>
                                            <IonSelect interface="popover" value={documentoProprietario} onIonChange={(e) => { setDocumentoProprietario(e.detail.value) }}>
                                                {documentosApreendidos?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={local}>{`${local.descricao}`}</IonSelectOption>
                                                    )
                                                })}
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='10' size-lg='4'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome infringida">Número</IonLabel>
                                            <IonInput value={numeroDocumentoProprietario}
                                                onKeyUp={onkeyup_numeroDocumentoProprietario}

                                            ></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Proprietário */}

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
                                                value={numeroDocumentoApresentacaoDocumento}
                                                onKeyUp={onkeyup_numeroDocumentoApresentacaoDocumento}
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
            {/*Popover: Apresentação de documentos*/}

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

                        <IonButton className="btn-catalogo" fill="solid" color="primary" slot="end" onClick={on_addFichaControdor}>
                            ADICIONAR
                        </IonButton>

                        <IonButton className="btn-close" fill="solid" color="danger" slot="end" onClick={() => {
                            setOpenPopoverFichaControladorData(false);
                        }}>
                            VOLTAR
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
                                        <DatePicker inputName={'acoesComplementares-data_hora'} textLabel="Data/Hora *" setSelected={setDataHora}
                                            selected={dataHora} />
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='12' size-lg='4' style={{ marginTop: 16 }}>
                                        <DatePicker inputName={'acoesComplementares-data_horaUltimaAtualizacao'} textLabel="Data de última atualização" setSelected={setDataUltimaAtualizacao}
                                            selected={dataUltimaAtualizacao} />
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='12' size-lg='4' style={{ marginTop: 16 }}>
                                        <IonItem lines='none'>
                                            <div>
                                                <small>ID Terminal</small><br />
                                                <strong>{userTerminal}</strong>
                                            </div>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='6'>

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
                                                        <IonRadio value="Autuado" />
                                                        <IonLabel className="radioBox">Autuado</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='6'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Testemunha" />
                                                        <IonLabel className="radioBox">Testemunha</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>

                                </IonRow>

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='12'>

                                        <IonRadioGroup value={tipoDeFichaControlador}
                                            onIonChange={onChange_tipoControlador}>

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
                                                        <IonCheckbox value="Álcool" />
                                                        <IonLabel className="radioBox">Álcool</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='9'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonCheckbox value="Estupefacientes" />
                                                        <IonLabel className="radioBox">Estupefacientes e/ou outros psicotrópicos</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>

                                </IonRow>
                                {/* {tipoDeFichaControlador==="Alcool"?} */}

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='12'>

                                        <IonRadioGroup value={circunstanciaExameAlcool}
                                            onIonChange={e => setCircunstanciaExameAlcool(e.detail.value)}>

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
                                                        <IonRadio value="Acidente" />
                                                        <IonLabel className="radioBox">Acidente</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Aletória" />
                                                        <IonLabel className="radioBox">Aletória</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Início de coondução" />
                                                        <IonLabel className="radioBox">Início de coondução</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Manobra irregular" />
                                                        <IonLabel className="radioBox">Manobra irregular</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>

                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='12'>

                                        <IonRadioGroup value={circunstanciaExameEstupefacientes}
                                            onIonChange={e => setCircunstanciaExameEstupefacientes(e.detail.value)}>

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
                                                        <IonRadio value="Acidente" />
                                                        <IonLabel className="radioBox">Acidente</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Indicios" />
                                                        <IonLabel className="radioBox">Indicios</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>

                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm="12" size-md="12" size-lg="12" style={{ marginTop: 16 }}>
                                        <IonItem lines='none'>
                                            <IonButton className="btn-catalogo" fill="solid" color="primary" slot='end' onClick={() => {
                                                setActiveSegment('alcool');
                                            }}>
                                                Seguinte
                                            </IonButton>
                                        </IonItem>
                                    </IonCol>



                                </IonRow>
                            </IonGrid>
                            {/*Dados gerais*/}

                            {/*Álcool*/}
                            <IonGrid className={activeSegment == "alcool" ? "" : "ion-hide"}>

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='6'>

                                        <IonRadioGroup value={recusaTesteAlcool}
                                            onIonChange={e => setRecusaTesteAlcool(e.detail.value)}>

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
                                                        <IonRadio value="Não" />
                                                        <IonLabel className="radioBox">Não</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='6'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Sim" />
                                                        <IonLabel className="radioBox">Sim</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>
                                </IonRow>

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='12'>

                                        <IonRadioGroup value={tipoTesteAlcool}
                                            onIonChange={e => setTipoTesteAlcool(e.detail.value)}>

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
                                                        <IonRadio value="Teste de ar expirado" />
                                                        <IonLabel className="radioBox">Teste de ar expirado</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Análise sangue" />
                                                        <IonLabel className="radioBox">Análise sangue</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Exame médico" />
                                                        <IonLabel className="radioBox">Exame médico</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Punível à TAS 0.200 g/l" />
                                                        <IonLabel className="radioBox">Punível à TAS 0.200 g/l</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>

                                </IonRow>

                                <IonRow>
                                    <IonCol size-sm="12" size-md="12" size-lg="12" style={{ marginTop: 16 }}>
                                        <IonLabel>
                                            Alcoolímetro *
                                        </IonLabel>
                                    </IonCol>

                                    <IonCol size-sm="12" size-md="12" size-lg="4">

                                        <IonItem>

                                            <IonLabel>Marca / Modela *</IonLabel>
                                            <IonSelect interface="popover" onIonChange={e => setAlcoolimetroMarca(e.detail.value)} >
                                                {alcoolimetroMarcas?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={JSON.stringify({ id: local.id, descricao: local.descricao })}>{`${local.descricao}`}</IonSelectOption>
                                                    )
                                                })}
                                            </IonSelect>

                                        </IonItem>

                                    </IonCol>

                                    <IonCol size-sm="12" size-md="12" size-lg="4">
                                        <IonItem>

                                            <IonLabel>Série *</IonLabel>
                                            <IonSelect interface="popover" onIonChange={e => setAlcoolimetroSerie(e.detail.value)} >
                                                {alcoolimetroSeries?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={JSON.stringify({ id: local.id, descricao: local.descricao })}>{`${local.descricao}`}</IonSelectOption>
                                                    )
                                                })}
                                            </IonSelect>

                                        </IonItem>
                                    </IonCol>

                                    <IonCol size-sm="12" size-md="12" size-lg="4">
                                        <IonItem>

                                            <IonLabel>Tipo verificação *</IonLabel>
                                            <IonSelect interface="popover" onIonChange={e => setAlcoolimetroVerificacao(e.detail.value)} >
                                                {alcoolimetroTipoVerificacoes?.map((local: any) => {
                                                    return (
                                                        <IonSelectOption key={`${local.id}`}
                                                            value={JSON.stringify({ id: local.id, descricao: local.descricao })}>{`${local.descricao}`}</IonSelectOption>
                                                    )
                                                })}
                                            </IonSelect>

                                        </IonItem>
                                    </IonCol>



                                </IonRow>

                                <IonRow>

                                    <IonCol size-sm="12" size-md="12" size-lg="4">
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Número">Número *</IonLabel>
                                            <IonInput value={alcoolimetroNumero} onKeyUp={onkeyup_alcoolimetroNumero}></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol size-sm="12" size-md="12" size-lg="4" style={{ marginTop: 16 }}>
                                        <DatePicker inputName={'acoesComplementares-data_horaInfraccao'} textLabel="Data/Hora da infracção" selected={alcoolimetroDataHoraInfracao} setSelected={setAlcoolimetroDataHoraInfracao} />
                                    </IonCol>

                                    <IonCol size-sm="12" size-md="12" size-lg="4">
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Número de talão">Número de talão *</IonLabel>
                                            <IonInput value={alcoolimetroNumeroTalao} onKeyUp={onkeyup_alcoolimetroNumeroTalao}></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>

                                <IonRow>
                                    <IonCol size-sm="12" size-md="12" size-lg="12" style={{ marginTop: 16 }}>
                                        <IonLabel>
                                            Teste (g/l) *
                                        </IonLabel>
                                    </IonCol>

                                    <IonCol size-sm="12" size-md="12" size-lg="4">
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Valor registado">Valor registado *</IonLabel>
                                            <IonInput value={alcoolimetroValorRegistado} onKeyUp={onkeyup_alcoolimetroValorRegistado}></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol size-sm="12" size-md="12" size-lg="4">
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Valor apurado">Valor apurado *</IonLabel>
                                            <IonInput value={alcoolimetroValorApurado} onKeyUp={onkeyup_alcoolimetroValorApurado}></IonInput>
                                        </IonItem>
                                    </IonCol>

                                </IonRow>

                            </IonGrid>
                            {/*Álcool*/}

                            {/*Estupefacientes e/ou outros psictrópicos*/}
                            <IonGrid className={activeSegment == "estupefacientes_outrosPsicotropicos" ? "" : "ion-hide"}>

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='6'>

                                        <IonRadioGroup value={recusaTesteEstupifaciente}
                                            onIonChange={e => setRecusaTesteEstupifaciente(e.detail.value)}>

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
                                                        <IonRadio value="Não" />
                                                        <IonLabel className="radioBox">Não</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='6'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Sim" />
                                                        <IonLabel className="radioBox">Sim</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>

                                        </IonRadioGroup>

                                    </IonCol>
                                </IonRow>

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='12'>

                                        <IonRadioGroup value={tipoTesteEstupifaciente}
                                            onIonChange={e => setTipoTesteEstupifaciente(e.detail.value)}>

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
                                                        <IonRadio value="Aci" />
                                                        <IonLabel className="radioBox">Aci</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Análise sangue" />
                                                        <IonLabel className="radioBox">Análise sangue</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Exame médico" />
                                                        <IonLabel className="radioBox">Exame médico</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>

                                </IonRow>

                                <IonRow>
                                    <IonCol size-sm='12' size-md='12' size-lg='12' style={{ marginTop: 16 }}>

                                        <IonRadioGroup value={anfetaminas}
                                            onIonChange={e => setAnfetaminas(e.detail.value)}>

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
                                                        <IonRadio value="Não Anfetaminas" />
                                                        <IonLabel className="radioBox">Não</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Sim Anfetaminas" />
                                                        <IonLabel className="radioBox">Sim</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>

                                        </IonRadioGroup>

                                        <IonRadioGroup value={canabis}
                                            onIonChange={e => setCanabis(e.detail.value)}>

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
                                                        <IonRadio value="Não Canabis" />
                                                        <IonLabel className="radioBox">Não</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Sim Canabis" />
                                                        <IonLabel className="radioBox">Sim</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>

                                        </IonRadioGroup>

                                        <IonRadioGroup value={cocaina}
                                            onIonChange={e => setCocaina(e.detail.value)}>

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
                                                        <IonRadio value="Não Cocaína" />
                                                        <IonLabel className="radioBox">Não</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Sim Cocaína" />
                                                        <IonLabel className="radioBox">Sim</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>

                                        </IonRadioGroup>

                                        <IonRadioGroup value={metanfetaminas}
                                            onIonChange={e => setMetanfetaminas(e.detail.value)}>

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
                                                        <IonRadio value="Não Metanfetaminas" />
                                                        <IonLabel className="radioBox">Não</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Sim Metanfetaminas" />
                                                        <IonLabel className="radioBox">Sim</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>

                                        </IonRadioGroup>

                                        <IonRadioGroup value={opio}
                                            onIonChange={e => setOpio(e.detail.value)}>

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
                                                        <IonRadio value="Não Ópio" />
                                                        <IonLabel className="radioBox">Não</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='3'>
                                                    <IonItem
                                                        lines='none'
                                                        className="infoAdicionais-domicilio-radio radio-item">
                                                        <IonRadio value="Sim Ópio" />
                                                        <IonLabel className="radioBox">Sim</IonLabel>
                                                    </IonItem>
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
                                    c1={{ titulo: 'Distrito', valor: props.currentDadosInfracaoData?.localInfracaoData?.distrito?.descricao }}
                                    c2={{ titulo: 'Concelho', valor: props.currentDadosInfracaoData?.localInfracaoData?.concelho?.descricao }}
                                    c3={{ titulo: 'Freguesia', valor: props.currentDadosInfracaoData?.localInfracaoData?.freguesia?.descricao }}
                                />

                                <CardListItem
                                    c1={{ titulo: 'Localidade', valor: props.currentDadosInfracaoData?.localInfracaoData?.localidade?.descricao }}
                                    c2={{ titulo: 'Tipo Local', valor: props.currentDadosInfracaoData?.localInfracaoData?.tipo }}
                                    c3={{ titulo: 'Zona / Bairro', valor: props.currentDadosInfracaoData?.localInfracaoData?.zona }}
                                />

                                <CardListItem
                                    c1={{ titulo: 'Tipo de Via', valor: props.currentDadosInfracaoData?.localInfracaoData?.tipo }}
                                    c2={{ titulo: 'Arruamento / Via', valor: props.currentDadosInfracaoData?.localInfracaoData?.arruamento }}
                                    c3={{ titulo: 'N° Polícia / KM', valor: props.currentDadosInfracaoData?.localInfracaoData?.numeroPolicia }}
                                />

                                <div style={{ fontWeight: 'bold', fontSize: 18, marginTop: 30 }}>Dados de identificação do examinado</div>
                                <CardListItem
                                    c1={{ titulo: 'Data de Nascimento', valor: props.currentIntervenientesData?.arguido?.dataNascimento }}
                                    c2={{ titulo: 'Sexo', valor: '' }}
                                />

                                <div style={{ fontWeight: 'bold', fontSize: 18, marginTop: 30 }}>Dados de identificação do Veículo</div>
                                <CardListItem
                                    c1={{ titulo: 'Tipo de Veículo', valor: props.currentIntervenientesData?.veiculo?.tipo }}
                                    c2={{ titulo: 'Matrícula', valor: props.currentIntervenientesData?.veiculo?.matricula }}
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
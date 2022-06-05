import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonListHeader, IonPopover, IonRadio, IonRadioGroup, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonTextarea, IonToolbar, useIonAlert, useIonLoading } from "@ionic/react";
import { open, trash, remove, bookOutline } from "ionicons/icons";
import { resolve } from "path";
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
import NumeroDocumento from "../../../NumeroDocumento/NumeroDocumento";
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

    const data = [
        {
            id: 1,
            tipoDocumento: 'Apreensão Documentos',
            estado: isSavedApreensaoDocumento,
            abreTipoDocumento: TipoDocumento.APREENSAO_DOCUMENTOS,
        },
        {
            id: 2,
            tipoDocumento: 'Apreensão Veículo',
            estado: isSavedApreensaoVeiculo,
            abreTipoDocumento: TipoDocumento.APREENSAO_VEICULO,
        },
        {
            id: 3,
            tipoDocumento: 'Bloqueamento/Remoção de Veículo',
            estado: isSavedBloqueamento,
            abreTipoDocumento: TipoDocumento.BLOQUEAMENTO_REMOCAO_VEICULO,
        },
        {
            id: 4,
            tipoDocumento: 'Substituição de Documentos',
            estado: isSavedSubstituicao,
            abreTipoDocumento: TipoDocumento.SUBSTITUICAO_DOCUMENTOS,
        },
        {
            id: 5,
            tipoDocumento: 'Apresentação de documentos',
            estado: isSavedApresentacaoDocumento,
            abreTipoDocumento: TipoDocumento.APRESENTACAO_DOCUMENTOS,
        },
        {
            id: 6,
            tipoDocumento: 'Ficha controlador',
            estado: isFichaControlePreenchida,
            abreTipoDocumento: TipoDocumento.FICHA_CONTROLADOR,
        },
    ]
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
                                row.estado?<> <IonBadge color="success">Emitido</IonBadge></>:""         
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
                       setMotivosApreensao(motivosApreensao.filter(m=>{return m.id !==row.id}))
                       setTamanhoMotivoApreensao(tamanhoMotivoApreensao-1)

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
                          setMotivosApreensaoVeiculo(motivosApreensaoVeiculo.filter(m=>{return m.id !==row.id}))
    
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
            selector: (row: { documento:any }) => row.documento?.descricao,
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

                    setDocumentosApreendidos(documentosApreendidos.filter(m=>{return m.id !==row.id}))


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

    interface CombosAlcoolResponse {
        marcaModelo: IID_DESCRICAO[],
        serie: IID_DESCRICAO[],
        tipoVerificacao: IID_DESCRICAO[]

    }
    const getCombosAlcool = async (): Promise<CombosAlcoolResponse> => await new Contraordenacao().carregarCombosAlcool()

   
    const onClick_addAMotivoApreensao = () => {
       
        const motivo= JSON.parse(motivoApreensao)    
       
       if(motivosApreensao?.find(m=> motivo.id===m.id)){
        presentAlert({
                    header: 'Error!',
                    message: 'Motivo já adicionado!\n',
                    buttons: [
                        { text: 'Fechar' },
                    ]
                })
       }else{
          
         setMotivosApreensao([...motivosApreensao, motivo])
         setTamanhoMotivoApreensao(+motivosApreensao?.length+1)

       }

    

}

    const onClick_addDadosDocumentoApreensao = () => {
        const idDescricaoDocumento:MotivosApreensao= JSON.parse(documento)    
        const documentoApreendido =
            {
                documento:{
                    descricao: idDescricaoDocumento.descricao
                }, numero:numDocumento, 
                id:idDescricaoDocumento.id
            }
            if(documentosApreendidos?.find(doc=>doc.id === documentoApreendido.id || doc.numero === numDocumento)){
                presentAlert({
                    header: 'Error!',
                    message: 'Documento e/ou mesmo número já adicionado!\n',
                    buttons: [
                        { text: 'Fechar' },
                    ]
                })
            }else{
                setDocumentosApreendidos([...documentosApreendidos,documentoApreendido ])
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
            camaraMunicipal:camaraMunicipal,
            tituloConducao: tituloConducao,
            diaPagamento: diaPagamento,
            sancaoAplicada: sancaoAplicada,
            aplicarSansao:aplicarSansao,
            numeroDocumento: numeroDocumento,

            // apreensao de veiculos
            motivosApreensaoVeiculo:motivosApreensaoVeiculo,
            tipoFielDepositario:fielDepositario,
            numeroApreensaoVeiculo:numeroApreensaoVeiculo,
            nomeFielDepositario:nomefielDepositario,
            moradaFielDepositario:moradafielDepositario,
            documentoFielDepositario:documentoDepositario,
            numeroFielDepositario:numeroDocumentoDepositario,
            dadosApreensaoKm:kmsApreensaoVeiculo,
            dadosApreensaoLocalDeposito:localDeposito,
            documentoVeiculoNaoFoiApreendidoEmVirtude:motivoDocumentoVeiculo,
            documentoApreensao:documentoAccaoAssoc,
            numeroDocumentoApreensao:numeroDocumentoAccaoAssoc,
            arguidoPoderaLevantarDocumentoNoServicoIMTT:localLevantarIMTT,
            foiPassadoAvisoApreensaoDocumentos: isAvisoApreensaoDocumentoPassado,
            dataEfeitoApreensaoVeiculo:dataProduzEfeitoApreensao,
            // apreensao de veiculos

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
    }, [motivosApreensaoVeiculo, fielDepositario,numeroApreensaoVeiculo, nomefielDepositario,moradafielDepositario,documentoDepositario,numeroDocumentoDepositario,kmsApreensaoVeiculo,localDeposito, motivoDocumentoVeiculo, documentoAccaoAssoc,numeroDocumentoAccaoAssoc,localLevantarIMTT,isAvisoApreensaoDocumentoPassado, dataProduzEfeitoApreensao,motivosApreensao,tamanhoMotivoApreensao, documentosApreendidos,numDocumento,dataHora,localApresentacao, levantarDocsDiaUtilLocal, regularSituacaoLocal, camaraMunicipal,tituloConducao,diaPagamento,sancaoAplicada,numeroDocumento,isFichaControlePreenchida, tipoDeFichaControlador, circunstanciaExameAlcool, circunstanciaExameEstupefacientes, recusaTesteEstupifaciente, recusaTesteAlcool, tipoTesteAlcool, anfetaminas, canabis, cocaina, metanfetaminas, opio, tipoTesteEstupifaciente, alcoolimetroMarca, alcoolimetroSerie, alcoolimetroTipoVerificacao, alcoolimetroNumero, alcoolimetroDataHoraInfracao, alcoolimetroNumeroTalao, alcoolimetroValorRegistado, alcoolimetroValorApurado])

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

    const onClick_SaveApreensaoDocumentos= () =>{
        setIsSavedApreensaoDocumento(true)
        console.log(isSavedApreensaoDocumento)
        setOpenPopoverApreensaoDocumentosData(false);
    }


    // start Apreensao Veiculo functions
    
    const onClick_saveApreensaoVeiculo =()=>{
        setIsSavedApreensaoVeiculo(true)
    setOpenPopoverApreensaoVeiculoData(false)
}
const onClick_addMotivoApreensaoVeiculo= ()=>{
       if(motivosApreensaoVeiculo?.find(m=> motivoApreensaoVeiculo.id===m.id)){
        presentAlert({
                    header: 'Error!',
                    message: 'Motivo já adicionado!\n',
                    buttons: [
                        { text: 'Fechar' },
                    ]
                })
       }else{
          
         setMotivosApreensaoVeiculo([...motivosApreensaoVeiculo, motivoApreensaoVeiculo])

       }
   


}
const onKeyup_setNumeroApreensaoVeiculo =(e:any)=>{
    setNumeroApreensaoVeiculo(e.target.value)
}

const onKeyup_setNomeFielDepositario =(e:any)=>{
    setNomeFielDepositario(e.target.value)
}
const onKeyup_setMoradaFielDepositario =(e:any)=>{
    setMoradaFielDepositario(e.target.value)
}
const onChange_documentoDepositario =(e:any)=>{
        setDocumentoDepositario(e.detail.value)
}

const onKeyup_numeroDocumentoDepositario =(e:any)=>{
    setNumeroDocumentoDepositario(e.target.value)
}

const onKeyup_kmsApreensaoVeiculo =(e:any)=>{
    setKmsApreensaoVeiculo(e.target.value)
}
const onKeyup_localDeposito =(e:any)=>{
    setLocalDeposito(e.target.value)
}


const keyup_motivoDocumentoVeiculo =(e:any)=>{
    setMotivoDocumentoVeiculo(e.target.value)
}
const onKeyup_numeroDocumentoAccaoAssoc =(e:any)=>{
    setNumeroDocumentoAccaoAssoc(e.target.value)
}


    // end Apreensao Veiculo states and functions


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
                                                            value={JSON.stringify({id:local.id, descricao:local.descricao})}>{`${local.descricao}`}</IonSelectOption>
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
                                            <IonSelect interface="popover" disabled={!isDiaPagamento}  value ={diaPagamento} onIonChange={e => setDiaPagamento(e.detail.value)} >
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
                            onClick={() => { }}
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

                                        <IonRadioGroup value={recusaTesteAlcool}
                                            onIonChange={e => setRecusaTesteAlcool(e.detail.value)}>

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
                                            <IonInput></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol size-sm='12' size-md='12' size-lg='12'>
                                        <IonItem>
                                            <IonLabel>Legislação associada</IonLabel>
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

                                        <IonRadioGroup value={recusaTesteAlcool}
                                            onIonChange={e => setRecusaTesteAlcool(e.detail.value)}>

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
                                        <DatePicker inputName={'acoesComplementares-data_hora'} textLabel="Data/Hora *" setSelected={setDataHora}
                                            selected={dataHora} />
                                    </IonCol>

                                    <IonCol size-sm='12' size-md='12' size-lg='12'>
                                        <IonItem>
                                            <IonLabel>Legislação associada</IonLabel>
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

                                    <IonCol size-sm='12' size-md='12' size-lg='12'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Número">Local de destino</IonLabel>
                                            <IonInput></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol size-sm='12' size-md='12' size-lg='12'>
                                        <IonItem lines="none">
                                            <IonLabel position="stacked">Motivo (Não remoção)</IonLabel>
                                            <IonTextarea
                                                rows={6}
                                                cols={10}
                                                placeholder="">
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

                                    <IonCol size-sm='12' size-md='12' size-lg='4' style={{marginTop:16}}>
                                        <IonItem>
                                            <IonLabel>Meio pagamento</IonLabel>
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

                                    <IonCol size-sm='12' size-md='12' size-lg='4'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Número">Número do cheque</IonLabel>
                                            <IonInput></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol size-sm='12' size-md='12' size-lg='4' style={{ marginTop: 16 }}>
                                        <IonItem>
                                            <IonLabel>Banco emissor</IonLabel>
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
                                </IonRow>

                                <IonRow>

                                    <IonCol size-sm='12' size-md='12' size-lg='3'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Valor bloqueamento">Valor bloqueamento</IonLabel>
                                            <IonInput></IonInput>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='12' size-lg='3' style={{ marginTop: 24 }}>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Valor remoção">Valor remoção</IonLabel>
                                            <IonInput></IonInput>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='12' size-lg='3' style={{ marginTop: 24 }}>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Valor total">Valor total</IonLabel>
                                            <IonInput></IonInput>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='12' size-lg='3'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Número">N° nota de cobrança (Manual)</IonLabel>
                                            <IonInput></IonInput>
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
                            onClick={() => { }}
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
                            onClick={() => { }}
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
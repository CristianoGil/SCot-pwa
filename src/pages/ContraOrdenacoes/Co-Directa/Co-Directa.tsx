import {
    IonCol, IonContent, IonGrid, IonPage, IonRow, IonSegment, IonSegmentButton, IonToolbar, useIonAlert, useIonLoading,
} from '@ionic/react';
import {useState} from 'react';
import './Co-Directa.scss';
import Menu from '../../../components/Menu/Menu';
import React from 'react';
// import ReactPDF, {BlobProvider, pdf, PDFDownloadLink } from '@react-pdf/renderer';
import Intervenientes from '../../../components/Contra-Ordenacoes/Intervenientes/Intervenientes';
import {MenuActionsBtnSave} from '../../../components/Contra-Ordenacoes/MenuActionsBtn';
import DadosInfracao from '../../../components/Contra-Ordenacoes/DadosInfracao/DadosInfracao';
import DadosComplementares from '../../../components/Contra-Ordenacoes/DadosComplementares/DadosComplementares';

import {useHistory} from 'react-router';
import {Contraordenacao} from '../../../api/Contraordenacao';
import {ICoDirecta} from '../../../model/contraordenacao';

const RenderSegment = (props: { segment: string, setCoDirectaData: any }) => {
    if (props.segment === 'intervenientes') {
        return (<Intervenientes setCoDirectaData={props.setCoDirectaData}/>)
    } else if (props.segment === 'dados_da_infracao') {
        return (<DadosInfracao/>)
    } else if (props.segment === 'dados_complemenatares') {
        return (<DadosComplementares setCoDirectaData={props.setCoDirectaData}/>)
    }

    return null;

}

const instanceCoDirecta = new Contraordenacao();

const handlerCoDirectaRequestData = (data: any): ICoDirecta => {
    console.log(data)
    const dataReturn =  {
        id: null,
        tipoContraordenacao: 'directa',
        isTerminada: false,
        isEmitida: false,
        montanteDaCoimaEscolhido: null,
        possuiElementoIdentificacaoArguido: null,
        semVeiculo: false,
        veiculo: {
            id: data?.veiculo.id,
            matricula: data.veiculo.matricula,
            chassi: data.veiculo.chassi,
            ano: data.veiculo.ano,
            categoria: {
                id: data.veiculo.categoria?.id,
                descricao: data.veiculo.categoria?.descricao
            },
            classe: {
                id: data.veiculo.classe?.id,
                descricao: data.veiculo.classe?.descricao
            },
            tipo: {
                id: data.veiculo.tipo?.id,
                descricao: data.veiculo.tipo?.descricao
            },
            subclasse: {
                id: data.veiculo.subclasse?.id,
                descricao: data.veiculo.subclasse?.descricao
            },
            pais: {
                id: data.veiculo.pais?.id,
                descricao: data.veiculo.pais?.descricao
            },
            marca: {
                id: data.veiculo.marca?.id,
                descricao: data.veiculo.marca?.descricao
            },
            modelo: {
                id: data.veiculo.modelo?.id,
                idMarca: data.veiculo.modelo?.idMarca,
                descricao: data.veiculo.modelo?.descricao
            },
            cor: {
                id: data.veiculo.cor?.id,
                descricao: data.veiculo.cor?.descricao
            },
            estadoPolicial: {
                id: data.veiculo.estadoPolicial?.id,
                descricao: data.veiculo.estadoPolicial?.descricao
            },
            isCoimasEmAtraso: undefined,
            coimasEmAtraso: undefined,
            ipo: undefined
        },
        arguido: {
            id: data?.arguido.id,
            nif: data?.arguido.nif,
            nome: data?.arguido.nome,
            dataNascimento: data?.arguido.dataNascimento,
            tipoPessoa: data?.arguido.tipoPessoa,
            isCoimasEmAtraso: data?.arguido.isCoimasEmAtraso,
            coimasEmAtraso: data?.arguido.coimasEmAtraso,
            documentos: data?.arguido.documentos,
            historicoDocumentos: data?.arguido.historicoDocumentos,
            moradas: data?.arguido.moradas,
            historicoMoradas: data?.arguido.historicoMoradas,
            representanteLegal: data?.arguido.representanteLegal
        },
        condutor: null,
        dataInfracao: null,
        numeroAuto: null,
        numeroTalao: null,
        isPresenciadaAutuante: null,
        isConduzidoArguido: null,
        nomeAutuante: null,
        localInfracao: null,
        infracao: null,


        comando: null, //Unidade
        comarca: null, //distrito ou concelho
        entidade: null,
        divisao: null,
        esquadra: null,
        destacamento: null,
        subDestacamento: null,

        //dados complementares
        proprietario: null, //arguido, condutor, outro
        refArquivo: null,
        pagamento: null,
        apreensaoDocumento: null,
        apreensaoVeiculo: null,
        bloqueamentoRemocaoVeiculo: null,
        substituicaoDocumento: null,
        apresentacaoDocumento: null,
        infracoesAdicionais: null,

        //alcool
        alcoolemia: null,

        //assinatura agente
        tipoAssinaturaOpcaoAgente: null,
        tipoAssinaturaFormatoAgente: null,
        chaveMovelAgente: null,
        base64AssinaturaManuscritoAgente: null,
        //assinatura arguido
        arguidoNaoAssinouNotificacao: null,
        tipoAssinaturaOpcaoArguido: null,
        tipoAssinaturaFormatoArguido: null,
        chaveMovelArguido: null,
        base64AssinaturaManuscritoArguido: null,
        //assinatura condutor
        condutorNaoAssinouNotificacao: null,
        tipoAssinaturaOpcaoCondutor: null,
        tipoAssinaturaFormatoCondutor: null,
        chaveMovelCondutor: null,
        base64AssinaturaManuscritoCondutor: null,
        //assinatura testemunha 1
        tipoAssinaturaOpcaoTestemunha1: null,
        tipoAssinaturaFormatoTestemunha1: null,
        chaveMovelTestemunha1: null,
        base64AssinaturaManuscritoTestemunha1: null,
        //assinatura testemunha 2
        tipoAssinaturaOpcaoTestemunha2: null,
        tipoAssinaturaFormatoTestemunha2: null,
        chaveMovelTestemunha2: null,
        base64AssinaturaManuscritoTestemunha2: null,

        base64Assinatura: null,
    }

    return dataReturn
}

const CoDirecta: React.FC = () => {


    const [presentLoad, dismissLoad] = useIonLoading();
    const [presentAlert] = useIonAlert();

    const history = useHistory();
    const [activeSegment, setActiveSegment] = useState('intervenientes');
    const [coDirecta, setCoDirecta] = useState<any>();
    const [coSaved, setCoSaved] = useState<any>({});
    const [isCOSaved, setIsCOSaved] = useState(false);

    const handlerSegment = (e: any) => {
        setActiveSegment(e.detail.value);
    }

    const onSave = (e: any) => {
        presentLoad({
            message: 'A guardar...',
        })


        instanceCoDirecta.guardarCODirectaGeneric(handlerCoDirectaRequestData(coDirecta)).then((responseData) => {

            setCoSaved(responseData);

            presentAlert({
                header: 'Sucesso!',
                message: 'Contraordenação guardada com sucesso!',
                buttons: [
                    {text: 'Fechar'},
                ]
            })
            setIsCOSaved(true);

        }).catch((e) => {
            console.error('Save Co directa: ', e);

            presentAlert({
                header: 'Error!',
                message: 'Houve algum erro ao gravar!',
                buttons: [
                    {text: 'Fechar'},
                ]
            })

        }).finally(() => {
            dismissLoad();
        })

    }

    const onEmit = (e: any) => {
        history.push("/CODirectaSignPDFPreview/" + JSON.stringify({co: coSaved}))
    }

    return (
        <IonPage>
            <Menu  actionsCOBtn={<MenuActionsBtnSave  isCOSaved={isCOSaved} onEmit={(e: any) => {
                onEmit(e);
            }} onSave={(e: any) => {
                onSave(e)
            }}/>}/>
            <IonContent className="contraordenacao" fullscreen={true}>

                <IonGrid id="gridGeral" style={{marginBottom: 40}}>

                    <IonRow style={{marginBottom: 40, marginLeft:10}}>
                        <IonCol size="12">
                            <h1>Registro de contraordenações Directas</h1>
                            <p>Registro de contraordenações Directas</p>
                        </IonCol>
                        <IonCol size-sm="12" size-md="12" size-lg="6">
                            <IonToolbar>
                                <IonSegment slot="primary" onIonChange={handlerSegment} value={activeSegment}>
                                    <IonSegmentButton value="intervenientes">Intervenientes</IonSegmentButton>
                                    <IonSegmentButton value="dados_da_infracao">Dados da Infração</IonSegmentButton>
                                    <IonSegmentButton value="dados_complemenatares">Dados
                                        Complementares</IonSegmentButton>
                                </IonSegment>
                            </IonToolbar>
                        </IonCol>
                    </IonRow>

                </IonGrid>

                <RenderSegment setCoDirectaData={setCoDirecta} segment={activeSegment}/>

            </IonContent>

        </IonPage>
    );
};

export default CoDirecta;

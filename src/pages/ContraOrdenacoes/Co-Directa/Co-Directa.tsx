import {
    IonCol, IonContent, IonGrid, IonPage, IonRow, IonSegment, IonSegmentButton, IonToolbar, useIonAlert, useIonLoading,
} from '@ionic/react';
import { useState } from 'react';
import './Co-Directa.scss';
import Menu from '../../../components/Menu/Menu';
import React from 'react';
// import ReactPDF, {BlobProvider, pdf, PDFDownloadLink } from '@react-pdf/renderer';
import Intervenientes from '../../../components/Contra-Ordenacoes/Intervenientes/Intervenientes';
import { MenuActionsBtnSave } from '../../../components/Contra-Ordenacoes/MenuActionsBtn';
import DadosInfracao from '../../../components/Contra-Ordenacoes/DadosInfracao/DadosInfracao';
import DadosComplementares from '../../../components/Contra-Ordenacoes/DadosComplementares/DadosComplementares';

import { useHistory } from 'react-router';
import { Contraordenacao } from '../../../api/Contraordenacao';
import { ICoDirecta } from '../../../model/contraordenacao';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { getInputValidations_LocalInfraccao, setInputValidation_LocalInfraccao } from '../../../Validations/Contra-Ordenacoes/InputValidationsSlice_LocalInfraccao';
import { getInputValidations_Infraccao, setInputValidation_Infraccao } from '../../../Validations/Contra-Ordenacoes/InputValidationsSlice_Infraccao';

const RenderSegment = (props: { segment: string, setCoDirectaData: any }) => {

    if (props.segment === 'intervenientes') {
        return (<Intervenientes setCoDirectaData={props.setCoDirectaData} />)
    } else if (props.segment === 'dados_da_infracao') {
        return (<DadosInfracao />)
    } else if (props.segment === 'dados_complemenatares') {
        return (<DadosComplementares setCoDirectaData={props.setCoDirectaData} />)
    }

    return null;
}

const instanceCoDirecta = new Contraordenacao();

const _handleArguidoDocumentos = (data: any): any => {
    const docs = [];

    if (data?.documento) {
        const doc = data.documento;
        doc.isTituloConducao = true
        docs.push(doc)
    }

    if (data?.docIdentificacao) {
        const doc = data.docIdentificacao
        doc.isTituloConducao = false
        docs.push(doc)
    }
    return docs.length !== 0 ? docs : null
}

const _handleArguidoMorada = (info: any) => {
    if (!info) return null;

    return [{
        morada: info?.morada,
        numeroPolicia: info?.numeroPolicia,
        pais: info?.paisEmissao,
        fracao: info?.fraccao,
        localidade: info?.localidade,
        codigoPostal: info?.codigoPostal,
        principal: true
    }]
}

const handlerCoDirectaRequestData = (data: any): ICoDirecta => {

    const dataReturn = {
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
            nome: data?.arguido.nome ? data?.arguido.nome : data?.informacoesAdicionais.firmaNome,
            dataNascimento: data?.arguido.dataNascimento ? data?.arguido.dataNascimento : data?.informacoesAdicionais.dataNascimento,
            tipoPessoa: data?.arguido.arguidoVeiculoSingularColetivo,
            isCoimasEmAtraso: data?.arguido.isCoimasEmAtraso,
            coimasEmAtraso: data?.arguido.coimasEmAtraso,
            documentos: data?.arguido.documentos ? data?.arguido.documentos : _handleArguidoDocumentos(data),
            historicoDocumentos: data?.arguido.historicoDocumentos,
            moradas: data?.arguido.moradas ? data?.arguido.moradas : _handleArguidoMorada(data?.informacoesAdicionais),
            historicoMoradas: data?.arguido.historicoMoradas,
            pais: data?.arguido?.paisEmissao,
            representanteLegal: data?.arguido.representanteLegal ? data?.arguido.representanteLegal : data?.informacoesAdicionais.representanteLegal
        },
        condutor: {
            id: data?.arguido.id,
            nif: data?.arguido.nif,
            nome: data?.arguido.nome ? data?.arguido.nome : data?.informacoesAdicionais.firmaNome,
            dataNascimento: data?.arguido.dataNascimento,
            tipoPessoa: data?.arguido.arguidoVeiculoSingularColetivo,
            isCoimasEmAtraso: data?.arguido.isCoimasEmAtraso,
            coimasEmAtraso: data?.arguido.coimasEmAtraso,
            documentos: data?.arguido.documentos ? data?.arguido.documentos : _handleArguidoDocumentos(data?.arguido),
            historicoDocumentos: data?.arguido.historicoDocumentos,
            moradas: data?.arguido.moradas ? data?.arguido.moradas : _handleArguidoMorada(data?.informacoesAdicionais),
            historicoMoradas: data?.arguido.historicoMoradas,
            pais: data?.arguido?.paisEmissao,
            representanteLegal: data?.arguido.representanteLegal ? data?.arguido.representanteLegal : data?.informacoesAdicionais.representanteLegal
        },
        dataInfracao: null,
        numeroAuto: null,
        numeroTalao: null,
        isPresenciadaAutuante: null,
        isConduzidoArguido: data?.veiculo ? data.veiculo.isConduzidoVeiculo : null,
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

    console.log(dataReturn)
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
    const dispatch = useAppDispatch();
    const inputValidations_LocalInfraccao = useAppSelector(getInputValidations_LocalInfraccao);
    const inputValidations_Infraccao = useAppSelector(getInputValidations_Infraccao);

    const handlerSegment = (e: any) => {
        setActiveSegment(e.detail.value);
    }
    const onSave = (e: any) => {

        // valida [Local infraccao]
        dispatch(setInputValidation_LocalInfraccao(
            {
                ...inputValidations_LocalInfraccao,
                distrito_isValid: !inputValidations_LocalInfraccao.distrito_isValid,
                concelho_isValid: !inputValidations_LocalInfraccao.concelho_isValid,
                freguesia_isValid: !inputValidations_LocalInfraccao.freguesia_isValid,
                localidade_isValid: !inputValidations_LocalInfraccao.localidade_isValid,
                tipo_isValid: !inputValidations_LocalInfraccao.tipo_isValid,
                arruamento_isValid: !inputValidations_LocalInfraccao.arruamento_isValid,
            }
        ));
        console.log(inputValidations_LocalInfraccao);

        // valida [infraccao]
        dispatch(setInputValidation_Infraccao(
            {
                ...inputValidations_Infraccao,
                comarca_isValid: !inputValidations_Infraccao.comarca_isValid,
                entidade_isValid: !inputValidations_Infraccao.entidade_isValid,
                tipificacaoInfraccao_isValid: !inputValidations_Infraccao.tipificacaoInfraccao_isValid,
                subtipificacao_isValid: !inputValidations_Infraccao.subtipificacao_isValid,
                descricaoSumaria_isValid: !inputValidations_Infraccao.descricaoSumaria_isValid,
            }
        ));
        console.log(inputValidations_Infraccao);
        //console.log(coDirecta);

        return;

        presentLoad({
            message: 'A guardar...',
        })

        instanceCoDirecta.guardarCODirectaGeneric(handlerCoDirectaRequestData(coDirecta)).then((responseData) => {

            setCoSaved(responseData);

            presentAlert({
                header: 'Sucesso!',
                message: 'Contraordenação guardada com sucesso!',
                buttons: [
                    { text: 'Fechar' },
                ]
            })
            setIsCOSaved(true);

        }).catch((e) => {
            console.error('Save Co directa: ', e);

            presentAlert({
                header: 'Error!',
                message: 'Houve algum erro ao gravar!',
                buttons: [
                    { text: 'Fechar' },
                ]
            })

        }).finally(() => {
            dismissLoad();
        })
    }

    const onEmit = (e: any) => {
        history.push("/CODirectaSignPDFPreview/" + JSON.stringify({ co: coSaved }))
    }

    return (
        <IonPage>
            <Menu actionsCOBtn={<MenuActionsBtnSave isCOSaved={isCOSaved} onEmit={(e: any) => {
                onEmit(e);
            }} onSave={(e: any) => {
                onSave(e)
            }} />} />
            <IonContent className="contraordenacao" fullscreen={true}>

                <IonGrid id="gridGeral" style={{ marginBottom: 40 }}>

                    <IonRow style={{ marginBottom: 40, marginLeft: 10 }}>
                        <IonCol size="12">
                            <h1>Registo de contraordenações Directas</h1>
                            <p>Registo de contraordenações Directas</p>
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

                <RenderSegment setCoDirectaData={setCoDirecta} segment={activeSegment} />

            </IonContent>

        </IonPage>
    );
};

export default CoDirecta;

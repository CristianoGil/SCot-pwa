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
import { schema_localInfraccao, schema_arruamento, schema_concelho, schema_distrito, schema_freguesia, schema_localidade, schema_tipo } from '../../../Validations/Contra-Ordenacoes/LocalInfraccao';
import { schema_comarca, schema_descricaoSumaria, schema_entidade, schema_infraccao, schema_subTipificacaoDaInfraccao, schema_tipificacaoDaInfraccao } from '../../../Validations/Contra-Ordenacoes/Infraccao';

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
            id: data?.veiculo?.id,
            matricula: data?.veiculo?.matricula,
            chassi: data?.veiculo?.chassi,
            ano: data?.veiculo?.ano,
            categoria:data?.veiculo?.categoria,
            classe: data?.veiculo?.classe,
            tipo: data?.veiculo?.tipo,
            subclasse: data?.veiculo?.subclasse,
            pais:data?.veiculo?.pais,
            marca:data?.veiculo?.marca,
            modelo: data?.veiculo?.modelo,
            cor: data?.veiculo?.cor,
            estadoPolicial: data?.veiculo?.estadoPolicial,
            isCoimasEmAtraso: undefined,
            coimasEmAtraso: undefined,
            ipo: undefined
        },
        arguido: {
            id: data?.arguido?.id,
            nif: data?.arguido?.nif,
            nome: data?.arguido?.nome ? data?.arguido?.nome : data?.informacoesAdicionais?.firmaNome,
            dataNascimento: data?.arguido?.dataNascimento ? data?.arguido?.dataNascimento  : data?.informacoesAdicionais?.dataNascimento,
            tipoPessoa: data?.arguido?.arguidoVeiculoSingularColetivo,
            isCoimasEmAtraso: data?.arguido?.isCoimasEmAtraso,
            coimasEmAtraso: data?.arguido?.coimasEmAtraso,
            documentos: data?.arguido?.documentos ? data?.arguido?.documentos : _handleArguidoDocumentos(data),
            historicoDocumentos: data?.arguido?.historicoDocumentos,
            moradas: data?.arguido?.moradas ? data?.arguido?.moradas : _handleArguidoMorada(data?.informacoesAdicionais),
            historicoMoradas: data?.arguido?.historicoMoradas,
            pais: data?.arguido?.paisEmissao,
            representanteLegal: data?.arguido?.representanteLegal ? data?.arguido?.representanteLegal : data?.informacoesAdicionais?.representanteLegal
        },
        condutor: {
            id: data?.arguido?.id,
            nif: data?.arguido?.nif,
            nome: data?.arguido?.nome ? data?.arguido?.nome : data?.informacoesAdicionais?.firmaNome,
            dataNascimento: data?.arguido?.dataNascimento,
            tipoPessoa: data?.arguido?.arguidoVeiculoSingularColetivo,
            isCoimasEmAtraso: data?.arguido?.isCoimasEmAtraso,
            coimasEmAtraso: data?.arguido?.coimasEmAtraso,
            documentos: data?.arguido?.documentos ? data?.arguido?.documentos : _handleArguidoDocumentos(data?.arguido),
            historicoDocumentos: data?.arguido?.historicoDocumentos,
            moradas: data?.arguido?.moradas ? data?.arguido?.moradas : _handleArguidoMorada(data?.informacoesAdicionais),
            historicoMoradas: data?.arguido?.historicoMoradas,
            pais: data?.arguido?.paisEmissao,
            representanteLegal: data?.arguido?.representanteLegal ? data?.arguido?.representanteLegal : data?.informacoesAdicionais?.representanteLegal
        },
        dataInfracao: data?.unidadeData?.dataHoraInfraccao,
        numeroAuto: null,
        numeroTalao: data?.unidadeData?.numTalao,
        isPresenciadaAutuante: data?.infracaoData?.isPresenciadaAutante,
        isConduzidoArguido: data?.veiculo ? data.veiculo.isConduzidoVeiculo : null,
        nomeAutuante: data?.infracaoData?.autuante,
        localInfracao: {
            tipo:data?.localInfracaoData?.tipo,
            distrito:data?.localInfracaoData?.distrito,
            concelho:data?.localInfracaoData?.concelho,
            freguesia:data?.localInfracaoData?.freguesia,
            localidade:data?.localInfracaoData?.localidade,
            arruamento:data?.localInfracaoData?.arruamento,
            numeroPolicia:data?.localInfracaoData?.numeroPolicia,
            zonaBairro:data?.localInfracaoData?.zonaBairro,
        },
        infracao: {
            codigoDgv: data?.infracaoData?.codigoDgv,
            tipificacao: data?.infracaoData?.tipificacao,
            normaInfringida: data?.infracaoData?.normaInfrigida,
            descricaoSumaria: data?.infracaoData?.descricaoSumaria,
            montanteDaCoimaMaxima: data?.infracaoData?.montanteMaximoCoima,
            montanteDaCoimaMinima: data?.infracaoData?.montanteMinimoCoima,
            normaQuePreveContraOrdenacao: data?.infracaoData?.normaQuePreveContraOrdenacao,
            sancaoAcessoria: data?.infracaoData?.sancaoAcessoria,
            normaQuePreveSancaoAcessoria: data?.infracaoData?.normaSancaoAcessoria,
            observacoes:data?.infracaoData?.observacao
        },


        comando: data?.unidadeData?.unidadeImt, //Unidade
        comarca:  data?.infracaoData?.comarca , //distrito ou concelho
        entidade:data?.infracaoData?.entidade,
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

        let localInfracaoData = coDirecta.localInfracaoData;

        let distrito_isValid = schema_distrito.isValidSync(localInfracaoData.distrito)
        let concelho_isValid = schema_concelho.isValidSync(localInfracaoData.concelho)
        let freguesia_isValid = schema_freguesia.isValidSync(localInfracaoData.freguesia)
        let localidade_isValid = schema_localidade.isValidSync(localInfracaoData.localidade)
        let tipo_isValid = schema_tipo.isValidSync(localInfracaoData.tipo)
        let arruamento_isValid = schema_arruamento.isValidSync(localInfracaoData.arruamento)

        let localInfraccao_isValid = schema_localInfraccao.isValidSync({
            distrito: localInfracaoData.distrito,
            concelho: localInfracaoData.concelho,
            freguesia: localInfracaoData.freguesia,
            localidade: localInfracaoData.localidade,
            tipo: localInfracaoData.tipo,
            arruamento: localInfracaoData.arruamento
        });


        dispatch(setInputValidation_LocalInfraccao(
            {
                ...inputValidations_LocalInfraccao,
                distrito_isValid: distrito_isValid,
                concelho_isValid: concelho_isValid,
                freguesia_isValid: freguesia_isValid,
                localidade_isValid: localidade_isValid,
                tipo_isValid: tipo_isValid,
                arruamento_isValid: arruamento_isValid,
            }
        ));

        if (!localInfraccao_isValid) {

            console.error('dados incorrectos no local infraccao!');

            return;
        }

        // valida [infraccao]

        let infracaoData = coDirecta.infracaoData;

        let comarca_isValid = schema_comarca.isValidSync(infracaoData.comarca)
        let entidade_isValid = schema_entidade.isValidSync(infracaoData.entidade)
        let tipificacaoInfraccao_isValid = schema_tipificacaoDaInfraccao.isValidSync(infracaoData.tipificacao)
        let subtipificacao_isValid = schema_subTipificacaoDaInfraccao.isValidSync(infracaoData.subtipoInfracao)
        let descricaoSumaria_isValid = schema_descricaoSumaria.isValidSync(infracaoData.descricaoSumaria)

        let infraccao_isValid = schema_infraccao.isValidSync({
            comarca: infracaoData.comarca,
            entidade: infracaoData.entidade,
            tipificacaoDaInfraccao: infracaoData.tipificacao,
            subTipificacaoDaInfraccao: infracaoData.subtipoInfracao,
            descricaoSumaria: infracaoData.descricaoSumaria,
        });

        dispatch(setInputValidation_Infraccao(
            {
                ...inputValidations_Infraccao,
                comarca_isValid: comarca_isValid,
                entidade_isValid: entidade_isValid,
                tipificacaoInfraccao_isValid: tipificacaoInfraccao_isValid,
                subtipificacao_isValid: subtipificacao_isValid,
                descricaoSumaria_isValid: descricaoSumaria_isValid,
            }
        ));

        if (!infraccao_isValid) {

            console.error('dados incorrectos na infraccao!');

            return;
        }

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
        try {

            const jsonData = encodeURIComponent(JSON.stringify(coSaved));
            history.push(`/CODirectaSignPDFPreview/${jsonData}`)
        } catch (e) {
            console.log('Error stringify json: ', e);
        }

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
                            <h1>Registo de Contraordenações Diretas</h1>
                            <p>Registo de Contraordenações Diretas</p>
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

                 <Intervenientes active={activeSegment === 'intervenientes'} setCoDirectaData={setCoDirecta}/>

                 <DadosInfracao active={activeSegment === 'dados_da_infracao'} setCoDirectaData={setCoDirecta} />)

                 <DadosComplementares active={activeSegment === 'dados_complemenatares'} setCoDirectaData={setCoDirecta}/>


            </IonContent>

        </IonPage>
    );
};

export default CoDirecta;

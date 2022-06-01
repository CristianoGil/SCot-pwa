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
    IonLabel,
    IonPage,
    IonPopover,
    IonRow,
    IonToolbar, useIonAlert, useIonLoading
} from "@ionic/react";
import Menu from "../../../components/Menu/Menu";
import {CoDirectaTemplateMarkup} from '../../../components/Relatorios/templates/CoDirectaTemplate';
import {MenuActionsBtnSignPDF} from '../../../components/Contra-Ordenacoes/MenuActionsBtn';
import {useState} from "react";


import './CO-SignPDFPreview.scss';
import AssinaturaManuscrito from "../../../components/Relatorios/Assinaturas/AssinaturaManuscrito";
import React from "react";
import _ from "underscore";
import AssinaturaArguido from "../../../components/Relatorios/Intervenientes/Arguido";
import AssinaturaTestemunha from "../../../components/Relatorios/Intervenientes/Testemunha";
import AssinaturaAgente from "../../../components/Relatorios/Intervenientes/Agente";
import {base64ToArrayBuffer, blobToBase64, cleanString, downloadFile} from "../../../utils/apex-formatters";
import {generatePDF_HTML, getPDFBase64_HTML} from "../../../app/SignPDF_HTML";
import Assinatura from "../../../api/Assinatura";
import {Document} from 'react-pdf';
import {useParams} from "react-router";
import {handlePDFData} from "../../../app/handlePDFData";
import {ICoDirecta} from "../../../model/contraordenacao";

const assinaturaManuscrito = 'Manuscrito';
const assinaturaQualificada = 'Qualificada';
const assinaturaPapel = 'Papel';


const signPosition = (whoIsSign: string): { posx: number, posy: number } => {
    let posx: number = 0, posy: number = 0;

    if (whoIsSign === 'arguido') {
        posx = 345;
        posy = 295;
    } else if (whoIsSign === 'testemunha1') {
        posx = 60;
        posy = 260;
    } else if (whoIsSign === 'testemunha2') {
        posx = 60;
        posy = 227;
    } else if (whoIsSign === 'agente') {
        posx = 60;
        posy = 320;
    }

    return {posx, posy}
}

const fileName = `co-directa-${(new Date()).toDateString()}.pdf`;
const CODirectaSignPDFPreview: React.FC = () => {

    // @ts-ignore
    let {coData} = useParams();
    let coDataPDF = {};
    if (!_.isEmpty(coData) && _.isString(coData)) {

        try {
            coData = JSON.parse(decodeURIComponent(coData)) as unknown as ICoDirecta;
        } catch (e) {
            console.log("error parse json: ", e)
        }
        // Prepara a imformacao para preencher o pdf
        coDataPDF = handlePDFData(coData);
    }

    const [presentLoad, dismissLoad] = useIonLoading();
    const [presentAlert] = useIonAlert();

    // START: Request Signatures
    const [openPopoverSignatures, setOpenPopoverSignatures] = useState(false);
    const requestSignatures = (e: any) => {
        setOpenPopoverSignatures(true);
    }
    const handlerCleanStateOnPopoverClose = () => {
        setOpenPopoverSignatures(false)
        setWhoIsSigningManuscrito('')
    }

    const getCurrentBlobPDF = async (): Promise<any> => {
        dismissLoad();

        if (PDF_BLOB_SIGNED && _.isEmpty(PDF_BLOB_SIGNED)) {

            return PDF_BLOB_SIGNED;
        } else {
            try {

                await presentLoad({
                    message: 'A baixar o pdf... isto pode demorar!',
                })

                return await getPDFBase64_HTML();

            } catch (e) {
                presentAlert({
                    header: 'Erro!',
                    message: 'Ocorreu um erro ao baixar o pdf. Tente novamente mais tarde e se o problema persistir reinicie o aplicativo',
                    buttons: [
                        {text: 'Fechar'},
                    ]
                })
            } finally {
                dismissLoad();
            }

        }

    }

    // START: Handler tipo assinatura arguido
    const [assinaturaManuscritaArguido, setAssinaturaManuscritaArguido] = useState<string>();
    const [tipoAssinaturaArguido, setTipoAssinaturaArguido] = useState<any>();
    const [signatureManuscrito_arguido, setSignatureManuscrito_arguido] = useState<any>();
    const [arguidoNaoAssinouNotificacao, setArguidoNaoAssinouNotificacao] = useState(false);
    const [isDisablebAssinaturaPapelManuscritoArguido, setIsDisablebAssinaturaPapelManuscritoArguido] = useState(false);
    React.useEffect(() => {

        if (!_.isEmpty(tipoAssinaturaArguido)) {
            const _tipoAssinaturaArguido = JSON.parse(tipoAssinaturaArguido);

            // Assinatura Manuscrito'
            if (cleanString(_tipoAssinaturaArguido.descricao).includes(cleanString(assinaturaManuscrito))) {
                setToggleModalAssinaturaManuscrita(true);
                setWhoIsSigningManuscrito('arguido');
            } else {
                setToggleModalAssinaturaManuscrita(false);
            }
            // Se for assinatura Qualificada bloquea todas as outras assinaturas
            if (cleanString(_tipoAssinaturaArguido.descricao).includes(cleanString(assinaturaQualificada))) {
                setIsDisablebAssinaturaPapelManuscritoAgente(true)
                setIsDisablebAssinaturaPapelManuscritoTestemunha_1(true)
                setIsDisablebAssinaturaPapelManuscritoTestemunha_2(true)
                setIsDisablebAssinaturaPapelManuscritoArguido(false)
            } else {
                setIsDisablebAssinaturaPapelManuscritoAgente(false)
                setIsDisablebAssinaturaPapelManuscritoTestemunha_1(false)
                setIsDisablebAssinaturaPapelManuscritoTestemunha_2(false)
                setIsDisablebAssinaturaPapelManuscritoArguido(false)
            }

            // Se for assinatura Papel abre o form e baixa a CO para ser assinada
            if (cleanString(_tipoAssinaturaArguido.descricao).includes(cleanString(assinaturaPapel))) {
                setToggleInputCardAssinaturaPapel(true);
                setWhoIsSigningPapel('arguido');

                setTimeout(async () => {
                    downloadFile(await getCurrentBlobPDF(), "co-arguido.pdf");
                })


            } else {
                setToggleInputCardAssinaturaPapel(false);
            }

        }

    }, [tipoAssinaturaArguido])


    // START: Handler assinatura Testemunha = 1
    const testemunhaRef_1 = 1;
    const [assinaturaManuscritaTestemunha_1, setAssinaturaManuscritaTestemunha_1] = useState<string>()
    const [tipoAssinaturaTestemunha_1, setTipoAssinaturaTestemunha_1] = useState<any>();
    const [isDisablebAssinaturaPapelManuscritoTestemunha_1, setIsDisablebAssinaturaPapelManuscritoTestemunha_1] = useState(false);
    React.useEffect(() => {

        if (!_.isEmpty(tipoAssinaturaTestemunha_1)) {
            const _tipoAssinaturaTestemunha_1 = JSON.parse(tipoAssinaturaTestemunha_1);

            // Assinatura Manuscrito'
            if (cleanString(_tipoAssinaturaTestemunha_1.descricao).includes(cleanString(assinaturaManuscrito))) {
                setToggleModalAssinaturaManuscrita(true);
                setWhoIsSigningManuscrito('testemunha1');
            } else {
                setToggleModalAssinaturaManuscrita(false);
            }
            // Se for assinatura Qualificada bloquea todas as outras assinaturas
            if (cleanString(_tipoAssinaturaTestemunha_1.descricao).includes(cleanString(assinaturaQualificada))) {
                setIsDisablebAssinaturaPapelManuscritoAgente(true)
                setIsDisablebAssinaturaPapelManuscritoArguido(true)
                setIsDisablebAssinaturaPapelManuscritoTestemunha_1(true)
                setIsDisablebAssinaturaPapelManuscritoTestemunha_2(false)
            } else {
                setIsDisablebAssinaturaPapelManuscritoAgente(false)
                setIsDisablebAssinaturaPapelManuscritoTestemunha_1(false)
                setIsDisablebAssinaturaPapelManuscritoTestemunha_2(false)
                setIsDisablebAssinaturaPapelManuscritoArguido(false)
            }

            // Se for assinatura Papel abre o form e baixa a CO para ser assinada
            if (cleanString(_tipoAssinaturaTestemunha_1.descricao).includes(cleanString(assinaturaPapel))) {

                setToggleInputCardAssinaturaPapel(true);
                setWhoIsSigningPapel('testemunha1');

                setTimeout(async () => {
                    downloadFile(await getCurrentBlobPDF(), "co-testemunha1.pdf");
                })

            } else {
                setToggleInputCardAssinaturaPapel(false);
            }


        }

    }, [tipoAssinaturaTestemunha_1])

    // START: Handler assinatura Testemunha = 2
    const testemunhaRef_2 = 2;
    const [assinaturaManuscritaTestemunha_2, setAssinaturaManuscritaTestemunha_2] = useState<string>()
    const [tipoAssinaturaTestemunha_2, setTipoAssinaturaTestemunha_2] = useState<any>();
    const [isDisablebAssinaturaPapelManuscritoTestemunha_2, setIsDisablebAssinaturaPapelManuscritoTestemunha_2] = useState(false);
    React.useEffect(() => {

        if (!_.isEmpty(tipoAssinaturaTestemunha_2)) {
            const _tipoAssinaturaTestemunha_2 = JSON.parse(tipoAssinaturaTestemunha_2);

            // Assinatura Manuscrito'
            if (cleanString(_tipoAssinaturaTestemunha_2.descricao).includes(cleanString(assinaturaManuscrito))) {
                setToggleModalAssinaturaManuscrita(true);
                setWhoIsSigningManuscrito('testemunha2');
            } else {
                setToggleModalAssinaturaManuscrita(false);
            }

            // Se for assinatura Qualificada bloquea todas as outras assinaturas
            if (cleanString(_tipoAssinaturaTestemunha_2.descricao).includes(cleanString(assinaturaQualificada))) {
                setIsDisablebAssinaturaPapelManuscritoAgente(true)
                setIsDisablebAssinaturaPapelManuscritoArguido(true)
                setIsDisablebAssinaturaPapelManuscritoTestemunha_1(true)
                setIsDisablebAssinaturaPapelManuscritoTestemunha_2(false)
            } else {
                setIsDisablebAssinaturaPapelManuscritoAgente(false)
                setIsDisablebAssinaturaPapelManuscritoTestemunha_1(false)
                setIsDisablebAssinaturaPapelManuscritoTestemunha_2(false)
                setIsDisablebAssinaturaPapelManuscritoArguido(false)
            }

            // Se for assinatura Papel abre o form e baixa a CO para ser assinada
            if (cleanString(_tipoAssinaturaTestemunha_2.descricao).includes(cleanString(assinaturaPapel))) {
                setToggleInputCardAssinaturaPapel(true);
                setWhoIsSigningPapel('testemunha2');

                setTimeout(async () => {
                    downloadFile(await getCurrentBlobPDF(), "co-testemunha2.pdf");
                })

            } else {
                setToggleInputCardAssinaturaPapel(false);
            }

        }

    }, [tipoAssinaturaTestemunha_2])


    // START: Handler assinatura Agente
    const [assinaturaManuscritaAgente, setAssinaturaManuscritaAgente] = useState<string>();
    const [tipoAssinaturaAgente, setTipoAssinaturaAgente] = useState<any>();
    const [isDisablebAssinaturaPapelManuscritoAgente, setIsDisablebAssinaturaPapelManuscritoAgente] = useState(false);
    React.useEffect(() => {
        if (!_.isEmpty(tipoAssinaturaAgente)) {
            const _tipoAssinaturaAgente = JSON.parse(tipoAssinaturaAgente);

            // Assinatura Manuscrito'
            if (cleanString(_tipoAssinaturaAgente.descricao).includes(cleanString(assinaturaManuscrito))) {
                setToggleModalAssinaturaManuscrita(true);
                setWhoIsSigningManuscrito('agente');
            } else {
                setToggleModalAssinaturaManuscrita(false);
            }

            // Se for assinatura Qualificada bloquea todas as outras assinaturas
            if (cleanString(_tipoAssinaturaAgente.descricao).includes(cleanString(assinaturaQualificada))) {
                setIsDisablebAssinaturaPapelManuscritoAgente(false)
                setIsDisablebAssinaturaPapelManuscritoArguido(true)
                setIsDisablebAssinaturaPapelManuscritoTestemunha_1(true)
                setIsDisablebAssinaturaPapelManuscritoTestemunha_2(true)
            } else {
                setIsDisablebAssinaturaPapelManuscritoAgente(false)
                setIsDisablebAssinaturaPapelManuscritoTestemunha_1(false)
                setIsDisablebAssinaturaPapelManuscritoTestemunha_2(false)
                setIsDisablebAssinaturaPapelManuscritoArguido(false)
            }

            // Se for assinatura Papel abre o form e baixa a CO para ser assinada
            if (cleanString(_tipoAssinaturaAgente.descricao).includes(cleanString(assinaturaPapel))) {
                setToggleInputCardAssinaturaPapel(true);
                setWhoIsSigningPapel('agente');

                setTimeout(async () => {
                    downloadFile(await getCurrentBlobPDF(), "co-agente.pdf");
                })

            } else {
                setToggleInputCardAssinaturaPapel(false);
            }


        }
    }, [tipoAssinaturaAgente])


    // START: Assinatura Qualificada
    const [PDF_BLOB_SIGNED, SET_PDF_BLOB_SIGNED] = useState<any>();
    const [assinaturaQualificadaAgente, setAssinaturaQualificadaAgente] = useState<string | ArrayBuffer | undefined>()
    const [assinaturaQualificadaArguido, setAssinaturaQualificadaArguido] = useState<string | ArrayBuffer | undefined>()
    const [assinaturaQualificadaTestemunha_1, setAssinaturaQualificadaTestemunha_1] = useState<string | ArrayBuffer | undefined>()
    const [assinaturaQualificadaTestemunha_2, setAssinaturaQualificadaTestemunha_2] = useState<string | ArrayBuffer | undefined>()
    let chaveMovelAgente: string | undefined;
    let chaveMovelArguido: string | undefined;
    let chaveMovelTestemunha_1: string | undefined;
    let chaveMovelTestemunha_2: string | undefined;
    let formatoAssinaturaQualificadaAgente: string;
    let formatoAssinaturaQualificadaArguido;
    let formatoAssinaturaQualificadaTestemunha_1: string;
    let formatoAssinaturaQualificadaTestemunha_2: string;
    const handlerAssinaturaQualificada = async (formatoAssinaturaQualificada: any, whoIsSigningQualificada: string, chaveDigitalPhoneNumber?: string) => {
        dismissLoad();
        if (!_.isEmpty(formatoAssinaturaQualificada)) {
            const _data = JSON.parse(formatoAssinaturaQualificada);

            if (_.isObject(_data)) {
                const formatoAssinatura = cleanString(_data.descricao);

                await presentLoad({
                    message: 'A assinar... isto pode demorar!',
                })

                try {
                    let responseData;
                    let base64PDF = "";
                    if (PDF_BLOB_SIGNED && !_.isEmpty(PDF_BLOB_SIGNED)) {
                        base64PDF = PDF_BLOB_SIGNED
                    } else {
                        base64PDF = await getPDFBase64_HTML();
                    }

                    const assinaturaInstance = new Assinatura(base64PDF.replace(/^data:application\/[a-z]+;base64,/, ""));
                    const pos = signPosition(whoIsSigningQualificada);

                    // Chave Móvel Digital
                    if (formatoAssinatura === cleanString('Chave Móvel Digital')) {
                        responseData = await assinaturaInstance.cmd_sign(pos.posx, pos.posy, undefined, undefined, escape(`${chaveDigitalPhoneNumber}`));
                    } // Cartão Cidadão
                    else if (formatoAssinatura === cleanString('Cartão Cidadão')) {
                        responseData = await assinaturaInstance.cc_sign(pos.posx, pos.posy,);
                    } // Cartão CEGER
                    else if (formatoAssinatura === cleanString('Cartão CEGER')) {
                        responseData = await assinaturaInstance.ceger_sign(pos.posx, pos.posy,);
                    }

                    if (responseData) {
                        const _signedPdf = responseData.pdf;
                        if (whoIsSigningQualificada === 'arguido') {
                            chaveMovelArguido = chaveDigitalPhoneNumber;
                            formatoAssinaturaQualificadaArguido = formatoAssinatura;
                            setAssinaturaQualificadaArguido(_signedPdf);
                        } else if (whoIsSigningQualificada === 'testemunha1') {
                            chaveMovelTestemunha_1 = chaveDigitalPhoneNumber;
                            formatoAssinaturaQualificadaTestemunha_1 = formatoAssinatura;
                            setAssinaturaQualificadaTestemunha_1(_signedPdf)
                        } else if (whoIsSigningQualificada === 'testemunha2') {
                            chaveMovelTestemunha_2 = chaveDigitalPhoneNumber;
                            formatoAssinaturaQualificadaTestemunha_2 = formatoAssinatura;
                            setAssinaturaQualificadaTestemunha_2(_signedPdf)
                        } else if (whoIsSigningQualificada === 'agente') {
                            chaveMovelAgente = chaveDigitalPhoneNumber;
                            formatoAssinaturaQualificadaAgente = formatoAssinatura;
                            setAssinaturaQualificadaAgente(_signedPdf);
                        }

                        SET_PDF_BLOB_SIGNED(_signedPdf);
                        dismissLoad();
                    } else {
                        throw new Error("Unknow error")
                    }


                } catch (e: any) {
                    presentAlert({
                        header: 'Erro!',
                        subHeader: e.message,
                        message: 'Ocorreu um erro ao assinar. Tente novamente mais tarde e se o problema persistir reinicie o aplicativo.',
                        buttons: [
                            {text: 'Fechar'},
                        ]
                    })
                    console.log(e)
                } finally {
                    dismissLoad();
                }


            }
        } else {
            presentAlert({
                header: 'Erro!',
                message: 'Ocorreu um erro ao assinar. Tente novamente mais tarde e se o problema persistir reinicie o aplicativo',
                buttons: [
                    {text: 'Fechar'},
                ]
            })
        }
    }


    // START: Assinatura Manuscrita
    const [toggleModalAssinaturaManuscrita, setToggleModalAssinaturaManuscrita] = useState(false);
    const [whoIsSigningManuscrito, setWhoIsSigningManuscrito] = useState<string>();
    const signedAssinaturaManuscrita = (value: string) => {
        if (value) {
            if (whoIsSigningManuscrito === 'arguido') {
                setAssinaturaManuscritaArguido(value)
            } else if (whoIsSigningManuscrito === 'testemunha1') {
                setAssinaturaManuscritaTestemunha_1(value)
            } else if (whoIsSigningManuscrito === 'testemunha2') {
                setAssinaturaManuscritaTestemunha_2(value)
            } else if (whoIsSigningManuscrito === 'agente') {
                setAssinaturaManuscritaAgente(value)
            }

        }
    };

    // START: Assinatura Papel
    const [toggleInputCardAssinaturaPapel, setToggleInputCardAssinaturaPapel] = useState(false);
    const [whoIsSigningPapel, setWhoIsSigningPapel] = useState<string>();
    const [assinaturaPapelArguido, setAssinaturaPapelArguido] = useState<any>();
    const [assinaturaPapelTestemunha_1, setAssinaturaPapelTestemunha_1] = useState<any>();
    const [assinaturaPapelTestemunha_2, setAssinaturaPapelTestemunha_2] = useState<any>();
    const [assinaturaPapelAgente, setAssinaturaPapelAgente] = useState<any>();

    const uploadFileCO = async () => {
        dismissLoad();
        const inputFile = document.getElementById('fileUploadCO');
        if (inputFile) {
            // @ts-ignore
            const file = inputFile.files[0];
            if (file) {
                await presentLoad({
                    message: 'A carregar... isto pode demorar!',
                })
                try {
                    console.log('file: ', file)
                    const base64PDF = await blobToBase64(file);
                    console.log('base64PDF: ', base64PDF)
                    if (base64PDF) {
                        if (whoIsSigningPapel === 'arguido') {
                            setAssinaturaPapelArguido(base64PDF)
                        } else if (whoIsSigningPapel === 'testemunha1') {
                            setAssinaturaPapelTestemunha_1(base64PDF)
                        } else if (whoIsSigningPapel === 'testemunha2') {
                            setAssinaturaPapelTestemunha_2(base64PDF)
                        } else if (whoIsSigningPapel === 'agente') {
                            setAssinaturaPapelAgente(base64PDF)
                        }

                        setToggleInputCardAssinaturaPapel(false)
                        SET_PDF_BLOB_SIGNED(`${base64PDF}`.replace(/^data:application\/[a-z]+;base64,/, ""))
                    }

                } catch (e) {
                    presentAlert({
                        header: 'Erro!',
                        message: 'Ocorreu um erro ao carregar o ficheiro. Tente novamente mais tarde e se o problema persistir reinicie o aplicativo',
                        buttons: [
                            {text: 'Fechar'},
                        ]
                    })
                } finally {
                    dismissLoad();
                }


            } else {
                presentAlert({
                    header: 'Erro!',
                    message: 'Ocorreu um erro ao carregar o ficheiro. Tente novamente mais tarde e se o problema persistir reinicie o aplicativo',
                    buttons: [
                        {text: 'Fechar'},
                    ]
                })
            }

        }
    }

    const onPrint = async (e: any) => {


        if (PDF_BLOB_SIGNED && !_.isEmpty(PDF_BLOB_SIGNED)) {
            downloadFile(`data:application/pdf;base64,${PDF_BLOB_SIGNED}`, fileName);
        } else {
            try {

                await presentLoad({
                    message: 'A imprimir... isto pode demorar!',
                })

                const pdf = await generatePDF_HTML();
                pdf.save(fileName);
            } catch (e) {
                presentAlert({
                    header: 'Erro!',
                    message: 'Ocorreu um erro ao assinar a contraordenação. Tente novamente mais tarde e se o problema persistir reinicie o aplicativo',
                    buttons: [
                        {text: 'Fechar'},
                    ]
                })
            } finally {
                dismissLoad();
            }
        }


    }

    const onSave = async (e: any) => {

        if (!_.isObject(coData)) {
            await presentAlert({
                header: 'Erro!',
                message: 'Algo deu errado',
                buttons: [
                    {text: 'Compreendi'},
                ]
            })

            return
        }

        if (_.isEmpty(PDF_BLOB_SIGNED)) {
            // Em caso em que a assinatura foi manuscrita e conter pelo menos a assinatura
            if (assinaturaManuscritaAgente) {

                await presentLoad({
                    message: 'A gerar o PDF... isto pode demorar!',
                })

                try {

                    const base64PDF = await getPDFBase64_HTML();
                    SET_PDF_BLOB_SIGNED(base64PDF.replace(/^data:application\/[a-z]+;base64,/, ""));

                } catch (e: any) {
                    presentAlert({
                        header: 'Erro!',
                        subHeader: e.message,
                        message: 'Ocorreu um erro ao gerar o PDF. Tente novamente mais tarde e se o problema persistir reinicie o aplicativo.',
                        buttons: [
                            {text: 'Fechar'},
                        ]
                    })
                    console.log(e)
                } finally {
                    dismissLoad();
                }

            } else {
                presentAlert({
                    header: 'Erro!',
                    message: 'A CO deve conter pelo menos a assinatura do agente',
                    buttons: [
                        {text: 'Fechar'},
                    ]
                })

                return
            }

        }


        await presentLoad({
            message: 'A Guardar a CO...!',
        })

        //assinatura agente
        if (tipoAssinaturaAgente) {
            coData.tipoAssinaturaOpcaoAgente = tipoAssinaturaAgente
        }
        if (formatoAssinaturaQualificadaAgente) {
            coData.tipoAssinaturaFormatoAgente = formatoAssinaturaQualificadaAgente
        }

        if (chaveMovelAgente) {
            coData.chaveMovelAgente = chaveMovelAgente
        }

        if (assinaturaManuscritaAgente) {
            coData.base64AssinaturaManuscritoAgente = assinaturaManuscritaAgente
        }


        // assinatura arguido
        coData.arguidoNaoAssinouNotificacao = arguidoNaoAssinouNotificacao

        if (tipoAssinaturaArguido) {
            coData.tipoAssinaturaOpcaoArguido = tipoAssinaturaArguido
        }

        if (chaveMovelArguido) {
            coData.chaveMovelArguido = chaveMovelArguido
        }

        if (assinaturaPapelArguido) {
            coData.base64AssinaturaManuscritoArguido = assinaturaPapelArguido
        }


        //assinatura testemunha 1

        if (tipoAssinaturaTestemunha_1) {
            coData.tipoAssinaturaOpcaoTestemunha1 = tipoAssinaturaTestemunha_1
        }

        if (chaveMovelTestemunha_1) {
            coData.chaveMovelTestemunha1 = chaveMovelTestemunha_1
        }

        if (formatoAssinaturaQualificadaTestemunha_1) {
            coData.tipoAssinaturaFormatoTestemunha1 = formatoAssinaturaQualificadaTestemunha_1
        }

        //assinatura testemunha 2

        if (tipoAssinaturaTestemunha_2) {
            coData.tipoAssinaturaOpcaoTestemunha2 = tipoAssinaturaTestemunha_2
        }

        if (chaveMovelTestemunha_2) {
            coData.chaveMovelTestemunha2 = chaveMovelTestemunha_2
        }

        if (formatoAssinaturaQualificadaTestemunha_2) {
            coData.tipoAssinaturaFormatoTestemunha2 = formatoAssinaturaQualificadaTestemunha_2
        }

        coData.base64Assinatura = PDF_BLOB_SIGNED;


        console.log("coData: ", coData)


        setTimeout(()=>{
            dismissLoad();
        },1000)
    }
    return (
        <IonPage>
            <Menu actionsCOBtn={<MenuActionsBtnSignPDF onSignPdf={(e: any) => {
                requestSignatures(e)
            }} onPrint={(e: any) => {
                onPrint(e)
            }} onSaveSignedPDF={onSave}/>}/>

            <a id={"downloadPDFAnchor"} href="" download="" style={{
                position: "fixed",
                left: "-50%",
                opacity: 0
            }}/>


            <IonContent id={"CODirectaSignPDFPreview"} className="CODirectaSignPDFPreview" fullscreen={true}>
                {(PDF_BLOB_SIGNED && !_.isEmpty(PDF_BLOB_SIGNED) ?


                    <object data={`data:application/pdf;base64,${PDF_BLOB_SIGNED}`}
                            style={{overflow: "hidden", minHeight: "100%", width: "100vw"}}></object>
                    :
                    <CoDirectaTemplateMarkup coData={coDataPDF}
                                             assinaturaArguido={assinaturaManuscritaArguido}
                                             assinaturaTestemunha_1={assinaturaManuscritaTestemunha_1}
                                             assinaturaTestemunha_2={assinaturaManuscritaTestemunha_2}
                                             assinaturaAgente={assinaturaManuscritaAgente}/>)

                }
            </IonContent>

            {/*START: Request Signatures*/}
            <IonPopover
                isOpen={openPopoverSignatures}
                className="menu popoverSign"
                showBackdrop={true}
                backdropDismiss={false}
                onDidDismiss={() => {
                    handlerCleanStateOnPopoverClose();
                }}>

                <IonHeader className="ion-no-border">
                    <IonToolbar color='transparent'>
                        <IonLabel slot='start'>
                            <h1>
                                Recolha de assinaturas
                            </h1>
                        </IonLabel>

                        <IonButton className="btn-close" fill="outline" color="medium" slot="end" onClick={() => {
                            setOpenPopoverSignatures(false);

                        }}>
                            Terminar
                        </IonButton>

                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    {/* Arguido assinatura*/}
                    <AssinaturaArguido assinaturaManuscritaArguido={assinaturaManuscritaArguido}
                                       setAssinaturaManuscritaArguido={setAssinaturaManuscritaArguido}
                                       setTipoAssinaturaArguido={setTipoAssinaturaArguido}
                                       tipoAssinaturaArguido={tipoAssinaturaArguido}
                                       arguidoNaoAssinouNotificacao={arguidoNaoAssinouNotificacao}
                                       setArguidoNaoAssinouNotificacao={setArguidoNaoAssinouNotificacao}
                                       assinaturaQualificadaArguido={assinaturaQualificadaArguido}
                                       setAssinaturaQualificadaArguido={setAssinaturaQualificadaArguido}
                                       isDisablebAssinaturaPapelManuscrito={isDisablebAssinaturaPapelManuscritoArguido}
                                       assinaturaPapelArguido={assinaturaPapelArguido}
                                       setAssinaturaPapelArguido={setAssinaturaPapelArguido}
                                       handlerSignPDF={handlerAssinaturaQualificada}
                    />
                    {/*  Arguido assinatura */}

                    {/* Testemunha 1 assinatura*/}
                    <AssinaturaTestemunha setAssinaturaManuscritaTestemunha={setAssinaturaManuscritaTestemunha_1}
                                          assinaturaManuscritaTestemunha={assinaturaManuscritaTestemunha_1}
                                          setTipoAssinaturaTestemunha={setTipoAssinaturaTestemunha_1}
                                          tipoAssinaturaTestemunha={tipoAssinaturaTestemunha_1}
                                          assinaturaQualificadaTestemunha={assinaturaQualificadaTestemunha_1}
                                          setAssinaturaQualificadaTestemunha={setAssinaturaQualificadaTestemunha_1}
                                          testemunhaRef={testemunhaRef_1}
                                          isDisablebAssinaturaPapelManuscrito={isDisablebAssinaturaPapelManuscritoTestemunha_1}
                                          setAssinaturaPapelTestemunha={setAssinaturaPapelTestemunha_1}
                                          assinaturaPapelTestemunha={assinaturaPapelTestemunha_1}
                                          handlerSignPDF={handlerAssinaturaQualificada}
                    />
                    {/* Testemunha 1 assinatura*/}

                    {/* Testemunha 2 assinatura*/}
                    <AssinaturaTestemunha setAssinaturaManuscritaTestemunha={setAssinaturaManuscritaTestemunha_2}
                                          assinaturaManuscritaTestemunha={assinaturaManuscritaTestemunha_2}
                                          setTipoAssinaturaTestemunha={setTipoAssinaturaTestemunha_2}
                                          tipoAssinaturaTestemunha={tipoAssinaturaTestemunha_2}
                                          assinaturaQualificadaTestemunha={assinaturaQualificadaTestemunha_2}
                                          setAssinaturaQualificadaTestemunha={setAssinaturaQualificadaTestemunha_2}
                                          testemunhaRef={testemunhaRef_2}
                                          isDisablebAssinaturaPapelManuscrito={isDisablebAssinaturaPapelManuscritoTestemunha_2}
                                          setAssinaturaPapelTestemunha={setAssinaturaPapelTestemunha_2}
                                          assinaturaPapelTestemunha={assinaturaPapelTestemunha_2}
                                          handlerSignPDF={handlerAssinaturaQualificada}
                    />
                    {/* Testemunha 2 assinatura*/}

                    {/*O AGENTE*/}
                    <AssinaturaAgente assinaturaManuscritaAgente={assinaturaManuscritaAgente}
                                      setAssinaturaManuscritaAgente={setAssinaturaManuscritaAgente}
                                      assinaturaQualificadaAgente={assinaturaQualificadaAgente}
                                      setAssinaturaQualificadaAgente={setAssinaturaQualificadaAgente}
                                      setTipoAssinaturaAgente={setTipoAssinaturaAgente}
                                      tipoAssinaturaAgente={tipoAssinaturaAgente}
                                      isDisablebAssinaturaPapelManuscrito={isDisablebAssinaturaPapelManuscritoAgente}
                                      setAssinaturaPapelAgente={setAssinaturaPapelAgente}
                                      assinaturaPapelAgente={assinaturaPapelAgente}
                                      handlerSignPDF={handlerAssinaturaQualificada}

                    />
                    {/*O AGENTE*/}

                    {/*Input papel*/}
                    {toggleInputCardAssinaturaPapel ?
                        <IonCard style={{margin: 30}}>
                            <IonCardHeader>
                                <IonCardTitle style={{paddingLeft: 15}}> Carregar o registo da CO
                                    assinado </IonCardTitle>
                            </IonCardHeader>

                            <IonCardContent style={{paddingTop: 0}}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size-sm="12" size-md="6" size-lg="4">
                                            <input type="file" id={"fileUploadCO"} onChange={(file) => {
                                                console.log(file)
                                            }}/>
                                        </IonCol>
                                        <IonCol size-sm="12" size-md="4" size-lg="2">
                                            <IonButton disabled={false} className="btn-close" fill="solid"
                                                       color="primary" onClick={() => {
                                                uploadFileCO()
                                            }}> Carregar </IonButton>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCardContent>
                        </IonCard>
                        :
                        ''}


                    {/*Input papel*/}
                </IonContent>

            </IonPopover>
            {/*END: Request Signatures*/}

            {/*START: ASSINATURA MANUSCRITA*/}
            <AssinaturaManuscrito isOpen={toggleModalAssinaturaManuscrita}
                                  setIsOpen={setToggleModalAssinaturaManuscrita} onClose={signedAssinaturaManuscrita}/>
            {/*END: ASSINATURA MANUSCRITA*/}
        </IonPage>
    )
}

export default CODirectaSignPDFPreview;

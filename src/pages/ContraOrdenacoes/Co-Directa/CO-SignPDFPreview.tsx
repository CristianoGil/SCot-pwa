import {
    IonButton,
    IonContent,
    IonHeader,
    IonLabel,
    IonPage,
    IonPopover,
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
import {base64ToArrayBuffer, cleanString, downloadFile} from "../../../utils/apex-formatters";
import {generatePDF_HTML, getPDFBase64_HTML} from "../../../app/SignPDF_HTML";
import Assinatura from "../../../api/Assinatura";
import {Document} from 'react-pdf';

const assinaturaManuscrito = 'Manuscrito';
const assinaturaQualificada = 'Qualificada';
const assinaturaPapel = 'Papel';


interface IProps {
    data?: any
}

const onSourceError_PDF = (error: any) => {
    console.log(error)
}

const CODirectaSignPDFPreview: React.FC<IProps> = (props) => {


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

    // START: Handler tipo assinatura arguido
    const [assinaturaManuscritaArguido, setAssinaturaManuscritaArguido] = useState<string>();
    const [tipoAssinaturaArguido, setTipoAssinaturaArguido] = useState<any>();
    const [signatureManuscrito_arguido, setSignatureManuscrito_arguido] = useState<any>();
    const [arguidoNaoAssinouNotificacao, setArguidoNaoAssinouNotificacao] = useState(false);
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

        }

    }, [tipoAssinaturaArguido])


    // START: Handler assinatura Testemunha = 1
    const testemunhaRef_1 = 1;
    const [assinaturaManuscritaTestemunha_1, setAssinaturaManuscritaTestemunha_1] = useState<string>()
    const [tipoAssinaturaTestemunha_1, setTipoAssinaturaTestemunha_1] = useState<any>();
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

        }

    }, [tipoAssinaturaTestemunha_1])

    // START: Handler assinatura Testemunha = 2
    const testemunhaRef_2 = 2;
    const [assinaturaManuscritaTestemunha_2, setAssinaturaManuscritaTestemunha_2] = useState<string>()
    const [tipoAssinaturaTestemunha_2, setTipoAssinaturaTestemunha_2] = useState<any>();
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

        }

    }, [tipoAssinaturaTestemunha_2])


    // START: Handler assinatura Agente
    const [assinaturaManuscritaAgente, setAssinaturaManuscritaAgente] = useState<string>();
    const [tipoAssinaturaAgente, setTipoAssinaturaAgente] = useState<any>();

    const handlerAssinaturaQualificada = async (formatoAssinaturaQualificada: any, whoIsSigningQualificada: string, chaveDigitalPhoneNumber?: number) => {
        if (!_.isEmpty(formatoAssinaturaQualificada)) {
            const _data = JSON.parse(formatoAssinaturaQualificada);

            if (_.isObject(_data)) {
                const formatoAssinatura = cleanString(_data.descricao);

                presentLoad({
                    message: 'A assinar... isto pode demorar!',
                })

                try {
                    let responseData;
                    const base64PDF = await getPDFBase64_HTML();
                    const assinaturaInstance = new Assinatura(base64PDF.replace(/^data:application\/[a-z]+;base64,/, ""));

                    // Chave Móvel Digital
                    if (formatoAssinatura === cleanString('Chave Móvel Digital')) {
                        responseData = await assinaturaInstance.cmd_sign(undefined, undefined, undefined, undefined, escape(`${chaveDigitalPhoneNumber}`));
                    } // Cartão Cidadão
                    else if (formatoAssinatura === cleanString('Cartão Cidadão')) {
                        responseData = await assinaturaInstance.cc_sign();
                    } // Cartão CEGER
                    else if (formatoAssinatura === cleanString('Cartão CEGER')) {
                        responseData = await assinaturaInstance.ceger_sign();
                    }

                    if (responseData) {
                        const _signedPdf = responseData.pdf;
                        if (whoIsSigningQualificada === 'arguido') {
                            setAssinaturaQualificadaArguido(_signedPdf);
                        } else if (whoIsSigningQualificada === 'testemunha1') {
                            setAssinaturaQualificadaTestemunha_1(_signedPdf)
                        } else if (whoIsSigningQualificada === 'testemunha2') {
                            setAssinaturaQualificadaTestemunha_2(_signedPdf)
                        } else if (whoIsSigningQualificada === 'agente') {
                            setAssinaturaQualificadaAgente(_signedPdf);
                        }


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

        }
    }, [tipoAssinaturaAgente])


    // START: Assinatura Qualificada
    const [PDF_BLOB_SIGNED, SET_PDF_BLOB_SIGNED] = useState<any>();
    const [assinaturaQualificadaAgente, setAssinaturaQualificadaAgente] = useState<string | ArrayBuffer | undefined>()
    const [assinaturaQualificadaArguido, setAssinaturaQualificadaArguido] = useState<string | ArrayBuffer | undefined>()
    const [assinaturaQualificadaTestemunha_1, setAssinaturaQualificadaTestemunha_1] = useState<string | ArrayBuffer | undefined>()
    const [assinaturaQualificadaTestemunha_2, setAssinaturaQualificadaTestemunha_2] = useState<string | ArrayBuffer | undefined>()


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


    const onPrint = async (e: any) => {
        const fileName = `co-directa-[name]-${(new Date()).toDateString()}.pdf`;


        if (PDF_BLOB_SIGNED && !_.isEmpty(PDF_BLOB_SIGNED)) {
            console.log('FInd it')
            downloadFile(PDF_BLOB_SIGNED, fileName);
            console.log(PDF_BLOB_SIGNED)
        } else {
            try {

                presentLoad({
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

    return (
        <IonPage>
            <Menu actionsCOBtn={<MenuActionsBtnSignPDF onSignPdf={(e: any) => {
                requestSignatures(e)
            }} onPrint={(e: any) => {
                onPrint(e)
            }}/>}/>
            <IonContent id={"CODirectaSignPDFPreview"} className="CODirectaSignPDFPreview" fullscreen={true}>
                {(PDF_BLOB_SIGNED && !_.isEmpty(PDF_BLOB_SIGNED) ?


                    <object data={`data:application/pdf;base64,${PDF_BLOB_SIGNED}`}
                            style={{overflow: "hidden", minHeight: "100%", width: "100vw"}}></object>
                    :
                    <CoDirectaTemplateMarkup assinaturaArguido={assinaturaManuscritaArguido}
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
                            Fechar
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
                                      handlerSignPDF={handlerAssinaturaQualificada}

                    />
                    {/*O AGENTE*/}
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

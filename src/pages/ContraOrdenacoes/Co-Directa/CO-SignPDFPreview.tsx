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
import jsPDF from "jspdf";
import {IteratorArray} from "../../../common/iterator";
import {blobToBase64, cleanString, createCanvas} from "../../../utils/apex-formatters";
import {useState} from "react";


import './CO-SignPDFPreview.scss';
import AssinaturaManuscrito from "../../../components/Relatorios/Assinaturas/AssinaturaManuscrito";
import React from "react";
import _ from "underscore";
import AssinaturaArguido from "../../../components/Relatorios/Intervenientes/Arguido";
import AssinaturaTestemunha from "../../../components/Relatorios/Intervenientes/Testemunha";
import AssinaturaAgente from "../../../components/Relatorios/Intervenientes/Agente";


const assinaturaManuscrito = 'Assinatura Manuscrito';

const generatePDF = (e: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true
        });

        const JR_PAGE_ANCHOR_0_1 = document.getElementById('CO_DIRECTA_JR_PAGE_ANCHOR_0_1');
        const JR_PAGE_ANCHOR_0_2 = document.getElementById('CO_DIRECTA_JR_PAGE_ANCHOR_0_2');
        const JR_PAGE_ANCHOR_0_3 = document.getElementById('CO_DIRECTA_JR_PAGE_ANCHOR_0_3');


        const iteratorPages: any = new IteratorArray([JR_PAGE_ANCHOR_0_1, JR_PAGE_ANCHOR_0_2, JR_PAGE_ANCHOR_0_3]);

        let pagesNumber = 3;
        const _funcIterable = async (): Promise<void> => {

            const dataValue: IteratorResult<any> = iteratorPages.next();
            const isDone: boolean | undefined = dataValue.done;
            const page = dataValue.value;

            if (!isDone) {

                pagesNumber--;

                try {

                    const width = pdf.internal.pageSize.getWidth();
                    const height = pdf.internal.pageSize.getHeight();

                    const canvas = await createCanvas(page);

                    const imgData = canvas.toDataURL('image/jpeg');
                    pdf.addImage(imgData, 'JPEG', 0, 0, width, height);


                    if (pagesNumber >= 1) {
                        pdf.addPage('a4');
                    }
                } catch (e) {
                    console.error("createCanvas: ", e, page);
                    reject(e)
                } finally {
                    setTimeout(_funcIterable,)
                }

            } else {
                resolve(pdf)
            }
        }

        _funcIterable();
        // @ts-ignore
    })


}


interface IProps {
    data?: any
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
    const [tipoAssinaturaAgente, setTipoAssinaturaAgente] = useState<any>()
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
    }

    // START: Sign on PDF
    const signPDF = async (e: any) => {
        presentLoad({
            message: 'A assinar... isto pode demorar!',
        })
        try {
            const pdf = await generatePDF(e);
            const blobPDF = await blobToBase64(pdf.output('blob'));

            console.log('blobPDF base64: ', blobPDF);

        } catch (e) {
            presentAlert({
                header: 'Erro!',
                message: 'Ocorreu um erro ao assinar. Tente novamente mais tarde e se o problema persistir reinicie o aplicativo',
                buttons: [
                    {text: 'Fechar'},
                ]
            })
        } finally {
            dismissLoad();
        }
    }

    const onPrint = async (e: any) => {
        presentLoad({
            message: 'A imprimir... isto pode demorar!',
        })
        try {
            const pdf = await generatePDF(e);
            pdf.save(`co-directa-[name]-${(new Date()).toDateString()}.pdf`);
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


    return (
        <IonPage>
            <Menu actionsCOBtn={<MenuActionsBtnSignPDF onSignPdf={(e: any) => {
                requestSignatures(e)
            }} onPrint={(e: any) => {
                onPrint(e)
            }}/>}/>
            <IonContent id={"CODirectaSignPDFPreview"} className="CODirectaSignPDFPreview" fullscreen={true}>
                <CoDirectaTemplateMarkup assinaturaArguido={assinaturaManuscritaArguido}
                                         assinaturaTestemunha_1={assinaturaManuscritaTestemunha_1}
                                         assinaturaTestemunha_2={assinaturaManuscritaTestemunha_2}
                                         assinaturaAgente={assinaturaManuscritaAgente}
                />
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
                    />
                    {/*  Arguido assinatura */}

                    {/* Testemunha 1 assinatura*/}
                    <AssinaturaTestemunha setAssinaturaManuscritaTestemunha={setAssinaturaManuscritaTestemunha_1}
                                          assinaturaManuscritaTestemunha={assinaturaManuscritaTestemunha_1}
                                          setTipoAssinaturaTestemunha={setTipoAssinaturaTestemunha_1}
                                          tipoAssinaturaTestemunha={tipoAssinaturaTestemunha_1}
                                          testemunhaRef={testemunhaRef_1}/>
                    {/* Testemunha 1 assinatura*/}

                    {/* Testemunha 2 assinatura*/}
                    <AssinaturaTestemunha setAssinaturaManuscritaTestemunha={setAssinaturaManuscritaTestemunha_2}
                                          assinaturaManuscritaTestemunha={assinaturaManuscritaTestemunha_2}
                                          setTipoAssinaturaTestemunha={setTipoAssinaturaTestemunha_2}
                                          tipoAssinaturaTestemunha={tipoAssinaturaTestemunha_2}
                                          testemunhaRef={testemunhaRef_2}/>
                    {/* Testemunha 2 assinatura*/}

                    {/*O AGENTE*/}
                    <AssinaturaAgente assinaturaManuscritaAgente={assinaturaManuscritaAgente}
                                      setAssinaturaManuscritaAgente={setAssinaturaManuscritaAgente}
                                      setTipoAssinaturaAgente={setTipoAssinaturaAgente}
                                      tipoAssinaturaAgente={tipoAssinaturaAgente}/>
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

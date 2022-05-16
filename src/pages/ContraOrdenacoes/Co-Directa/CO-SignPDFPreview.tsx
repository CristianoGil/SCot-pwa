import {
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle, IonCheckbox, IonCol, IonContent,
    IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonModal, IonPage, IonPopover, IonRow,
    IonSelect, IonSelectOption, IonToolbar, useIonAlert, useIonLoading
} from "@ionic/react";
import Menu from "../../../components/Menu/Menu";
import {CoDirectaTemplateMarkup} from '../../../components/Relatorios/templates/CoDirectaTemplate';
import {MenuActionsBtnSignPDF} from '../../../components/Contra-Ordenacoes/MenuActionsBtn';
import jsPDF from "jspdf";
import {IteratorArray} from "../../../common/iterator";
import {blobToBase64, cleanString, createCanvas} from "../../../utils/apex-formatters";
import {useHistory} from "react-router";
import CardListItem from "../../../components/CardListItem";
import {useState} from "react";


import './CO-SignPDFPreview.scss';
import AssinaturaManuscrito from "../../../components/Relatorios/Assinaturas/AssinaturaManuscrito";
import TipoAssinaturas from "../../../components/Combos/TipoAssinaturas";
import React from "react";
import _ from "underscore";
import {alertCircle, alertOutline, checkmarkCircle} from "ionicons/icons";


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
    const history = useHistory();

    const [signatureManuscrito_arguido, setSignatureManuscrito_arguido] = useState<any>();
    const [arguidoNaoAssinouNotificacao, setArguidoNaoAssinouNotificacao] = useState(false);


    // START: Request Signatures
    const [openPopoverSignatures, setOpenPopoverSignatures] = useState(false);
    const requestSignatures = (e: any) => {
        setOpenPopoverSignatures(true);
    }
    const handlerCleanStateOnPopoverClose = () => {
        setOpenPopoverSignatures(false);
        setTipoAssinaturaArguido('');
    }

    // START: Assinatura Manuscrita
    const [toggleModalAssinaturaManuscrita, setToggleModalAssinaturaManuscrita] = useState(false);
    const [assinaturaManuscritaArguido, setAssinaturaManuscritaArguido] = useState<string>();
    const signedAssinaturaManuscrita = (value: string) => {
        if (value) {
            setAssinaturaManuscritaArguido(value)
        }
    }

    // START: Handler tipo assinatura arguido
    const [tipoAssinaturaArguido, setTipoAssinaturaArguido] = useState<any>();
    React.useEffect(() => {

        if (!_.isEmpty(tipoAssinaturaArguido)) {
            const _tipoAssinaturaArguido = JSON.parse(tipoAssinaturaArguido);

            // Assinatura Manuscrito'
            if (cleanString(_tipoAssinaturaArguido.descricao).includes(cleanString(assinaturaManuscrito))) {
                setToggleModalAssinaturaManuscrita(true);
            } else {
                setToggleModalAssinaturaManuscrita(false);
            }

        }

    }, [tipoAssinaturaArguido])


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
                <CoDirectaTemplateMarkup assinaturaManuscritoArguido={assinaturaManuscritaArguido}/>
            </IonContent>

            {/*START: Request Signatures*/}
            <IonPopover
                isOpen={openPopoverSignatures}
                className="menu popoverSign"
                showBackdrop={true}
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

                    <IonGrid>
                        <IonRow>
                            <IonCol size-sm="12" size-md="10" size-lg="8">
                                <IonItem className="ionItem-no-border">
                                    <IonLabel> <strong>O arguido não assina a contraordenação</strong> </IonLabel>
                                    <IonCheckbox checked={arguidoNaoAssinouNotificacao}
                                                 onIonChange={e => setArguidoNaoAssinouNotificacao(e.detail.checked)}
                                                 slot="start"/>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    {/* Arguido assinatura*/}
                    {arguidoNaoAssinouNotificacao ? '' :

                        <IonCard style={{margin: 30}}>

                            <IonCardHeader>
                                <IonCardTitle style={{paddingLeft: 15}}> Arguido </IonCardTitle>

                                {_.isEmpty(assinaturaManuscritaArguido) ?
                                    <IonIcon style={{
                                        position: "absolute",
                                        left: 10,
                                        top: 20,
                                        fontSize: 16
                                    }} color="warning" icon={alertCircle}></IonIcon>
                                    :
                                    <IonIcon style={{
                                        position: "absolute",
                                        left: 10,
                                        top: 20,
                                        fontSize: 16
                                    }} color="success" icon={checkmarkCircle}></IonIcon>
                                }

                            </IonCardHeader>
                            <IonCardContent style={{paddingTop: 0}}>
                                <IonGrid>
                                    <IonRow>

                                        <IonCol size-sm="12" size-md="8" size-lg="6">
                                            <TipoAssinaturas interface={"popover"} inputName={"tipoAssinaturaArguido"}
                                                             selected={tipoAssinaturaArguido}
                                                             setSelected={setTipoAssinaturaArguido}/>
                                        </IonCol>

                                        <IonCol size="12">
                                            <IonButtons>
                                                <IonButton disabled={!!_.isEmpty(assinaturaManuscritaArguido)}
                                                           fill="outline" strong={true} color="warning"
                                                           onClick={(e) => {
                                                               setAssinaturaManuscritaArguido('');
                                                               setTipoAssinaturaArguido('')
                                                           }}>
                                                    Limpar a assinatura actual
                                                </IonButton>
                                            </IonButtons>
                                        </IonCol>

                                    </IonRow>

                                </IonGrid>


                            </IonCardContent>
                        </IonCard>
                    }
                    {/*  Arguido assinatura */}


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

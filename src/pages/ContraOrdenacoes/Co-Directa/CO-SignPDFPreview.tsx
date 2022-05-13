import {IonContent, IonPage, useIonAlert, useIonLoading} from "@ionic/react";
import Menu from "../../../components/Menu/Menu";
import {CoDirectaTemplateMarkup} from '../../../components/Relatorios/templates/CoDirectaTemplate';
import {MenuActionsBtnSignPDF} from '../../../components/Contra-Ordenacoes/MenuActionsBtn';
import jsPDF from "jspdf";
import {IteratorArray} from "../../../common/iterator";
import {blobToBase64, createCanvas} from "../../../utils/apex-formatters";
import {useHistory} from "react-router";



interface IProps {
    data?: any
}

const CODirectaSignPDFPreview: React.FC<IProps> = (props) => {

    const [presentLoad, dismissLoad] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const history = useHistory();

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


    return (
        <IonPage>
            <Menu actionsCOBtn={<MenuActionsBtnSignPDF onSignPdf={(e: any) => {
                signPDF(e)
            }} onPrint={(e: any) => {
                onPrint(e)
            }}/>}/>
            <IonContent id={"CODirectaSignPDFPreview"} className="CODirectaSignPDFPreview" fullscreen={true}>
                <CoDirectaTemplateMarkup/>
            </IonContent>
        </IonPage>
    )
}

export default CODirectaSignPDFPreview;

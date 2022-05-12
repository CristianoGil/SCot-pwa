import {IonContent, IonPage} from "@ionic/react";
import Menu from "../../../components/Menu/Menu";
import {CoDirectaTemplateMarkup} from '../../../components/Relatorios/templates/CoDirectaTemplate';
import {MenuActionsBtnSignPDF} from '../../../components/Contra-Ordenacoes/MenuActionsBtn';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';

const CODirectaSignPDFPreview = () => {

    const signPDF = (e:any) => {
        // e.preventDefault();
        // alert('Yes')

        const JR_PAGE_ANCHOR_0_1 = document.getElementById('JR_PAGE_ANCHOR_0_1');
        console.log("elementPdf: ", JR_PAGE_ANCHOR_0_1)
        if (JR_PAGE_ANCHOR_0_1) {

            // @ts-ignore
            html2canvas(JR_PAGE_ANCHOR_0_1).then(async (canvas) => {
                console.log('canvas: ', canvas)
                const imgData = canvas.toDataURL('image/png');

                const pdf = new jsPDF({
                    orientation: 'p',
                    unit: 'mm',
                    format: 'a4',
                    putOnlyUsedFonts:true
                });
                let imgWidth = 210;
                let imgHeight = canvas.height * imgWidth / canvas.width;

                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

                pdf.save(`${(new Date()).toDateString()}.pdf`);

            }).catch((err:any) => {
                console.log('html2canvas: ', err);
            })

        } else {
            alert('Not found')
        }
    }

    return (
        <IonPage>
            <Menu actionsCOBtn={<MenuActionsBtnSignPDF onSignPdf={(e: any) => { signPDF(e) }}/>} />
            <IonContent id={"CODirectaSignPDFPreview"} className="CODirectaSignPDFPreview" fullscreen={true}>
            <CoDirectaTemplateMarkup/>
            </IonContent>
        </IonPage>
    )
}

export default CODirectaSignPDFPreview;

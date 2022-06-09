import jsPDF from "jspdf";
import {IteratorArray} from "../common/iterator";
import {base64ToArrayBuffer, blobToBase64, cleanString, createCanvas} from "../utils/apex-formatters";

export const generatePDF_HTML = (pagesNumber = 3, pages?: HTMLElement[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true
        });

        if (!pages) {

            const JR_PAGE_ANCHOR_0_1 = document.getElementById('CO_DIRECTA_JR_PAGE_ANCHOR_0_1');
            const JR_PAGE_ANCHOR_0_2 = document.getElementById('CO_DIRECTA_JR_PAGE_ANCHOR_0_2');

            if(JR_PAGE_ANCHOR_0_1 && JR_PAGE_ANCHOR_0_2) {
                pages = [JR_PAGE_ANCHOR_0_1, JR_PAGE_ANCHOR_0_2, JR_PAGE_ANCHOR_0_1]
            }

        }


        const iteratorPages: any = new IteratorArray(pages || []);

        const _funcIterable = async (): Promise<void> => {

            const dataValue: IteratorResult<any> = iteratorPages.next();
            const isDone: boolean | undefined = dataValue.done;
            const page = dataValue.value;

            if (!isDone) {

                pagesNumber--;

                try {
                    let x = 0;
                    let width = pdf.internal.pageSize.getWidth();
                    const height = pdf.internal.pageSize.getHeight();

                    const canvas = await createCanvas(page);

                    const imgData = canvas.toDataURL('image/JPEG');
                    
                    if(page.id === "CO_DIRECTA_JR_PAGE_ANCHOR_0_2") {
                        width = width - 65;
                        x = 32.5
                    }
                        pdf.addImage(imgData, 'PNG', x, 0, width, height);

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


export const getPDFBase64_HTML = (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const pdf = await generatePDF_HTML();
            const base64PDF = pdf.output('blob');
            resolve(blobToBase64(base64PDF))
        } catch (e) {
            reject(e)
        }
    })
}

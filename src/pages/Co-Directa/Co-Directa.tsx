import {
    IonCol, IonContent, IonGrid, IonPage, IonRow, IonSegment, IonSegmentButton, IonToolbar,
} from '@ionic/react';
import {useState} from 'react';
import './Co-Directa.scss';
import Menu from '../../components/Menu/Menu';
import React from 'react';
import ReactPDF, {BlobProvider, pdf, PDFDownloadLink } from '@react-pdf/renderer';

import Intervenientes from '../../components/Contra-Ordenacoes/Intervenientes/Intervenientes';
import MenuActionsBtb from '../../components/Contra-Ordenacoes/MenuActionsBtb';
import CODirecta_PDFDocument from '../../components/Pdf/Co-directa/Generate';
import html2canvas from 'html2canvas';

const RenderSegment = (props: { segment: string, setCoDirectaData: any }) => {
    if (props.segment === 'intervenientes') {
        return (<Intervenientes setCoDirectaData={props.setCoDirectaData}/>)
    } else if (props.segment === 'dados_da_infracao') {
        return (<div>dados_da_infracao</div>)
    } else if (props.segment === 'dados_complemenatares') {
        return (<div>dados_complemenatares</div>)
    }

    return null;

}

const CoDirecta: React.FC = () => {

    const [activeSegment, setActiveSegment] = useState('intervenientes');
    const [coDirecta, setCoDirecta] = useState<any>();

    const handlerSegment = (e: any) => {
        setActiveSegment(e.detail.value);
    }

    const onSave = async (e: any) => {
        // console.log("coDirecta: ", coDirecta);
        const blob = await pdf(<CODirecta_PDFDocument data={coDirecta}/>).toBlob();
        console.log('blob: ', blob)
        console.log("coDirecta: ", coDirecta);
        alert('Vai assinar e/ou gravar')
    }

    return (
        <IonPage>
            <Menu actionsCOBtn={<MenuActionsBtb onSave={(e:any) => {onSave(e)}}/>}/>
            <IonContent className="contraordenacao" fullscreen={true}>

                <IonGrid id="gridGeral" style={{marginBottom: 40}}>

                    <IonRow style={{marginBottom: 40}}>
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

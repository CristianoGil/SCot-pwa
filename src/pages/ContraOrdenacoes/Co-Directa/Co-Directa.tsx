import {
    IonCol, IonContent, IonGrid, IonPage, IonRow, IonSegment, IonSegmentButton, IonToolbar, useIonAlert, useIonLoading,
} from '@ionic/react';
import {useState} from 'react';
import './Co-Directa.scss';
import Menu from '../../../components/Menu/Menu';
import React from 'react';
// import ReactPDF, {BlobProvider, pdf, PDFDownloadLink } from '@react-pdf/renderer';
import jsPDF from 'jspdf';
import Intervenientes from '../../../components/Contra-Ordenacoes/Intervenientes/Intervenientes';
import {MenuActionsBtnSave} from '../../../components/Contra-Ordenacoes/MenuActionsBtn';
import DadosInfracao from '../../../components/Contra-Ordenacoes/DadosInfracao/DadosInfracao';
import DadosComplementares from '../../../components/Contra-Ordenacoes/DadosComplementares/DadosComplementares';

import {useHistory} from 'react-router';

const RenderSegment = (props: { segment: string, setCoDirectaData: any }) => {
    if (props.segment === 'intervenientes') {
        return (<Intervenientes setCoDirectaData={props.setCoDirectaData}/>)
    } else if (props.segment === 'dados_da_infracao') {
        return (<DadosInfracao/>)
    } else if (props.segment === 'dados_complemenatares') {
        return (<DadosComplementares setCoDirectaData={props.setCoDirectaData} />)
    }

    return null;

}

const CoDirecta: React.FC = () => {


    const [presentLoad, dismissLoad] = useIonLoading();
    const [presentAlert] = useIonAlert();

    const history = useHistory();
    const [activeSegment, setActiveSegment] = useState('intervenientes');
    const [coDirecta, setCoDirecta] = useState<any>();
    const [isCOSaved, setIsCOSaved] = useState(false);

    const handlerSegment = (e: any) => {
        setActiveSegment(e.detail.value);
    }

    const onSave = (e: any) => {
        presentLoad({
            message: 'A guardar...',
        })


        setTimeout(() => {
            dismissLoad();
            presentAlert({
                header: 'Sucesso!',
                message: 'Contraordenação guardada com sucesso!',
                buttons: [
                    {text: 'Fechar'},
                ]
            })
            setIsCOSaved(true);

        }, 500)


        console.error('Ainda nao temos informacao de onde e como armazenar a CO directa');
    }

    const onEmit = (e: any) => {
        history.push("/CODirectaSignPDFPreview")
    }

    return (
        <IonPage>
            <Menu actionsCOBtn={<MenuActionsBtnSave isCOSaved={isCOSaved} onEmit={(e: any) => {
                onEmit(e);
            }} onSave={(e: any) => {
                onSave(e)
            }}/>}/>
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

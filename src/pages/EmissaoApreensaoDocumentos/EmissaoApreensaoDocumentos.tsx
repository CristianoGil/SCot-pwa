import {
    IonCol, IonContent, IonGrid, IonPage, IonRow, IonSegment, IonSegmentButton, IonToolbar,
} from '@ionic/react';
import {useState} from 'react';
import './EmissaoApreensaoDocumentos.scss';
import Menu from '../../components/Menu/Menu';
import React from 'react';

import Intervenientes from '../../components/EmissaoApreensaoDocumentos/Intervenientes/Intervenientes';
import DadosInfracao from '../../components/EmissaoApreensaoDocumentos/DadosInfracao/DadosInfracao';
import DadosComplementares from '../../components/EmissaoApreensaoDocumentos/DadosComplementares/DadosComplementares';

const RenderSegment = (props: { segment: string, setCoDirectaData: any }) => {
    if (props.segment === 'intervenientes') {
        return (<Intervenientes setCoDirectaData={props.setCoDirectaData}/>)
    } else if (props.segment === 'dados_da_infracao') {
        return (<DadosInfracao/>)
    } else if (props.segment === 'dados_complemenatares') {
        return (<DadosComplementares />)
    }

    return null;

}

const EmissaoApreensaoDocumentos: React.FC = () => {

    const [activeSegment, setActiveSegment] = useState('intervenientes');
    const [coDirecta, setCoDirecta] = useState<any>();

    const handlerSegment = (e: any) => {
        setActiveSegment(e.detail.value);
    }

    return (
        <IonPage>
            <Menu />
            <IonContent className="contraordenacao" fullscreen={true}>

                <IonGrid id="gridGeral" style={{marginBottom: 40}}>

                    <IonRow style={{marginBottom: 40}}>
                        <IonCol size="12">
                            <h1>Registro de Apreensão de Documentos</h1>
                            <p>Registro de Apreensão de Documentos</p>
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

export default EmissaoApreensaoDocumentos;
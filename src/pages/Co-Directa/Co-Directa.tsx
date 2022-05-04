import {
    IonCol, IonContent, IonGrid, IonPage, IonRow, IonSegment, IonSegmentButton, IonToolbar,
} from '@ionic/react';
import {useState} from 'react';
import './Co-Directa.scss';
import Menu from '../../components/Menu/Menu';
import React from 'react';

import Intervenientes from '../../components/Contra-Ordenacoes/Intervenientes/Intervenientes';


const RenderSegment = (props: { segment: string }) => {
    if (props.segment === 'intervenientes' || props.segment === 'default') {
        return (<Intervenientes/>)
    } else if (props.segment === 'dados_da_infracao') {
        return (<div>dados_da_infracao</div>)
    } else if (props.segment === 'dados_complemenatares') {
        return (<div>dados_complemenatares</div>)
    }

    return null;

}

const CoDirecta: React.FC = () => {

    const [activeSegment, setActiveSegment] = useState('default');

    const handlerSegment = (e: any) => {
        setActiveSegment(e.detail.value)
    }

    return (
        <IonPage>
            <Menu/>
            <IonContent className="contraordenacao">

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

                <RenderSegment segment={activeSegment}/>

            </IonContent>

        </IonPage>
    );
};

export default CoDirecta;
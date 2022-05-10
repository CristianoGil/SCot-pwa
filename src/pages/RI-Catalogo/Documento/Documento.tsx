import {
    IonCol, IonContent, IonGrid, IonPage, IonRow,
} from '@ionic/react';
import Menu from '../../../components/Menu/Menu';
import React from 'react';
import './Documento.scss';
import DataTable from 'react-data-table-component';
import DocumentoPartial from '../../../components/RI-Catalogo/Components/DocumentoPartial/DocumentoPartial';

const columns = [
    {
        name: 'Tipo',
        selector: (row: { tipo: any; }) => row.tipo,
    },
    {
        name: 'Distrito',
        selector: (row: { distrito: any; }) => row.distrito,
    },
    {
        name: 'Conselho',
        selector: (row: { conselho: any; }) => row.conselho,
    },
    {
        name: 'Freguesia',
        selector: (row: { freguesia: any; }) => row.freguesia,
    },
    {
        name: 'Localidade',
        selector: (row: { localidade: any; }) => row.localidade,
    },
    {
        name: 'Arruamento',
        selector: (row: { arruamento: any; }) => row.arruamento,
    }
];

const data = [
    {
        id: 1,
        tipo: 'null',
        distrito: 'null',
        conselho: 'null',
        freguesia: 'null',
        localidade: 'null',
        arruamento: 'null',
    },

]

const Documento: React.FC = () => {


    return (
        <IonPage>
            <Menu activePagePath="/documento"/>
            <IonContent className="documento">

                <IonGrid id="gridGeral" style={{ marginBottom: 40 }}>

                    <IonRow style={{ marginBottom: 40 }}>
                        <IonCol size="12">
                            <h1>Documento</h1>
                            <p>Documento</p>
                        </IonCol>
                    </IonRow>

                </IonGrid>

                <IonGrid className="documentoPartial">
                    <IonRow>
                        <IonCol size-sm='12' size-md="12" size-lg="11">
                            {/*START: Documento*/}
                            <DocumentoPartial />
                            {/*END: Documento*/}
                        </IonCol>
                    </IonRow>
                    <IonRow style={{marginTop:20}}>
                        <IonCol size-sm='12' size-md='12' size-lg='11'>
                            <DataTable
                                columns={columns}
                                data={data}
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonContent>
        </IonPage>
    );
};

export default Documento;

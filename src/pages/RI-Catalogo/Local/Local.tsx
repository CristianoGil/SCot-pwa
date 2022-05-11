import {
    IonCol, IonContent, IonGrid, IonPage, IonRow,
} from '@ionic/react';
import Menu from '../../../components/Menu/Menu';
import React from 'react';
import './Local.scss';
import DataTable from 'react-data-table-component';
import LocalPartial from '../../../components/RI-Catalogo/Components/LocalPartial/LocalPartial';

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

const Local: React.FC = () => {


    return (
        <IonPage>
            <Menu />
            <IonContent className="local">

                <IonGrid id="gridGeral" style={{ marginBottom: 40 }}>

                    <IonRow style={{ marginBottom: 40 }}>
                        <IonCol size="12">
                            <h1>Local</h1>
                            <p>Local</p>
                        </IonCol>
                    </IonRow>

                </IonGrid>

                <IonGrid className="localPartial">
                    <IonRow>
                        <IonCol size-sm='12' size-md="12" size-lg="11">
                            {/*START: Local*/}
                            <LocalPartial />
                            {/*END: Local*/}
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

export default Local;

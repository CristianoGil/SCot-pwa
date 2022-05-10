import {
    IonCol, IonContent, IonGrid, IonPage, IonRow,
} from '@ionic/react';
import Menu from '../../../components/Menu/Menu';
import React from 'react';
import './Veiculo.scss';
import DataTable from 'react-data-table-component';
import VeiculoPartial from '../../../components/RI-Catalogo/Components/VeiculoPartial/VeiculoPartial.';

const columns = [
    {
        name: 'Matrícula',
        selector: (row: { matricula: any; }) => row.matricula,
    },
    {
        name: 'Nº Chassis',
        selector: (row: { numChassis: any; }) => row.numChassis,
    },
    {
        name: 'Estado Policial',
        selector: (row: { estadoPolicial: any; }) => row.estadoPolicial,
    },
    {
        name: 'IPO',
        selector: (row: { ipo: any; }) => row.ipo,
    },
    {
        name: 'Coimas em Atraso',
        selector: (row: { coimasEmAtraso: any; }) => row.coimasEmAtraso,
    },
];

const data = [
    {
        id: 1,
        matricula: 'null',
        numChassis: 'null',
        estadoPolicial: 'null',
        ipo: 'null',
        coimasEmAtraso: 'null',
    },

]

const Pessoa: React.FC = () => {


    return (
        <IonPage>
            <Menu activePagePath="/veiculo" />
            <IonContent className="veiculo">

                <IonGrid id="gridGeral" style={{ marginBottom: 40 }}>

                    <IonRow style={{ marginBottom: 40 }}>
                        <IonCol size="12">
                            <h1>Veículo</h1>
                            <p>Veículo</p>
                        </IonCol>
                    </IonRow>

                </IonGrid>

                <IonGrid className="veiculoPartial">
                    <IonRow>
                        <IonCol size-sm='12' size-md="12" size-lg="11">
                            {/*START: Veículo*/}
                            <VeiculoPartial />
                            {/*END: Veículo*/}
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

export default Pessoa;

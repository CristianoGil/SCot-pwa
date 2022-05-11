import {
    IonCol, IonContent, IonGrid, IonPage, IonRow,
} from '@ionic/react';
import Menu from '../../../components/Menu/Menu';
import React from 'react';
import './Organizacao.scss';
import DataTable from 'react-data-table-component';
import OrganizacaoPartial from '../../../components/RI-Catalogo/Components/OrganizacaoPartial/OrganizacaoPartial';

const columns = [
    {
        name: 'Nº Identificação Item',
        selector: (row: { numIdentificacaoItem: any; }) => row.numIdentificacaoItem,
    },
    {
        name: 'Designação',
        selector: (row: { designacao: any; }) => row.designacao,
    }
];

const data = [
    {
        id: 1,
        numIdentificacaoItem: 'null',
        designacao: 'null',
    },

]

const Organizacao: React.FC = () => {


    return (
        <IonPage>
            <Menu />
            <IonContent className="organizacao">

                <IonGrid id="gridGeral" style={{ marginBottom: 40 }}>

                    <IonRow style={{ marginBottom: 40 }}>
                        <IonCol size="12">
                            <h1>Organização</h1>
                            <p>Organização</p>
                        </IonCol>
                    </IonRow>

                </IonGrid>

                <IonGrid className="organizacaoPartial">
                    <IonRow>
                        <IonCol size-sm='12' size-md="12" size-lg="11">
                            {/*START: Organização*/}
                            <OrganizacaoPartial />
                            {/*END: Organização*/}
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

export default Organizacao;

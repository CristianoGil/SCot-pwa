import {
    IonCol, IonContent, IonGrid, IonPage, IonRow, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave,
} from '@ionic/react';
import Menu from '../../../components/Menu/Menu';
import PessoaPartial from '../../../components/RI-Catalogo/Components/PessoaPartial/PessoaPartial';
import React, { useEffect } from 'react';
import './Pessoa.scss';
import DataTable from 'react-data-table-component';
import { useGlobalState , getGlobalState} from '../../../app/global_states';

const columns = [
    {
        name: 'Nome',
        selector: (row: { nome: any; }) => row.nome,
    },
    {
        name: 'NIF',
        selector: (row: { nif: any; }) => row.nif,
    },
    {
        name: 'Data Nascimento',
        selector: (row: { dataNascimento: any; }) => row.dataNascimento,
    },
];

const data = [
    {
        id: 1,
        nome: 'Vesmério António Xavier',
        nif: '123456789',
        dataNascimento: '01/01/2022',
    },

]

const Pessoa: React.FC = () => {
    return (
        <IonPage>
            <Menu  activePagePath="/pessoa"/>
            <IonContent className="pessoa">

                <IonGrid id="gridGeral" style={{ marginBottom: 40 }}>

                    <IonRow style={{ marginBottom: 40 }}>
                        <IonCol size="12">
                            <h1>Pessoa</h1>
                            <p>Pessoa</p>
                        </IonCol>
                    </IonRow>

                </IonGrid>

                <IonGrid className="pessoaPartial">
                    <IonRow>
                        <IonCol size-sm='12' size-md="12" size-lg="11">
                            {/*START: Pessoa*/}
                            <PessoaPartial />
                            {/*END: Pessoa*/}
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

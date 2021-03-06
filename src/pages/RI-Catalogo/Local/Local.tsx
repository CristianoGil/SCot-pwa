import {
    IonAccordion,
    IonAccordionGroup,
    IonButton,
    IonButtons,
    IonCol, IonContent, IonGrid, IonInput, IonItem, IonItemGroup, IonLabel, IonList, IonPage, IonRow, IonSelect, IonSelectOption,
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
                    <IonRow style={{ marginTop: 20 }}>
                        <IonCol size-sm='12' size-md='12' size-lg='11'>
                            <IonAccordionGroup>
                                <IonAccordion value="colors">
                                    <IonItem slot="header">
                                        <IonButton slot='start'>ADICIONAR LOCAL</IonButton>
                                    </IonItem>

                                    <IonList slot="content">
                                        <IonItem>
                                            <IonGrid>
                                                <IonRow>
                                                    <IonCol size-sm='12' size-md='10' size-lg='4' style={{ marginTop: 16 }}>
                                                        <IonItem>
                                                            <IonLabel>Tipo Arruamento</IonLabel>
                                                            <IonSelect interface="popover">
                                                                <IonSelectOption value="TipoArruamento">Tipo Arruamento 1</IonSelectOption>
                                                            </IonSelect>
                                                        </IonItem>
                                                    </IonCol>

                                                    <IonCol size-sm='12' size-md='10' size-lg='4' style={{ marginTop: 16 }}>
                                                        <IonItem>
                                                            <IonLabel>Tipo</IonLabel>
                                                            <IonSelect interface="popover">
                                                                <IonSelectOption value="Tipo">Tipo 1</IonSelectOption>
                                                            </IonSelect>
                                                        </IonItem>
                                                    </IonCol>

                                                    <IonCol size-sm='12' size-md='10' size-lg='4' style={{ marginTop: 16 }}>
                                                        <IonItem>
                                                            <IonLabel>Subtipo</IonLabel>
                                                            <IonSelect interface="popover">
                                                                <IonSelectOption value="Subtipo">Subtipo 1</IonSelectOption>
                                                            </IonSelect>
                                                        </IonItem>
                                                    </IonCol>
                                                </IonRow>

                                                <IonRow>
                                                    <IonCol size-sm='12' size-md='10' size-lg='4' style={{ marginTop: 9 }}>
                                                        <IonItem>
                                                            <IonLabel
                                                                position="floating" itemType="text"
                                                                placeholder='Designa????o'>Designa????o</IonLabel>
                                                            <IonInput
                                                                required={true}
                                                                clearInput={true}
                                                            ></IonInput>
                                                        </IonItem>
                                                    </IonCol>

                                                    <IonCol size-sm='12' size-md='10' size-lg='4' style={{ marginTop: 16 }}>
                                                        <IonItem>
                                                            <IonLabel>Pa??s</IonLabel>
                                                            <IonSelect interface="popover">
                                                                <IonSelectOption value="Pa??s">Pa??s 1</IonSelectOption>
                                                            </IonSelect>
                                                        </IonItem>
                                                    </IonCol>

                                                    <IonCol size-sm='12' size-md='10' size-lg='4' style={{ marginTop: 16 }}>
                                                        <IonItem>
                                                            <IonLabel>Distrito</IonLabel>
                                                            <IonSelect interface="popover">
                                                                <IonSelectOption value="Distrito">Distrito 1</IonSelectOption>
                                                            </IonSelect>
                                                        </IonItem>
                                                    </IonCol>
                                                </IonRow>

                                                <IonRow>
                                                    <IonCol size-sm='12' size-md='10' size-lg='4' style={{ marginTop: 16 }}>
                                                        <IonItem>
                                                            <IonLabel>Conselho</IonLabel>
                                                            <IonSelect interface="popover">
                                                                <IonSelectOption value="Conselho">Conselho 1</IonSelectOption>
                                                            </IonSelect>
                                                        </IonItem>
                                                    </IonCol>

                                                    <IonCol size-sm='12' size-md='10' size-lg='4' style={{ marginTop: 16 }}>
                                                        <IonItem>
                                                            <IonLabel>Fraguesia</IonLabel>
                                                            <IonSelect interface="popover">
                                                                <IonSelectOption value="Fraguesia">Fraguesia 1</IonSelectOption>
                                                            </IonSelect>
                                                        </IonItem>
                                                    </IonCol>

                                                    <IonCol size-sm='12' size-md='10' size-lg='4' style={{ marginTop: 16 }}>
                                                        <IonItem>
                                                            <IonLabel>Localidade</IonLabel>
                                                            <IonSelect interface="popover">
                                                                <IonSelectOption value="Localidade">Localidade 1</IonSelectOption>
                                                            </IonSelect>
                                                        </IonItem>
                                                    </IonCol>
                                                </IonRow>

                                                <IonRow>
                                                    <IonCol size-sm='12' size-md='10' size-lg='4' style={{ marginTop: 9 }}>
                                                        <IonItem>
                                                            <IonLabel
                                                                position="floating" itemType="text"
                                                                placeholder='Arruamento'>Arruamento</IonLabel>
                                                            <IonInput
                                                                required={true}
                                                                clearInput={true}
                                                            ></IonInput>
                                                        </IonItem>
                                                    </IonCol>

                                                    <IonCol size-sm='12' size-md='10' size-lg='4' style={{ marginTop: 9 }}>
                                                        <IonItem>
                                                            <IonLabel
                                                                position="floating" itemType="text"
                                                                placeholder='N?? Pol??cia'>N?? Pol??cia</IonLabel>
                                                            <IonInput
                                                                required={true}
                                                                clearInput={true}
                                                            ></IonInput>
                                                        </IonItem>
                                                    </IonCol>

                                                    <IonCol size-sm='12' size-md='10' size-lg='4' style={{ marginTop: 9 }}>
                                                        <IonItem>
                                                            <IonLabel
                                                                position="floating" itemType="text"
                                                                placeholder='Zona_Bairro'>Zona/Bairro</IonLabel>
                                                            <IonInput
                                                                required={true}
                                                                clearInput={true}
                                                            ></IonInput>
                                                        </IonItem>
                                                    </IonCol>
                                                </IonRow>

                                                <IonRow>
                                                    <IonCol size-sm='12' size-md='12' size-lg='12' style={{ marginTop: 9 }}>
                                                        <IonItemGroup>
                                                            <IonButton slot='end' color='primary'>SALVAR</IonButton>
                                                            <IonButton slot='end' color='danger'>CANCELAR</IonButton>
                                                        </IonItemGroup>
                                                    </IonCol>
                                                </IonRow>
                                            </IonGrid>
                                        </IonItem>
                                    </IonList>
                                </IonAccordion>
                            </IonAccordionGroup>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md="12" size-lg="11">
                            {/*START: Local*/}
                            <LocalPartial />
                            {/*END: Local*/}
                        </IonCol>
                    </IonRow>
                    <IonRow style={{ marginTop: 20 }}>
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

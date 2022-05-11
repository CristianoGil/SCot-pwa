import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonTextarea } from "@ionic/react";
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'id',
        selector: (row: { _id: any; }) => row._id,
    },
    {
        name: 'Entidade',
        selector: (row: { entidade: any; }) => row.entidade,
    },
    {
        name: 'Infracções Adicionais',
        selector: (row: { infraccoesAdicionais: any; }) => row.infraccoesAdicionais,
    },
    {
        name: 'Ações',
        selector: (row: { acoes: any; }) => row.acoes,
    },
];

const data = [
    {
        id: 1,
        _id: 1,
        entidade: 'null',
        infraccoesAdicionais: 'null',
        acoes: 'null',
    },
]

const InfraccoesAdicionais: React.FC = () => {

    return (

        <IonCard className={'co-infraccoesAdicionais'}>
            <IonCardHeader>
                <IonCardTitle>Infracções adicionais</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='4'>
                            <IonItem>
                                <IonLabel position="floating" itemType="text" placeholder="Nome infringida">Nome infringida</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='8'>
                            <IonItem lines="none">
                                <IonLabel position="stacked">Descrição</IonLabel>
                                <IonTextarea rows={6} cols={10} placeholder="" value={''} onIonChange={e => () => { }}>

                                </IonTextarea>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol offset="10" size-sm='2' size-md='2' size-lg='2'>
                        <IonItem lines='none'>
                                <IonButton style={{ background: '#084F87', borderRadius: 4 }}
                                    color="#084F87"
                                    slot="end"
                                    //    disabled={}
                                    size='default'
                                    onClick={() => { }}> Adicionar </IonButton>

                            </IonItem>
                        </IonCol>
                       
                    </IonRow>
                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='12'>
                            <DataTable
                                columns={columns}
                                data={data}
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
}

export default InfraccoesAdicionais;
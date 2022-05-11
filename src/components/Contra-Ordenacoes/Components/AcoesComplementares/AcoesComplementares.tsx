import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow } from "@ionic/react";
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Tipo de Documento',
        selector: (row: { tipoDocumento: any; }) => row.tipoDocumento,
    },
    {
        name: 'Estado',
        selector: (row: { estado: any; }) => row.estado,
    },
    {
        name: 'Ações',
        selector: (row: { acoes: any; }) => row.acoes,
    },
];

const data = [
    {
        id: 1,
        tipoDocumento: 'Apreensão Documentos',
        estado: 'null',
        acoes: 'Abrir/Excluir',
    },
    {
        id: 2,
        tipoDocumento: 'Apreensão Veículo',
        estado: 'null',
        acoes: 'Abrir/Excluir',
    },
    {
        id: 3,
        tipoDocumento: 'Bloqueamento/Remoção de Veículo',
        estado: 'null',
        acoes: 'Abrir/Excluir',
    },
    {
        id: 4,
        tipoDocumento: 'Substituição de Documentos',
        estado: 'null',
        acoes: 'Abrir/Excluir',
    },
    {
        id: 5,
        tipoDocumento: 'Apresentação de Documentos',
        estado: 'null',
        acoes: 'Abrir/Excluir',
    },

]

const AcoesComplementares: React.FC = () => {

    return (

        <IonCard className={'co-acoesComplementares'}>
            <IonCardHeader>
                <IonCardTitle>Ações Complementares</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
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

export default AcoesComplementares;
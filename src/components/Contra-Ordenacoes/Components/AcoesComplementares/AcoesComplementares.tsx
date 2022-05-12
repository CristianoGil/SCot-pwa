import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPopover, IonRow, IonSelect, IonSelectOption, IonToolbar } from "@ionic/react";
import { open, trash, remove, bookOutline } from "ionicons/icons";
import { useState } from "react";
import DataTable from 'react-data-table-component';
import NumeroDocumento from "../../../NumeroDocumento/NumeroDocumento";



const AcoesComplementares: React.FC = () => {

    const [openPopoverApreensaoDocumentosData, setOpenPopoverApreensaoDocumentosData] = useState(false);
    const [checked, setChecked] = useState(false);

    const handleButtonClick_ABRIR = (state: any) => {
        console.log('clicked (ABRIR)');
        console.log(state);
        setOpenPopoverApreensaoDocumentosData(true);
    };

    const handleButtonClick_EXCLUIR = (state: any) => {
        console.log('clicked (EXCLUIR)');
        console.log(state);
    };

    const columns = [
        {
            name: 'Tipo de Documento',
            selector: (row: { tipoDocumento: any; }) => row.tipoDocumento,
        },
        {
            name: 'Estado',
            cell: (row: { estado: any }) => (
                <>
                    <IonIcon slot="start" icon={remove} />
                </>
            )
        },
        {
            name: 'Ações',
            cell: (row: { accoes: any }) => (
                <>
                    <IonButton onClick={() => handleButtonClick_ABRIR(row.accoes)} size="small" color="primary" >
                        ABRIR
                        <IonIcon slot="start" icon={open} />
                    </IonButton>

                    <IonButton onClick={() => handleButtonClick_EXCLUIR(row.accoes)} size="small" color="danger" >
                        EXCLUIR
                        <IonIcon slot="start" icon={trash} />
                    </IonButton>
                </>
            )
        },
    ];

    const data = [
        {
            id: 1,
            tipoDocumento: 'Apreensão Documentos',
            estado: 'null',
            accoes: 'Abrir/Excluir',
        },
        {
            id: 2,
            tipoDocumento: 'Apreensão Veículo',
            estado: 'null',
            accoes: 'Abrir/Excluir',
        },
        {
            id: 3,
            tipoDocumento: 'Bloqueamento/Remoção de Veículo',
            estado: 'null',
            accoes: 'Abrir/Excluir',
        },
        {
            id: 4,
            tipoDocumento: 'Substituição de Documentos',
            estado: 'null',
            accoes: 'Abrir/Excluir',
        },
        {
            id: 5,
            tipoDocumento: 'Apresentação de Documentos',
            estado: 'null',
            accoes: 'Abrir/Excluir',
        },

    ]

    //-------------------------[Motivos Apreensao]

    const columnsMotivosApreensao = [
        {
            name: 'id',
            selector: (row: { _id: any; }) => row._id,
        },
        {
            name: 'Motivo',
            cell: (row: { motivo: any }) => (
                <>
                    <IonIcon slot="start" icon={remove} />
                </>
            )
        },
        {
            name: 'Ações',
            cell: (row: { accoes: any }) => (
                <>
                    <IonButton onClick={() => { }} size="small" color="primary" >
                        ABRIR
                        <IonIcon slot="start" icon={open} />
                    </IonButton>

                    <IonButton onClick={() => { }} size="small" color="danger" >
                        EXCLUIR
                        <IonIcon slot="start" icon={trash} />
                    </IonButton>
                </>
            )
        },
    ];

    const dataMotivosApreensao = [
        {
            id: 1,
            _id: 'null',
            motivo: 'null',
            accoes: 'Abrir/Excluir',
        },
    ]
    //-------------------------[Dados Apreensao Documentos]

    const columnsDadosApreensaoDocumentos = [
        {
            name: 'Documento',
            selector: (row: { documento: any; }) => row.documento,
        },
        {
            name: 'Número',
            selector: (row: { numero: any; }) => row.numero,
        },
        {
            name: 'Ações',
            cell: (row: { accoes: any }) => (
                <>
                    <IonButton onClick={() => { }} size="small" color="primary" >
                        ABRIR
                        <IonIcon slot="start" icon={open} />
                    </IonButton>

                    <IonButton onClick={() => { }} size="small" color="danger" >
                        EXCLUIR
                        <IonIcon slot="start" icon={trash} />
                    </IonButton>
                </>
            )
        },
    ];

    const dataDadosApreensaoDocumentos = [
        {
            id: 1,
            documento: 'null',
            numero: 'null',
            accoes: 'Abrir/Excluir',
        },
    ]

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

            <IonPopover
                isOpen={openPopoverApreensaoDocumentosData}
                className="menu popoverArguido"
                showBackdrop={true}
                onDidDismiss={() => {
                    setOpenPopoverApreensaoDocumentosData(false);
                }}>

                <IonHeader className="ion-no-border">
                    <IonToolbar color='transparent'>
                        <IonLabel slot='start'>
                            <h1>
                                Apreensão de Documentos
                            </h1>
                        </IonLabel>

                        <IonButton className="btn-use-data" fill="outline" color="primary" slot="end"
                            onClick={() => { }}
                        >
                            EMITIR
                        </IonButton>

                        <IonButton className="btn-catalogo" fill="outline" color="medium" slot="end">
                            IMPRIMIR <IonIcon slot="start" icon={bookOutline} />
                        </IonButton>

                        <IonButton className="btn-close" fill="outline" color="danger" slot="end" onClick={() => {
                            setOpenPopoverApreensaoDocumentosData(false);
                        }}>
                            CANCELAR
                        </IonButton>

                    </IonToolbar>
                </IonHeader>

                <IonContent>

                    {/* Motivos de Apreensão */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size-sm="9" size-md="10" size-lg="9" style={{ marginTop: 16 }}>
                                        <IonItem>
                                            <IonLabel>Motivos da Apreensão *</IonLabel>
                                            <IonSelect interface="popover">
                                                <IonSelectOption value="Unidade_Comando">Motivos da Apreensão 1</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                                        <IonItem lines='none'>
                                            <IonButton style={{ background: '#084F87', borderRadius: 4 }}
                                                color="#084F87"
                                                slot="start"
                                                //    disabled={}
                                                size='default'
                                                onClick={() => { }}> ADICIONAR </IonButton>

                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow style={{ marginTop: 20 }}>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>
                                        <DataTable
                                            columns={columnsMotivosApreensao}
                                            data={dataMotivosApreensao}
                                        />
                                    </IonCol>
                                </IonRow>

                                <IonRow style={{ marginTop: 20 }}>

                                    <IonCol size-sm='12' size-md='10' size-lg='6' style={{ marginTop: 22 }}>
                                        <IonHeader style={{ marginBottom: 8 }}>
                                            <IonLabel>Presenciada pelo Autuante?</IonLabel>
                                        </IonHeader>
                                        <strong>Não</strong>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='10' size-lg='6'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome infringida">Nº da Apreensão de Documentos *</IonLabel>
                                            <IonInput></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Motivos de Apreensão */}

                    {/* Dados de Apreensão dos Documentos */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Dados de Apreensão dos Documentos</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size-sm="9" size-md="10" size-lg="5" style={{ marginTop: 16 }}>
                                        <IonItem>
                                            <IonLabel>Documento *</IonLabel>
                                            <IonSelect interface="popover">
                                                <IonSelectOption value="Unidade_Comando">Documento 1</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='10' size-lg='4'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome infringida">Número</IonLabel>
                                            <IonInput></IonInput>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                                        <IonItem lines='none'>
                                            <IonButton style={{ background: '#084F87', borderRadius: 4 }}
                                                color="#084F87"
                                                slot="start"
                                                //    disabled={}
                                                size='default'
                                                onClick={() => { }}> ADICIONAR </IonButton>

                                        </IonItem>
                                    </IonCol>
                                </IonRow>

                                <IonRow style={{ marginTop: 20 }}>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>
                                        <DataTable
                                            columns={columnsDadosApreensaoDocumentos}
                                            data={dataDadosApreensaoDocumentos}
                                        />
                                    </IonCol>
                                </IonRow>
                                <IonRow style={{ marginTop: 20 }}>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome infringida">Local de Apresentação</IonLabel>
                                            <IonInput></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Dados de Apreensão dos Documentos */}

                    {/* Acções Associadas */}
                    <IonCard style={{ margin: 30 }}>

                        <IonCardHeader>
                            <IonCardTitle>Acções Associadas</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>

                                {/* radioButton input */}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                A fim de regularizar a situação, o interessado deverá dirigir-se a
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>

                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome infringida">Descreva aqui o local</IonLabel>
                                            <IonInput></IonInput>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>

                                {/* radioButton input */}


                                {/* radioButton input */}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                os Documentos do Veículo poderão ser levantados nos primeiros cinco dias úteis no
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>

                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome infringida">Descreva aqui o local</IonLabel>
                                            <IonInput></IonInput>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>

                                {/* radioButton input */}


                                {/* radioButton input */}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                a partir do oitavo dia útil, até ao pagamento integral,
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>

                                        <IonItem>
                                            <IonLabel></IonLabel>
                                            <IonSelect interface="popover">
                                                <IonSelectOption value="Unidade_Comando">Dado 1</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>

                                {/* radioButton input */}

                                {/* radioButton input */}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                ou envio a Câmara Municipal de
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>

                                        <IonItem>
                                            <IonLabel></IonLabel>
                                            <IonSelect interface="popover">
                                                <IonSelectOption value="Unidade_Comando">Dado 1</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>

                                {/* radioButton input */}


                                {/* radioButton input */}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                O Título de Condução poderá ser levantado nos primeiros cinco dias úteis no
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>

                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome infringida"></IonLabel>
                                            <IonInput></IonInput>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>

                                {/* radioButton input */}

                                {/* radioButton input */}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                a partir do oitavo dia útil, até ao pagamento integral,
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>

                                        <IonItem>
                                            <IonLabel></IonLabel>
                                            <IonSelect interface="popover">
                                                <IonSelectOption value="Unidade_Comando">Dado 1</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>

                                {/* radioButton input */}

                                {/* radioButton input */}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                ou envio a Câmara Municipal de
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>

                                        <IonItem>
                                            <IonLabel></IonLabel>
                                            <IonSelect interface="popover">
                                                <IonSelectOption value="Unidade_Comando">Dado 1</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>

                                {/* radioButton input */}

                                {/* radioButton input */}
                                <IonRow>

                                    <IonCol size-sm='12' size-md='10' size-lg='12' style={{ marginTop: 10 }}>

                                        <IonItem lines='none'>

                                            <IonCheckbox checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
                                            <IonLabel class="ion-margin-start">
                                                A condução do veículo com o documento de identificação apreendido é sancionada nos termos do nº8 do art. 161 CE com coima de 300 a 1500 euros, sendo o veículo apreendido nos termos do art. 162º nº1 alínea a) do mesmo diploma.
                                            </IonLabel>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='10' size-lg='12'>

                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Nome infringida"></IonLabel>
                                            <IonInput></IonInput>
                                        </IonItem>

                                    </IonCol>

                                </IonRow>

                                {/* radioButton input */}
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Acções Associadas */}

                    {/* Número de Documentos */}
                    <IonCard style={{ margin: 30 }}>
                        <NumeroDocumento />
                    </IonCard>
                    {/* Número de Documentos */}
                </IonContent>

            </IonPopover>
        </IonCard>
    );
}

export default AcoesComplementares;
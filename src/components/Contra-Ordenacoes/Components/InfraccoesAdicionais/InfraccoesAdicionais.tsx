import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonTextarea } from "@ionic/react";
import { PropertyDescriptorParsingType } from "html2canvas/dist/types/css/IPropertyDescriptor";
import React, { useEffect } from "react";
import { useState } from "react";
import DataTable from 'react-data-table-component';
import _ from 'underscore';

interface Infracao{
     id?:number,
    _id:number,
    entidade:string,
    infraccoesAdicionais:string,
    acoes: string

}
interface IInfraccoesAdicionais {
    setParentInfracoesData?: any
}

const columns = [
    {
        name: 'id',
        selector: (row: { _id: number; }) => row._id,
    },
    {
        name: 'Entidade',
        selector: (row: { entidade: string; }) => row.entidade,
    },
    {
        name: 'Infracções Adicionais',
        selector: (row: { infraccoesAdicionais: string; }) => row.infraccoesAdicionais,
    },
    {
        name: 'Ações',
        selector: (row: { acoes: string; }) => row.acoes,
    },
];

const data:Infracao[] = []


const InfraccoesAdicionais:React.FC<IInfraccoesAdicionais> = (props) => {
    const [infracoesData, setInfracoesData] = useState(data);
    const [nomeInfrigida, setNomeInfrigida] = useState('');
    const [descricaoInfrigida, setDescricaoInfrigida] = useState('');
    let [index, setIndex] = useState(1);

    const onChange_nomeInfrigida=(e:any)=>{
        setNomeInfrigida(e.target.value)
    }

    const onChange_descricaoInfrigida=(e:any)=>{
        setDescricaoInfrigida(e.target.value)
    }

    const onClick_addInfracaoAdicional = () => {
       let index: number = 1
        if(infracoesData.length==0){
        index = 1;        
        }
        else{
            index = infracoesData.length+1 
        } 
        
        const temp_data = {
                id:index,
                _id:index,
                entidade:nomeInfrigida,
                infraccoesAdicionais:descricaoInfrigida,
                acoes:"null"
            }
            data.push(...infracoesData)

            setInfracoesData([...data, temp_data]) 

    
    }

    useEffect(()=>{
        if (_.has(props, 'setParentInfracoesData')) {
            const _data = {
                infracoes: infracoesData,
            }
            props.setParentInfracoesData(_data)
        }
                
    },[]);

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
                                <IonInput
                                value={nomeInfrigida} 
                                onIonChange={onChange_nomeInfrigida}


                                ></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='8'>
                            <IonItem lines="none">
                                <IonLabel position="stacked">Descrição</IonLabel>
                                <IonTextarea 
                                rows={6} 
                                cols={10}
                                 placeholder=""
                                 value={descricaoInfrigida} 
                                 onIonChange={onChange_descricaoInfrigida}>
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
                                    size='default'
                                    onClick={onClick_addInfracaoAdicional}> Adicionar </IonButton>

                            </IonItem>
                        </IonCol>
                       
                    </IonRow>
                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='12'>
                            <DataTable
                                columns={columns}
                                data={infracoesData}
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
}

export default InfraccoesAdicionais;
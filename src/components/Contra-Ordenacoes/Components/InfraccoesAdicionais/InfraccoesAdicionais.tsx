import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonTextarea } from "@ionic/react";
import { PropertyDescriptorParsingType } from "html2canvas/dist/types/css/IPropertyDescriptor";
import { informationCircle } from "ionicons/icons";
import React, { useEffect } from "react";
import { useState } from "react";
import DataTable from 'react-data-table-component';
import _ from 'underscore';
import { IID_DESCRICAO } from "../../../../model/extendable";
import { IInfracaoAdicional } from "../../../../model/infracaoAdicional";
import { IEntidade } from "../../../../model/person";


interface IInfraccoesAdicionais {
    setParentInfracoesData?: any
}


const InfraccoesAdicionais:React.FC<IInfraccoesAdicionais> = (props) => {
    const columns = [
        {
            name: 'Entidade',
            selector: (row: { entidade: any; }) => row.entidade.descricao,
        },
        {
            name: 'Infracções Adicionais',
            selector: (row: { descricao: any; }) => row.descricao,
        },
        {
            name: 'Ações',
            cell: (row: { id: any }) => (
                <IonButton onClick={(e) =>{
                   
                    data = infracoesData.filter(item => {return item.id !== row.id})
                     setInfracoesData(data)
                }}   size="small" color="primary" >
                    <IonIcon slot="start" icon={informationCircle} />
                </IonButton>
            )
        },
    ];let data:IInfracaoAdicional[] = []
    

    
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
        
             setInfracoesData([...infracoesData, {
                entidade:{
                    descricao:nomeInfrigida,
                    id:index
                },descricao:descricaoInfrigida,
                id:index
             }]) 

    
    }
    const onClick_RemoveInfraccao = (e:any) => {
      

    }

    React.useEffect(()=>{
       
            const _data = {
                infracoes: infracoesData,
            }
            props.setParentInfracoesData(_data)
      
                
    },[infracoesData]);

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
                                <IonLabel position="floating" itemType="text" placeholder="Nome infringida">Norma infringida</IonLabel>
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
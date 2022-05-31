import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { Contraordenacao } from "../../../../api/Contraordenacao";
import DatePicker from "../../../Combos/DatePicker";
import _ from 'underscore';

interface UnidadeData {
    setUnidadeData?: any
}


interface UnidadeResponse {
    comandos: Comando[];
    divisoes: Comando[];
    esquadras: Comando[];
    destacamentos: Comando[];
    subdestacamentos: Comando[];
}

interface Comando {
    id: number;
    designacao: string;
}

interface IPROPSLocalEmissao {
    inputName: string
    textLabel?: string
    selected?: any
    setSelected?: any
}


const Unidade: React.FC<UnidadeData> = (props) => {


    const [unidadeImt, setUnidadeImt] = useState('');
    const [unidadesImt, setUnidadesImt] = useState<Comando[]>();
    const [dataHoraInfraccao, setDataHoraInfraccao] = useState<string | number>();
    const [numTalao, setNumTalao] = useState('');

    const keyUp_numTalao = (e: any) => {
        setNumTalao(e.target.value);
    }
    const getUnidades = async (): Promise<any> => await new Contraordenacao().carregarCombosUnidade()


    React.useEffect(() => {
        getUnidades().then((response_unidade) => {
            const unidades = response_unidade as UnidadeResponse
            setUnidadesImt(unidades?.comandos)
        }).catch((error) => {
            console.error("Load unidade combos: \n", error);
        })
    }, []);



    React.useEffect(() => {
        const data = {
            unidadeImt: unidadeImt,
            dataHoraInfraccao: dataHoraInfraccao,
            numTalao: numTalao,
        }
        props.setUnidadeData(data)
    }, [unidadeImt, dataHoraInfraccao,numTalao])

    const onchange_getSelectedUnidade =(e:any)=>{
        setUnidadeImt(e.detail.value)
    }
    return (

        <IonCard className={'co-unidade'}>
            <IonCardHeader>
                <IonCardTitle>Unidade</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm="9" size-md="12" size-lg="4" style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Unidade/Comando *</IonLabel>
                                <IonSelect interface="popover" onIonChange={onchange_getSelectedUnidade} >
                                    {unidadesImt?.map((local: any) => {
                                        return (
                                            <IonSelectOption key={`${local.id}`}
                                                value={local.descricao}>{`${local.descricao}`}</IonSelectOption>
                                        )
                                    })}
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md='12' size-lg='4' style={{ marginTop: 16 }}>
                            <DatePicker inputName={'unidade-data_horaInfraccao'} textLabel="Data/Hora da infracção" setSelected={setDataHoraInfraccao}
                                selected={dataHoraInfraccao} />
                        </IonCol>

                        <IonCol size-sm="3" size-md="3" size-lg="3">
                            <IonItem>
                                <IonLabel position="floating" itemType="number"
                                    placeholder="Enter Number">Número do Talão</IonLabel>
                                <IonInput value={numTalao}
                                    onKeyUp={keyUp_numTalao}
                                ></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
}

export default Unidade;
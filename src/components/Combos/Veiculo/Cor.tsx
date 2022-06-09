import React, {useState} from "react";
import {
    IonLabel,
    IonItem,
    IonSelect,
    IonSelectOption,
} from '@ionic/react';
import {Contraordenacao} from "../../../api/Contraordenacao";
import { customPopoverOptions } from "../../../utils/customPopoverOptions";

interface ICor {
    inputName: string
    textLabel?: string
    selected?:any
    setSelected?:any
    interface: any
}

interface IPROS {
    id: string | null
    descricao: string
}

const getCombos = async (): Promise<IPROS[] | null> => await new Contraordenacao().carregarCombosVeiculo("cores");


const Cor: React.FC<ICor> = (props: ICor) => {
    const [combos, setCombos] = useState<IPROS[] | null>([]);

    React.useEffect(() => {
        getCombos().then((combos) => {
            setCombos(combos);
        }).catch((error) => {
            setCombos([{id: null, descricao: "Erro ao carregar dados"}])
        })
    }, []);

    return (

        <IonItem>
            <IonLabel position="floating">{props.textLabel}</IonLabel>
            <IonSelect interfaceOptions={customPopoverOptions} value={props.selected?.id || props.selected?.descricao} interface={props.interface} name={props.inputName}
                       onIonChange={(e) => {
                           let value = (combos || []).find((d )=> d.id === e.detail.value || d.descricao === e.detail.value)
                           props.setSelected(value)
                       }}>
                {(combos || []).map((cor: any) => {
                    return (
                        <IonSelectOption key={`${cor.id}`} value={cor.id}>{cor.descricao}</IonSelectOption>
                    )
                })}
            </IonSelect>
        </IonItem>
    )
}

export default React.memo(Cor);


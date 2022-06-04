import React, {useState} from "react";
import {
    IonLabel,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonInput,
    IonIcon,
    IonPopover,
    IonDatetime
} from '@ionic/react';
import country from 'country-list-js';
import {getEmojiFlag} from 'countries-list';
import {Contraordenacao} from "../../../api/Contraordenacao";
// @ts-ignore
import {CirclePicker} from 'react-color';
import {dateFormat} from "../../../utils/apex-formatters";
import {colorPaletteOutline} from "ionicons/icons";

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
            <IonLabel>{props.textLabel}</IonLabel>
            <IonSelect value={props.selected?.id || props.selected?.descricao} interface={props.interface} name={props.inputName}
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


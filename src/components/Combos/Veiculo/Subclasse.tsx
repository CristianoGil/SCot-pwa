import React, {useState} from "react";
import {IonLabel, IonItem, IonSelect, IonSelectOption} from '@ionic/react';
import country from 'country-list-js';
import {getEmojiFlag} from 'countries-list';
import {Contraordenacao} from "../../../api/Contraordenacao";

interface ISubclasse {
    inputName: string,
    interface?: any,
    selectedText?: string,
    textLabel?: string
}

interface IPROS {
    id: string | null
    descricao: string
}

const getCombos = async (): Promise<IPROS[] | null> => await new Contraordenacao().carregarCombosVeiculo("subclasses");


const Subclasse: React.FC<ISubclasse> = (props: ISubclasse) => {
    const [subclasse, setSubclasse] = useState();
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
            <IonSelect value={subclasse} interface={props.interface} name={props.inputName}
                       onIonChange={e => setSubclasse(e.detail.value)}>
                {combos?.map((subclasse: any) => {
                    return (
                        <IonSelectOption key={`${subclasse.id}`} value={subclasse.id}>{subclasse.descricao}</IonSelectOption>
                    )
                })}
            </IonSelect>
        </IonItem>
    )
}

export default React.memo(Subclasse);
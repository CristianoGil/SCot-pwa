import React, {useState} from "react";
import {IonLabel, IonItem, IonSelect, IonSelectOption} from '@ionic/react';
import country from 'country-list-js';
import {getEmojiFlag} from 'countries-list';
import {Contraordenacao} from "../../../api/Contraordenacao";

interface IClasse {
    inputName: string,
    interface?: any,
    selectedText?: string,
    textLabel?: string
}

interface IPROS {
    id: string | null
    descricao: string
}

const getCombos = async (): Promise<IPROS[] | null> => await new Contraordenacao().carregarCombosVeiculo("classes");


const Classe: React.FC<IClasse> = (props: IClasse) => {
    const [classe, setClasse] = useState();
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
            <IonSelect value={classe} interface={props.interface} name={props.inputName}
                       onIonChange={e => setClasse(e.detail.value)}>
                {combos?.map((classe: any) => {
                    return (
                        <IonSelectOption key={`${classe.id}`} value={classe.id}>{classe.descricao}</IonSelectOption>
                    )
                })}
            </IonSelect>
        </IonItem>
    )
}

export default React.memo(Classe);
import React, {useState} from "react";
import {IonLabel, IonItem, IonSelect, IonSelectOption} from '@ionic/react';
import country from 'country-list-js';
import {getEmojiFlag} from 'countries-list';
import {Contraordenacao} from "../../../api/Contraordenacao";

interface IMarca {
    inputName: string,
    interface?: any,
    selectedText?: string,
    textLabel?: string
}

interface IDocIdentificacao {
    id: string | null
    descricao: string
}

const getCombos = async (): Promise<IDocIdentificacao[] | null> => await new Contraordenacao().carregarCombosVeiculo("marcas");

const Marca: React.FC<IMarca> = (props: IMarca) => {
    const [marca, setMarca] = useState();
    const [combos, setCombos] = useState<IDocIdentificacao[] | null>([]);

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
            <IonSelect value={marca} interface={props.interface} name={props.inputName}
                       onIonChange={e => setMarca(e.detail.value)}>
                {combos?.map((marca: any) => {
                    return (
                        <IonSelectOption key={`${marca.id}`}
                                         value={marca.id}>{marca.descricao}</IonSelectOption>
                    )
                })}
            </IonSelect>
        </IonItem>
    )
}

export default React.memo(Marca);
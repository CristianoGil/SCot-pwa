import React, {useState} from "react";
import {IonLabel, IonItem, IonSelect, IonSelectOption} from '@ionic/react';
import country from 'country-list-js';
import {getEmojiFlag} from 'countries-list';
import {Contraordenacao} from "../../../api/Contraordenacao";

interface ICategoria {
    inputName: string,
    interface?: any,
    selectedText?: string,
    textLabel?: string
}

interface IPROS {
    id: string | null
    descricao: string
}

const getCombos = async (): Promise<IPROS[] | null> => await new Contraordenacao().carregarCombosVeiculo("categorias");


const Categoria: React.FC<ICategoria> = (props: ICategoria) => {
    const [categoria, setCategoria] = useState();
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
            <IonSelect value={categoria} interface={props.interface} name={props.inputName}
                       onIonChange={e => setCategoria(e.detail.value)}>
                {combos?.map((categoria: any) => {
                    return (
                        <IonSelectOption key={`${categoria.id}`} value={categoria.id}>{categoria.descricao}</IonSelectOption>
                    )
                })}
            </IonSelect>
        </IonItem>
    )
}

export default React.memo(Categoria);
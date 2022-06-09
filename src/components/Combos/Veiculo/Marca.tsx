import React, {useState} from "react";
import {IonLabel, IonItem, IonSelect, IonSelectOption} from '@ionic/react';
import {Contraordenacao} from "../../../api/Contraordenacao";
import { customPopoverOptions } from "../../../utils/customPopoverOptions";

interface IMarca {
    inputName: string,
    interface?: any,
    selected?: any
    setSelected?: any
    textLabel?: string
}

interface IDocIdentificacao {
    id: string | null
    descricao: string
}

const getCombos = async (): Promise<IDocIdentificacao[] | null> => await new Contraordenacao().carregarCombosVeiculo("marcas");

const Marca: React.FC<IMarca> = (props: IMarca) => {
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
            <IonLabel position="floating">{props.textLabel}</IonLabel>
            <IonSelect interfaceOptions={customPopoverOptions} value={props.selected?.id || props.selected?.descricao} interface={props.interface} name={props.inputName}
                       onIonChange={(e) => {
                           let value = (combos || []).find((d) => d.id === e.detail.value || d.descricao === e.detail.value)
                           props.setSelected(value)
                       }}
            >
                {(combos || []).map((marca: any) => {
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

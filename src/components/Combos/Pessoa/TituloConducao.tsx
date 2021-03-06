import {IonItem, IonLabel, IonSelect, IonSelectOption} from "@ionic/react";
import React from "react";
import {useState} from "react";
import {Contraordenacao} from "../../../api/Contraordenacao";

interface IProps {
    inputName: string
    interface?: any
    selected?: any
    setSelected?: any
    onSelected?: any
    textLabel?: string
}

interface ITituloConducao {
    id: string | null
    descricao: string
}

const getCombos = async (): Promise<ITituloConducao[] | null> => await new Contraordenacao().carregarCombosPessoa("titulosConducoes");

const TituloConducaoCombo: React.FC<IProps> = (props) => {
    const [combos, setCombos] = useState<ITituloConducao[] | null>([]);

    React.useEffect(() => {
        getCombos().then((combos) => {
            setCombos(combos);
        }).catch((error) => {
            setCombos([{id: null, descricao: "Erro ao carregar dados"}])
            console.error("Titulo Conducoes combos: \n", error);
        })
    }, []);

    return (
        <IonItem>
            <IonLabel>{props.textLabel}</IonLabel>
            <IonSelect name={props.inputName} value={props.selected} interface={props.interface}
                       onIonChange={e => {
                           props.setSelected(e.detail.value);
                       }}>

                {combos?.map((local: any) => {
                    return (
                        <IonSelectOption key={`${local.id}`}
                                         value={local.id}>{`${local.descricao}`}</IonSelectOption>
                    )
                })}
            </IonSelect>
        </IonItem>
    )
}

export default TituloConducaoCombo;
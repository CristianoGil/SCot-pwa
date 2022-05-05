import {IonItem, IonLabel, IonSelect, IonSelectOption} from "@ionic/react";
import React from "react";
import {useState} from "react";
import {Contraordenacao} from "../../api/Contraordenacao";

interface IPROPSEntidadeEmissora {
    inputName: string
    interface?: any
    selectedText?: string
    textLabel?: string
}

interface IEntidadeEmissora {
    id: string | null
    descricao: string
}


const getCombos = async (): Promise<IEntidadeEmissora[] | null> => await new Contraordenacao().carregarCombosPessoa("entidadesEmissoras");


const EntidadeEmissora: React.FC<IPROPSEntidadeEmissora> = (props: IPROPSEntidadeEmissora) => {
    const [entidadeEmissora, setEntidadeEmissora] = useState('');
    const [combos, setCombos] = useState<IEntidadeEmissora[] | null>([]);

    React.useEffect(() => {
        getCombos().then((combos) => {
            setCombos(combos);
        }).catch((error) => {
            setCombos([{id: null, descricao: "Erro ao carregar dados"}])
            console.error("Load Entidade emissora combos: \n", error);
        })
    }, []);

    return (
        <IonItem>
            <IonLabel>{props.textLabel}</IonLabel>
            <IonSelect name={props.inputName} value={entidadeEmissora} interface={props.interface}
                       onIonChange={e => setEntidadeEmissora(e.detail.value)}>

                {combos?.map((entidade: any) => {
                    return (
                        <IonSelectOption key={`${entidade.id}`}
                                         value={entidade.id}>{`${entidade.descricao}`}</IonSelectOption>
                    )
                })}
            </IonSelect>
        </IonItem>
    )
}

export default EntidadeEmissora;
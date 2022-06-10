import {IonItem, IonLabel, IonSelect, IonSelectOption} from "@ionic/react";
import React from "react";
import {useState} from "react";
import {Contraordenacao} from "../../../api/Contraordenacao";
import { customPopoverOptions } from "../../../utils/customPopoverOptions";

interface IPROPSEntidadeEmissora {
    inputName: string
    interface?: any
    selected?:any
    setSelected?:any
    textLabel?: string
    disabled?: boolean
}

interface IEntidadeEmissora {
    id: string | null
    descricao: string
}


const getCombos = async (): Promise<IEntidadeEmissora[] | null> => await new Contraordenacao().carregarCombosPessoa("entidadesEmissoras");


const EntidadeEmissora: React.FC<IPROPSEntidadeEmissora> = (props: IPROPSEntidadeEmissora) => {
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
            <IonLabel position="floating">{props.textLabel}</IonLabel>
            <IonSelect interfaceOptions={customPopoverOptions} name={props.inputName} value={props.selected?.id} interface={props.interface}
                onIonChange={(e) => {
                    let value = (combos || []).find((d) => d.id === e.detail.value)
                    props.setSelected(value)
                }}
                disabled={props.disabled}
            >

                {(combos || []).map((entidade: any) => {
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

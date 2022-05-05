import {IonItem, IonLabel, IonSelect, IonSelectOption} from "@ionic/react";
import React from "react";
import {useState} from "react";
import {Contraordenacao} from "../../api/Contraordenacao";

interface IPROPSLocalEmissao {
    inputName: string
    interface?: any
    selectedText?: string
    textLabel?: string
}

interface ILocalEmissao {
    id: string | null
    descricao: string
}

const getCombos = async (): Promise<ILocalEmissao[] | null> => await new Contraordenacao().carregarCombosPessoa("locaisEmissoes");

const LocalEmissao: React.FC<IPROPSLocalEmissao> = (props: IPROPSLocalEmissao) => {
    const [localEmissoa, setLocalEmissao] = useState('');
    const [combos, setCombos] = useState<ILocalEmissao[] | null>([]);

    React.useEffect(() => {
        getCombos().then((combos) => {
            setCombos(combos);
        }).catch((error) => {
            setCombos([{id: null, descricao: "Erro ao carregar dados"}])
            console.error("Load emissao combos: \n", error);
        })
    }, []);

    return (
        <IonItem>
            <IonLabel>{props.textLabel}</IonLabel>
            <IonSelect name={props.inputName} value={localEmissoa} interface={props.interface}
                       onIonChange={e => setLocalEmissao(e.detail.value)}>

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

export default LocalEmissao;
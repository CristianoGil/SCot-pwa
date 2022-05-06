import {IonItem, IonLabel, IonSelect, IonSelectOption} from "@ionic/react";
import React from "react";
import {useState} from "react";
import {Contraordenacao} from "../../../api/Contraordenacao";

interface IPROPSDocIdentificacao {
    inputName: string
    interface?: any
    textLabel?: string
    selected?:any
    setSelected?:any
}

interface IDocIdentificacao {
    id: string | null
    descricao: string
}

const getCombos = async (): Promise<IDocIdentificacao[] | null> => await new Contraordenacao().carregarCombosPessoa("documentosIdentificacoes");

const DocIdentificacao: React.FC<IPROPSDocIdentificacao> = (props: IPROPSDocIdentificacao) => {
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
            <IonSelect name={props.inputName} value={props.selected} interface={props.interface}
                       onIonChange={e => props.setSelected(e.detail.value)}>

                {combos?.map((docId: any) => {
                    return (
                        <IonSelectOption key={`${docId.id}`}
                                         value={docId.id}>{`${docId.descricao}`}</IonSelectOption>
                    )
                })}
            </IonSelect>
        </IonItem>
    )
}

export default DocIdentificacao;
import React, {useState} from "react";
import {IonLabel, IonItem, IonSelect, IonSelectOption} from '@ionic/react';
import country from 'country-list-js';
import {getEmojiFlag} from 'countries-list';
import {Contraordenacao} from "../../../api/Contraordenacao";

interface IPais {
    inputName: string,
    interface?: any,
    selected?:any
    setSelected?:any
    textLabel?: string
}

interface IPROPSPais{
    id: string | null
    descricao: string
}

const getCombos = async (): Promise<IPROPSPais[] | null> => await new Contraordenacao().carregarCombosVeiculo("paises");

const getFlag = (countryName: string) => {
    const countryData: any = country.findByName(countryName) || {};
    let flag = '';
    if (countryData && countryData.code) {
        flag = getEmojiFlag(countryData.code.iso2);
    }
    return flag;
}
const Pais: React.FC<IPais> = (props: IPais) => {
    const [paisDeEmissao, setPaisDeEmissao] = useState();
    const [combos, setCombos] = useState<IPROPSPais[] | null>([]);

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
            <IonSelect value={props.selected} interface={props.interface} name={props.inputName}
                       onIonChange={e => props.setSelected(e.detail.value)}>
                {(combos || []).map((pais: any) => {
                    return (
                        <IonSelectOption key={`${pais.id}`}
                                         value={pais.id}>{`${getFlag(pais.descricao)} ${pais.descricao}`}</IonSelectOption>
                    )
                })}
            </IonSelect>
        </IonItem>
    )
}

export default React.memo(Pais);

import React, {useState} from "react";
import {IonLabel, IonItem, IonSelect, IonSelectOption} from '@ionic/react';
import country from 'country-list-js';
import {getEmojiFlag} from 'countries-list';

interface IPais {
    inputName: string,
    interface?: any,
    selectedText?: string,
    textLabel?: string
}

const getComboPais = () => {
    return country.ls('name');
}

const getFlag = (countryName: string) => {
    const countryData: any = country.findByName(countryName) || {};
    let flag = '';
    if (countryData && countryData.code) {
        flag = getEmojiFlag(countryData.code.iso2);
    }
    return flag;
}
const Pais: React.FC<IPais> = (props: IPais = {inputName: 'pais', interface: 'popover', textLabel: 'País'}) => {
    const [paisDeEmissao, setPaisDeEmissao] = useState();

    return (
        <IonItem>
            <IonLabel>{props.textLabel}</IonLabel>
            <IonSelect value={paisDeEmissao} interface={props.interface} name={props.inputName}
                       onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                {getComboPais().map((pais: any) => {
                    return (
                        <IonSelectOption key={`${pais}`} value={pais}>{`${getFlag(pais)} ${pais}`}</IonSelectOption>
                    )
                })}
            </IonSelect>
        </IonItem>
    )
}

export default React.memo(Pais);
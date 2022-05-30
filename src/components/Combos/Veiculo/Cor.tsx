import React, {useState} from "react";
import {
    IonLabel,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonInput,
    IonIcon,
    IonPopover,
    IonDatetime
} from '@ionic/react';
import country from 'country-list-js';
import {getEmojiFlag} from 'countries-list';
import {Contraordenacao} from "../../../api/Contraordenacao";
// @ts-ignore
import {CirclePicker} from 'react-color';
import {dateFormat} from "../../../utils/apex-formatters";
import {colorPaletteOutline} from "ionicons/icons";

interface ICor {
    inputName: string
    textLabel?: string
    selected?:any
    setSelected?:any
}

interface IPROS {
    id: string | null
    descricao: string
}

const getCombos = async (): Promise<IPROS[] | null> => await new Contraordenacao().carregarCombosVeiculo("cores");


const Cor: React.FC<ICor> = (props: ICor) => {
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
            <IonInput readonly={true} clearInput={true} id={props.inputName} color={props.selected} style={{color: `${props.selected}`}}
                      name={props.inputName} value={props.selected} placeholder={props.textLabel}/>
            <IonButton color='medium' fill="clear" id={`open-${props.inputName}`}>
                <IonIcon icon={colorPaletteOutline}/>
            </IonButton>
            <IonPopover trigger={`open-${props.inputName}`} showBackdrop={false}>
                <CirclePicker colors={((combos || []).map((e) => e.descricao))}
                               onSwatchHover={(color: any) => props.setSelected(color.hex)}/>
            </IonPopover>
        </IonItem>
    )
}

export default React.memo(Cor);


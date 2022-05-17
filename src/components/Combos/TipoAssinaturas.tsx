import React, {useState} from "react";
import {IonLabel, IonItem, IonSelect, IonSelectOption} from '@ionic/react';

import {Contraordenacao} from "../../api/Contraordenacao";
import _ from "underscore";

const tipoAssinaturaOpcao = [
    {id: 0, descricao: 'Assinatura Papel'},
    {id: 1, descricao: 'Assinatura Qualidade'},
    {id: 2, descricao: 'Assinatura Manuscrito'}
]

interface IModelo {
    inputName: string,
    interface?: any,
    selected?: any
    setSelected?: any
    textLabel?: string
}

interface IPROS {
    id: string | null
    descricao: string
}

const getCombos = async (): Promise<IPROS[] | null> => await new Contraordenacao().carregarCombosAssinaturas();


const TipoAssinaturas: React.FC<IModelo> = (props) => {

    const [combos, setCombos] = useState<IPROS[] | null>([]);
    const {selected, setSelected} = props;

    React.useEffect(() => {
        getCombos().then((combos) => {
            setCombos(combos);
        }).catch((error) => {
            setCombos(null)
        })
    }, []);

    return (
        <IonItem>
            <IonLabel>Tipo de Assinatura</IonLabel>
            <IonSelect  value={selected}  interface={props.interface}
                       name={props.inputName}
                       placeholder="Seleciona a assinatura"
                       onIonChange={e =>
                           setSelected(e.detail.value)

                       }>
                {(combos || tipoAssinaturaOpcao).map((t) => {
                    return (
                        <IonSelectOption key={t.id} value={JSON.stringify(t)}>{t.descricao}</IonSelectOption>
                    )
                })}
            </IonSelect>
        </IonItem>
    )
}

export default React.memo(TipoAssinaturas);

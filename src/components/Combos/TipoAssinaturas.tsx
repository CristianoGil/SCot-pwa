import React, {useState} from "react";
import {IonLabel, IonItem, IonSelect, IonSelectOption} from '@ionic/react';

import {Contraordenacao} from "../../api/Contraordenacao";
import _ from "underscore";
import {IID_DESCRICAO} from "../../model/extendable";
import {cleanString} from "../../utils/apex-formatters";
import { customPopoverOptions } from "../../utils/customPopoverOptions";

const tipoAssinaturaOpcao = [
    {id: 0, descricao: 'Papel'},
    {id: 1, descricao: 'Qualificada'},
    {id: 2, descricao: 'Manuscrito'}
]

interface IModelo {
    inputName: string,
    interface?: any,
    selected?: any
    setSelected?: any
    textLabel?: string
    isDisablebAssinaturaPapelManuscrito: boolean
}

interface IPROS_COMBOS {
    opcoesAssinaturas: IID_DESCRICAO[]
    opcoesAssinaturasQualificadas: IID_DESCRICAO[]
}

const getCombos = async (): Promise<IPROS_COMBOS | null> => await new Contraordenacao().carregarCombosAssinaturas();


const TipoAssinaturas: React.FC<IModelo> = (props) => {

    const [combos, setCombos] = useState<IID_DESCRICAO[] | undefined>([]);
    const {selected, setSelected, isDisablebAssinaturaPapelManuscrito} = props;

    React.useEffect(() => {
        getCombos().then((combos) => {
            if (_.has(combos, 'opcoesAssinaturas')) {
                setCombos(combos?.opcoesAssinaturas);
            } else {
                setCombos(undefined)
            }
        }).catch((error) => {
            setCombos(undefined)
        })
    }, []);

    const isPapelManuscritoDisableb = (descricao: string): boolean => {
        if (cleanString(descricao) === cleanString('Papel') || cleanString(descricao) === cleanString('Manuscrito')) {
            return isDisablebAssinaturaPapelManuscrito
        }
        return false
    }


    return (
        <IonItem>
            <IonLabel position="floating">Tipo de Assinatura</IonLabel>
            <IonSelect interfaceOptions={customPopoverOptions} value={selected} interface={props.interface}
                       name={props.inputName}
                       placeholder="Seleciona a assinatura"
                       onIonChange={e =>
                           setSelected(e.detail.value)

                       }>
                {(combos || tipoAssinaturaOpcao).map((t) => {
                    return (
                        <IonSelectOption disabled={isPapelManuscritoDisableb(t.descricao)} key={t.id}
                                         value={JSON.stringify(t)}>{t.descricao}</IonSelectOption>
                    )
                })}
            </IonSelect>
        </IonItem>
    )
}

export default React.memo(TipoAssinaturas);

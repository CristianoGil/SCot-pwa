import React, {useState} from "react";
import {IonLabel, IonItem, IonSelect, IonSelectOption} from '@ionic/react';

import {Contraordenacao} from "../../api/Contraordenacao";
import _ from "underscore";
import {IID_DESCRICAO} from "../../model/extendable";

const tipoAssinaturaOpcao = [
    {id: 0, descricao: 'Chave Móvel Digital'},
    {id: 1, descricao: 'Cartão Cidadão'},
    {id: 2, descricao: 'Cartão CEGER'}
]

interface IModelo {
    inputName: string,
    interface?: any,
    selected?: any
    setSelected?: any
    textLabel?: string
}

interface IPROS_COMBOS {
    opcoesAssinaturas: IID_DESCRICAO[]
    opcoesAssinaturasQualificadas: IID_DESCRICAO[]
}

const getCombos = async (): Promise<IPROS_COMBOS | null> => await new Contraordenacao().carregarCombosAssinaturas();

const FormatoAssinaturasQualificadas: React.FC<IModelo> = (props) => {

    const [combos, setCombos] = useState<IID_DESCRICAO[] | undefined>([]);
    const {selected, setSelected} = props;

    React.useEffect(() => {
        getCombos().then((combos) => {
            if (_.has(combos, 'opcoesAssinaturasQualificadas')) {
                setCombos(combos?.opcoesAssinaturasQualificadas);
            } else {
                setCombos(undefined)
            }
        }).catch((error) => {
            setCombos(undefined)
        })
    }, []);

    return (
        <IonItem>
            <IonLabel>Formato de Assinatura</IonLabel>
            <IonSelect value={selected} interface={props.interface}
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

export default React.memo(FormatoAssinaturasQualificadas);

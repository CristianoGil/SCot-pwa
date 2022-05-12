import {
    IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonDatetime, IonGrid,
    IonIcon, IonInput, IonItem, IonLabel, IonPopover, IonRow,
    IonSelect, IonSelectOption, IonToggle
} from "@ionic/react"
import {calendar} from "ionicons/icons"
import React from "react";
import {useState} from "react";
import _ from "underscore";
import {IDocumentoPessoa} from "../../../../model/person"
import {dateFormat} from "../../../../utils/apex-formatters";
import DatePicker from "../../../Combos/DatePicker";
import EntidadeEmissora from "../../../Combos/Pessoa/EntidadeEmissora";
import LocalEmissao from "../../../Combos/Pessoa/LocalEmissao";
import Pais from "../../../Combos/Pessoa/Pais";
import TituloConducaoCombo from "../../../Combos/Pessoa/TituloConducao";

interface ITituloConducao {
    setParentTituloConducaoData?: any
    currentDocumentosData?: IDocumentoPessoa[] | IDocumentoPessoa

}

const getTituloConducaoPrincipal = (tituloCo: any): IDocumentoPessoa | undefined => {
    return _.find(tituloCo, (t: any) => {
        return t.isTituloConducao && t.principal
    })
}


const TituloConducao: React.FC<ITituloConducao> = (props) => {

    const [isPresentedTituloConducao, setIsPresentedTituloCOnducao] = useState(false);
    const [paisDeEmissao, setPaisDeEmissao] = useState<string>();

    // tituloConducao
    const [tituloConducao, setTituloConducao] = useState<number | string | null>();

    // numero
    const [numero, setNumero] = useState<string>();

    //Pais
    const [paisEmissao, setPaisEmissao] = useState<string | number>();

    // Entidade Emissora
    const [entidadeEmissora, setEntidadeEmissora] = useState<string | number>();

    // Local Emissao
    const [localEmissoa, setLocalEmissao] = useState<string | number>();

    // Date
    const [dataEmissao, setDataEmissao] = useState<string>();

    React.useEffect(() => {
        if (props.currentDocumentosData) {
            const tituloCo = getTituloConducaoPrincipal(props.currentDocumentosData);

            if (tituloCo) {
                setTituloConducao(tituloCo?.tipoDocumento.id);
                setNumero(tituloCo?.numero);
                setPaisEmissao(tituloCo?.paisEmissao.id);
                setEntidadeEmissora(tituloCo?.entidadeEmissao.id);
                setLocalEmissao(tituloCo?.localEmissao.id);
                setDataEmissao(dateFormat(`${tituloCo.dataEmissao}`, 'YYYY/MM/DD'));
            }
        }
    }, [props.currentDocumentosData])

    React.useEffect(() => {
        const _data = {
            isPresentedTituloConducao, tituloConducao, numero, paisEmissao, entidadeEmissora, localEmissoa, dataEmissao
        }

        if (_.has(props, 'setParentTituloConducaoData')) {
            props.setParentTituloConducaoData(_data)
        }
        
    }, [isPresentedTituloConducao, tituloConducao, numero, paisEmissao, entidadeEmissora, localEmissoa, dataEmissao])

    return (
        <IonCard>

            <IonCardHeader>
                <IonCardTitle>Título de condução</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm='12' size-md='9' size-lg='4'>
                            <IonItem lines={'none'}>
                                <IonLabel>O arguido apresentou o título de condução?</IonLabel>
                                <IonToggle
                                    slot="end"
                                    name="presentTituloConducao"
                                    checked={isPresentedTituloConducao}
                                    onIonChange={e => {
                                        setIsPresentedTituloCOnducao(e.detail.checked)
                                    }}
                                />
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>

                        <IonCol size-sm="9" size-md="8" size-lg="4" style={{marginTop: 16}}>
                            <TituloConducaoCombo
                                selected={tituloConducao}
                                setSelected={setTituloConducao}
                                inputName={'tituloConducao-tipos'}
                                textLabel={'Título de condução'}
                                interface="popover"/>
                        </IonCol>

                        <IonCol size-sm="3" size-md="3" size-lg="3">
                            <IonItem>
                                <IonLabel position="floating" itemType="number"
                                          placeholder="Enter Number">Número</IonLabel>
                                <IonInput value={numero} onIonChange={e => setNumero(e.detail.value!)}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='4'>
                            <Pais
                                selected={paisEmissao}
                                setSelected={setPaisEmissao}
                                inputName={'tituloConducao-paisEmissao'}
                                textLabel={'País de emissão'}
                                interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='4'>
                            <EntidadeEmissora
                                selected={entidadeEmissora}
                                setSelected={setEntidadeEmissora}
                                inputName={'tituloConducao-entidadeEmissora'}
                                textLabel={'Entidade de Emissora'}
                                interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='4'>
                            <LocalEmissao
                                selected={localEmissoa}
                                setSelected={setLocalEmissao}
                                inputName={'tituloConducao-localEmissao'}
                                textLabel={'Local de Emissão'}
                                interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='4'>
                            <DatePicker
                                selected={dataEmissao}
                                setSelected={setDataEmissao}
                                inputName={'tituloConducao-dataEmissao'}
                                textLabel="Data de Emissão"/>
                        </IonCol>

                    </IonRow>

                </IonGrid>

            </IonCardContent>
        </IonCard>
    )

}
export default TituloConducao
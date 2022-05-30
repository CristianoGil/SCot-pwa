import {
    IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonDatetime, IonGrid,
    IonIcon, IonInput, IonItem, IonLabel, IonListHeader, IonPopover, IonRadio, IonRadioGroup, IonRow,
    IonSelect, IonSelectOption, IonToggle
} from "@ionic/react"
import {calendar} from "ionicons/icons"
import React from "react";
import {useState} from "react";
import _ from "underscore";
import {IDocumentoPessoa, IMoradaPessoa} from "../../../../model/person"
import {dateFormat} from "../../../../utils/apex-formatters";
import DatePicker from "../../../Combos/DatePicker";
import DocIdentificacao from "../../../Combos/Pessoa/DocIdentificacao";
import EntidadeEmissora from "../../../Combos/Pessoa/EntidadeEmissora";
import LocalEmissao from "../../../Combos/Pessoa/LocalEmissao";
import Pais from "../../../Combos/Pessoa/Pais";
import "./InformacoesAdicionais.scss";

interface IInformacoesAdicionais {
    setParentInformacoesAdicionaisData?: any
    currentData?: any
    representanteLegal?: any
}


const getMoradaPrincipal = (moradas: any) => {
    return _.find(moradas, (t: any) => {
        return t.principal
    })
}

const InformacoesAdicionais: React.FC<IInformacoesAdicionais> = (props) => {


    // FiscalOutro
    const [selectedFiscalOutro, setSelectedFiscalOutro] = useState<string>('fiscal');

    // FirmaNome
    const [firmaNome, setFirmaNome] = useState<string>();

    // Date
    const [dataNascimento, setDataNascimento] = useState<string>();

    // Morada
    const [morada, setMorada] = useState<string>();

    // Numero policial
    const [numeroPolicia, setNumeroPolicia] = useState<string | number>();

    // Fraccao
    const [fraccao, setFraccao] = useState<string | number>();

    // Localidade
    const [localidade, setLocalidade] = useState<string | number>();

    // Codigo Postal
    const [codigoPostal, setCodigoPostal] = useState<string | number>();

    // Pais Emissao
    const [paisEmissao, setPaisEmissao] = useState<string | number>();

    // Pais Emissao
    const [representanteLegal, setRepresentanteLegal] = useState<string | number>();

    React.useEffect(() => {
        if (props.currentData) {
            const moradaPrincipal: IMoradaPessoa = getMoradaPrincipal(props.currentData);
            if (moradaPrincipal) {
                setMorada(moradaPrincipal?.morada)
                setNumeroPolicia(moradaPrincipal?.numeroPolicia)
                setFraccao(moradaPrincipal?.fracao)
                setLocalidade(moradaPrincipal?.localidade)
                setCodigoPostal(moradaPrincipal?.codigoPostal)
            }
        }
    }, [props.currentData])


    React.useEffect(() => {
        if (props.representanteLegal) {
            setRepresentanteLegal(props.representanteLegal)
        }
    }, [props.representanteLegal])


    React.useEffect(() => {


        const _data = {
            firmaNome,
            dataNascimento,
            selectedFiscalOutro,
            numeroPolicia,
            morada,
            fraccao,
            localidade,
            codigoPostal,
            paisEmissao:  !_.isEmpty(paisEmissao) && _.isString(paisEmissao) ? JSON.parse(paisEmissao) : undefined,
            representanteLegal
        }

        if (_.has(props, 'setParentInformacoesAdicionaisData')) {
            props.setParentInformacoesAdicionaisData(_data)
        }
        
    }, [firmaNome, dataNascimento, selectedFiscalOutro, numeroPolicia, morada, fraccao, localidade, codigoPostal, paisEmissao, representanteLegal])
    return (
        <IonCard className="infoAdicionais">

            <IonCardHeader>
                <IonCardTitle>Informações adicionais</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>

                    <IonRow>

                        <IonCol size-sm='12' size-md="9" size-lg="8">
                            <IonItem>
                                <IonLabel
                                    position="floating"
                                    placeholder="Nome / Firma">Nome /
                                    Firma</IonLabel>
                                <IonInput value={firmaNome}
                                          onIonChange={(e) => setFirmaNome(e.detail.value!)}></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol style={{marginTop: 16}} size-sm='12' size-md="3" size-lg="4">
                            <DatePicker
                                selected={dataNascimento}
                                setSelected={setDataNascimento}
                                inputName={'infoAdicionais-dataNascimento'}
                                textLabel="Data de nascimento"/>
                        </IonCol>

                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md="8" size-lg="4">

                            <IonRadioGroup value={selectedFiscalOutro}
                                           onIonChange={e => setSelectedFiscalOutro(e.detail.value)}>

                                <IonRow>
                                    <IonCol size='12'>
                                        <IonListHeader>
                                            <IonLabel>
                                                Domicílio / Sede
                                            </IonLabel>
                                        </IonListHeader>
                                    </IonCol>
                                    <IonCol size='6'>
                                        <IonItem
                                            lines='none'
                                            className="infoAdicionais-domicilio-radio radio-item">
                                            <IonRadio value="fiscal"/>
                                            <IonLabel className="radioBox">Fiscal</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size='6'>
                                        <IonItem
                                            lines='none'
                                            className="infoAdicionais-domicilio-radio radio-item">
                                            <IonRadio value="outro"/>
                                            <IonLabel className="radioBox">Outro</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonRadioGroup>

                        </IonCol>

                        <IonCol size-sm='12' size-md="7" size-lg="6">

                            <IonListHeader>
                                <IonLabel>
                                </IonLabel>
                            </IonListHeader>

                            <IonItem>
                                <IonLabel position="floating" placeholder="Morada">Morada</IonLabel>
                                <IonInput value={morada} onIonChange={(e) => setMorada(e.detail.value!)}></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md="5" size-lg="2">

                            <IonListHeader>
                                <IonLabel>
                                </IonLabel>
                            </IonListHeader>

                            <IonItem>
                                <IonLabel
                                    position="floating"
                                    itemType="number"
                                    placeholder="Nº Polícia">Nº
                                    Polícia</IonLabel>
                                <IonInput
                                    value={numeroPolicia}
                                    onIonChange={(e) => setNumeroPolicia(e.detail.value!)}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md="4" size-lg="2">
                            <IonItem>
                                <IonLabel position="floating" placeholder="Fracção">Fracção</IonLabel>
                                <IonInput value={fraccao}
                                          onIonChange={(e) => setFraccao(e.detail.value!)}></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md="4" size-lg="4">
                            <IonItem>
                                <IonLabel position="floating" placeholder="Localidade">Localidade</IonLabel>
                                <IonInput value={localidade}
                                          onIonChange={(e) => setLocalidade(e.detail.value!)}></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md="4" size-lg="3">
                            <IonItem>
                                <IonLabel position="floating" itemType="number" placeholder="Código Postal">Código
                                    Postal</IonLabel>
                                <IonInput value={codigoPostal}
                                          onIonChange={(e) => setCodigoPostal(e.detail.value!)}></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md="4" size-lg="3" style={{marginTop: 16}}>
                            <Pais
                                selected={paisEmissao}
                                setSelected={setPaisEmissao}
                                inputName={'infoAdicionais-paisEmissao'}
                                textLabel={'País de emissão'}
                                interface="popover"/>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md="8" size-lg="6">
                            <IonItem>
                                <IonLabel position="floating" placeholder="Representante legal">Representante
                                    legal</IonLabel>
                                <IonInput value={representanteLegal}
                                          onIonChange={(e) => setRepresentanteLegal(e.detail.value!)}></IonInput>
                            </IonItem>
                        </IonCol>

                    </IonRow>

                </IonGrid>

            </IonCardContent>
        </IonCard>
    )

}

export default InformacoesAdicionais

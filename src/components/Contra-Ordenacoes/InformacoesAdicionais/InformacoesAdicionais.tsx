import {
    IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonDatetime, IonGrid,
    IonIcon, IonInput, IonItem, IonLabel, IonListHeader, IonPopover, IonRadio, IonRadioGroup, IonRow,
    IonSelect, IonSelectOption, IonToggle
} from "@ionic/react"
import {calendar} from "ionicons/icons"
import {useState} from "react";
import {IDocumentoPessoa} from "../../../model/person"
import DatePicker from "../../Combos/DatePicker";
import DocIdentificacao from "../../Combos/DocIdentificacao";
import EntidadeEmissora from "../../Combos/EntidadeEmissora";
import LocalEmissao from "../../Combos/LocalEmissao";
import Pais from "../../Combos/Pais";
import "./InformacoesAdicionais.scss";

interface IInformacoesAdicionais {
    setParentInformacoesAdicionaisData?: any
}

const InformacoesAdicionais: React.FC<IInformacoesAdicionais> = (props) => {

    const [isPresentedInformacoesAdicionais, setIsPresentedInformacoesAdicionais] = useState(false);
    const [selectedSingularColetivo, setSelectedSingularColetivo] = useState<string>();

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
                                <IonLabel position="floating" placeholder="Nome / Firma">Nome /
                                    Firma</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol style={{marginTop: 16}} size-sm='12' size-md="3" size-lg="4">
                            <DatePicker inputName={'infoAdicionais-dataEmissao'} textLabel="Data de Emissão"/>
                        </IonCol>

                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md="8" size-lg="4">

                            <IonRadioGroup value={selectedSingularColetivo}
                                           onIonChange={e => setSelectedSingularColetivo(e.detail.value)}>

                                <IonRow>
                                    <IonCol size='12'>
                                        <IonListHeader>
                                            <IonLabel>
                                                Domicílio / Sede
                                            </IonLabel>
                                        </IonListHeader>
                                    </IonCol>
                                    <IonCol size='6'>
                                        <IonItem lines='none' className="infoAdicionais-domicilio-radio radio-item">
                                            <IonRadio value="singular"/>
                                            <IonLabel className="radioBox">Singular</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size='6'>
                                        <IonItem lines='none' className="infoAdicionais-domicilio-radio radio-item">
                                            <IonRadio value="colection"/>
                                            <IonLabel className="radioBox">Coletivo</IonLabel>
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
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md="5" size-lg="2">

                            <IonListHeader>
                                <IonLabel>
                                </IonLabel>
                            </IonListHeader>

                            <IonItem>
                                <IonLabel position="floating" itemType="number" placeholder="Nº Polícia">Nº
                                    Polícia</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md="4" size-lg="2">
                            <IonItem>
                                <IonLabel position="floating" placeholder="Fracção">Fracção</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md="4" size-lg="4">
                            <IonItem>
                                <IonLabel position="floating" placeholder="Localidade">Localidade</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md="4" size-lg="3">
                            <IonItem>
                                <IonLabel position="floating" itemType="number" placeholder="Código Postal">Código
                                    Postal</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md="4" size-lg="3" style={{marginTop: 16}}>
                            <Pais inputName={'infoAdicionais-paisEmissao'} textLabel={'País de emissão'}
                                  interface="popover"/>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md="8" size-lg="6">
                            <IonItem>
                                <IonLabel position="floating" placeholder="Representante legal">Representante
                                    legal</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>

                    </IonRow>

                </IonGrid>

            </IonCardContent>
        </IonCard>
    )

}

export default InformacoesAdicionais
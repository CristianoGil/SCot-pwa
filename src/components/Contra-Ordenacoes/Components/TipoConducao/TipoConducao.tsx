import {
    IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonDatetime, IonGrid,
    IonIcon, IonInput, IonItem, IonLabel, IonPopover, IonRow,
    IonSelect, IonSelectOption, IonToggle
} from "@ionic/react"
import {calendar} from "ionicons/icons"
import {useState} from "react";
import {IDocumentoPessoa} from "../../../../model/person"
import DatePicker from "../../../Combos/DatePicker";
import EntidadeEmissora from "../../../Combos/EntidadeEmissora";
import LocalEmissao from "../../../Combos/LocalEmissao";
import Pais from "../../../Combos/Pais";

interface ITipoConducao {
    setParentTipoConducaoData?: any

}

const TipoConducao: React.FC<ITipoConducao> = (props) => {

    const [isPresentedTipoConducao, setIsPresentedTipoCOnducao] = useState(false);
    const [paisDeEmissao, setPaisDeEmissao] = useState<string>();

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
                                    name="presentTipoConducao"
                                    checked={isPresentedTipoConducao}
                                    onIonChange={e => {
                                        setIsPresentedTipoCOnducao(e.detail.checked)
                                    }}
                                />
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>

                        <IonCol size-sm="9" size-md="8" size-lg="4" style={{marginTop: 16}}>
                            <IonItem>
                                <IonLabel>Título de condução</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="cartaConducao">Carta de Condução</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm="3" size-md="3" size-lg="3">
                            <IonItem>
                                <IonLabel position="floating" itemType="number"
                                          placeholder="Enter Number">Número</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='4'>
                            <Pais inputName={'tipoConducao-paisEmissao'} textLabel={'País de emissão'} interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='4'>
                            <EntidadeEmissora inputName={'tipoConducao-entidadeEmissora'}
                                              textLabel={'Entidade de Emissora'} interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='4'>
                            <LocalEmissao inputName={'tipoConducao-localEmissao'} textLabel={'Local de Emissão'} interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='4'>
                            <DatePicker inputName={'tipoConducao-dataEmissao'} textLabel="Data de Emissão"/>
                        </IonCol>

                    </IonRow>

                </IonGrid>

            </IonCardContent>
        </IonCard>
    )

}
export default TipoConducao
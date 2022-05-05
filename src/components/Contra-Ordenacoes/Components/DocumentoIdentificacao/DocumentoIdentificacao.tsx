import {
    IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonDatetime, IonGrid,
    IonIcon, IonInput, IonItem, IonLabel, IonPopover, IonRow,
    IonSelect, IonSelectOption, IonToggle
} from "@ionic/react"
import {calendar} from "ionicons/icons"
import {useState} from "react";
import {IDocumentoPessoa} from "../../../../model/person"
import DatePicker from "../../../Combos/DatePicker";
import DocIdentificacao from "../../../Combos/Pessoa/DocIdentificacao";
import EntidadeEmissora from "../../../Combos/Pessoa/EntidadeEmissora";
import LocalEmissao from "../../../Combos/Pessoa/LocalEmissao";
import Pais from "../../../Combos/Pessoa/Pais";

interface IDocumentoIdentificacao {
    setParentDocumentoIdentificacaoData?: any
}

const DocumentoIdentificacao: React.FC<IDocumentoIdentificacao> = (props) => {

    const [isPresentedDocumentoIdentificacao, setIsPresentedDocumentoIdentificacao] = useState(false);
    const [paisDeEmissao, setPaisDeEmissao] = useState<string>();

    return (
        <IonCard>

            <IonCardHeader>
                <IonCardTitle>Documento de Identificação</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm='12' size-md='9' size-lg='4'>
                            <IonItem lines={'none'}>
                                <IonLabel>O arguido apresentou o documento de identificação?</IonLabel>
                                <IonToggle
                                    slot="end"
                                    name="presentDocIdentificacao"
                                    checked={isPresentedDocumentoIdentificacao}
                                    onIonChange={e => {
                                        setIsPresentedDocumentoIdentificacao(e.detail.checked)
                                    }}
                                />
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>

                        <IonCol size-sm="9" size-md="8" size-lg="4" style={{marginTop: 16}}>
                            <DocIdentificacao inputName="inputDocIdentificacao" interface="popover"
                                              textLabel="Doc. de Identificação"/>
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
                            <Pais inputName={'docIdentificacao-paisEmissao'} textLabel={'País de emissão'}
                                  interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='4'>
                            <EntidadeEmissora inputName={'docIdentificacao-entidadeEmissora'}
                                              textLabel={'Entidade de Emissora'} interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='4'>
                            <LocalEmissao inputName={'docIdentificacao-localEmissao'} textLabel={'Local de Emissão'}
                                          interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='4'>
                            <DatePicker inputName={'docIdentificacao-dataEmissao'} textLabel="Data de Emissão"/>
                        </IonCol>

                    </IonRow>

                </IonGrid>

            </IonCardContent>
        </IonCard>
    )

}
export default DocumentoIdentificacao
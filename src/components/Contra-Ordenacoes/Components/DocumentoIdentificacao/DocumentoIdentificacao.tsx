import {
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonToggle
} from "@ionic/react"
import React from "react";
import { useState } from "react";
import _ from "underscore";
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
    // Pais de emissao
    const [paisDeEmissao, setPaisDeEmissao] = useState<any>();

    // Docs ID
    const [docIdentificacao, setDocIdentificacao] = useState<any>();

    // Numero
    const [numero, setNumero] = useState<any>();

    // Entidade emissora
    const [entidadeEmissora, setEntidadeEmissora] = useState<any>();

    // Local de emissao
    const [localEmissao, setLocalEmissao] = useState<any>();

    // Data de emissao
    const [dataEmissao, setDataEmissao] = useState<any>();

    // Desabilita componentes
    const [paisEmissaoIsPortugal, setPaisEmissaoIsPortugal] = useState<boolean>(false);

    React.useEffect(() => {

        if (paisDeEmissao != undefined) {

            if (paisDeEmissao.descricao == 'Portugal') {
                setPaisEmissaoIsPortugal(true);
            } else {
                setPaisEmissaoIsPortugal(false);
            }
        } else {
            setPaisEmissaoIsPortugal(false);
        }

        const _data = {
            isPresentedDocumentoIdentificacao,
            docIdentificacao: docIdentificacao,
            numero,
            paisEmissao: paisDeEmissao,
            entidadeEmissora: entidadeEmissora,
            localEmissao: localEmissao
        }

        if (_.has(props, 'setParentDocumentoIdentificacaoData')) {
            props.setParentDocumentoIdentificacaoData(_data)
        }

    }, [isPresentedDocumentoIdentificacao, docIdentificacao, numero, paisDeEmissao, entidadeEmissora, localEmissao]);

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

                        <IonCol size-sm="9" size-md="8" size-lg="4" style={{ marginTop: 16 }}>
                            <DocIdentificacao
                                selected={docIdentificacao}
                                setSelected={setDocIdentificacao}
                                inputName="inputDocIdentificacao"
                                interface="popover"
                                textLabel="Doc. de Identificação" />
                        </IonCol>

                        <IonCol size-sm="3" size-md="3" size-lg="3">
                            <IonItem>
                                <IonLabel position="floating" itemType="number"
                                    placeholder="Enter Number">Número</IonLabel>
                                <IonInput name="numero" value={numero} onIonChange={(e) => setNumero(e.detail.value!)}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md='12' size-lg='4'>
                            <Pais
                                selected={paisDeEmissao}
                                setSelected={setPaisDeEmissao}
                                inputName={'docIdentificacao-paisEmissao'}
                                textLabel={'País de emissão'}
                                interface="popover" />
                        </IonCol>

                        <IonCol size-sm='12' size-md='12' size-lg='4'>
                            <EntidadeEmissora
                                selected={entidadeEmissora}
                                setSelected={setEntidadeEmissora}
                                inputName={'docIdentificacao-entidadeEmissora'}
                                textLabel={'Entidade de Emissora'}
                                interface="popover"
                                disabled={paisEmissaoIsPortugal}
                            />
                        </IonCol>

                        <IonCol size-sm='12' size-md='12' size-lg='4'>
                            <LocalEmissao
                                selected={localEmissao}
                                setSelected={setLocalEmissao}
                                inputName={'docIdentificacao-localEmissao'}
                                textLabel={'Local de Emissão'}
                                interface="popover"
                                disabled={paisEmissaoIsPortugal}
                            />
                        </IonCol>

                        <IonCol size-sm='12' size-md='12' size-lg='4'>
                            <DatePicker
                                selected={dataEmissao}
                                setSelected={setDataEmissao}
                                inputName={'docIdentificacao-dataEmissao'}
                                textLabel="Data de Emissão"
                                disabled={paisEmissaoIsPortugal}
                            />
                        </IonCol>

                    </IonRow>

                </IonGrid>

            </IonCardContent>
        </IonCard>
    )

}
export default DocumentoIdentificacao

import {
    IonButton, IonButtons, IonCard,
    IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonCol, IonGrid, IonIcon,
    IonInput, IonItem, IonLabel, IonRow
} from "@ionic/react";
import {alertCircle, checkmarkCircle} from "ionicons/icons";
import React, { useState } from "react";
import _ from "underscore";
import { cleanString } from "../../../utils/apex-formatters";
import FormatoAssinaturasQualificadas from "../../Combos/FormatoAssinaturasQualificadas";
import TipoAssinaturas from "../../Combos/TipoAssinaturas";

interface IProps {
    arguidoNaoAssinouNotificacao: any
    setArguidoNaoAssinouNotificacao: any
    assinaturaManuscritaArguido: any
    tipoAssinaturaArguido: any
    setTipoAssinaturaArguido: any
    setAssinaturaManuscritaArguido?: any
    assinaturaQualificadaArguido?: any
    setAssinaturaQualificadaArguido?: any
    isDisablebAssinaturaPapelManuscrito: boolean
    handlerSignPDF: (value1: string, value2: string, value3?: number) => void
}

const AssinaturaArguido: React.FC<IProps> = (props) => {
    const {isDisablebAssinaturaPapelManuscrito} = props;
    const {
        arguidoNaoAssinouNotificacao,
        setArguidoNaoAssinouNotificacao,
        assinaturaManuscritaArguido,
        tipoAssinaturaArguido,
        setTipoAssinaturaArguido,
        setAssinaturaManuscritaArguido,
    } = props;


    //START: Qualificada
    const {handlerSignPDF, assinaturaQualificadaArguido} = props;
    const [formatoAssinaturaQualificada, setFormatoAssinaturaQualificada] = useState<any>();
    const [chaveDigitalPhoneNumber, setChaveDigitalPhoneNumber] = useState<number | undefined>(undefined);

    // Mostrar Formato assinatura
    const [isTipoAssinatura_qualificada, setIsTipoAssinatura_qualificada] = useState(false);
    React.useEffect(() => {
        let _is = false;

        if (!_.isEmpty(tipoAssinaturaArguido)) {
            const _data = JSON.parse(tipoAssinaturaArguido);

            if (_.isObject(_data)) {
                if (cleanString(_data.descricao) === cleanString("Qualificada")) {
                    _is = true
                }  else {
                    setFormatoAssinaturaQualificada('')
                }
            }
        }

        setIsTipoAssinatura_qualificada(_is)
    }, [tipoAssinaturaArguido])


    // Mostrar Numero de telefone
    const [isFormatoQualificada_digital, setIsFormatoQualificada_digital] = useState(false);
    React.useEffect(() => {
        let _is = false;

        if (!_.isEmpty(formatoAssinaturaQualificada)) {
            const _data = JSON.parse(formatoAssinaturaQualificada);
            if (_.isObject(_data)) {
                if (cleanString(_data.descricao) === cleanString("Chave Móvel Digital")) {
                    _is = true
                }
            }
        }

        setIsFormatoQualificada_digital(_is)
    }, [formatoAssinaturaQualificada])
    
    // START: ALL
    const [isSigned, setIsSigned] = useState(false);
    React.useEffect(() => {
        if (!_.isEmpty(assinaturaManuscritaArguido) || !_.isEmpty(assinaturaQualificadaArguido)) {
            setIsSigned(true)
        } else {
            setIsSigned(false)
        }

    }, [assinaturaManuscritaArguido, assinaturaQualificadaArguido])


    const isSignBtnDisabled = (_isFormatoQualificada_digital: boolean, _chaveDigitalPhoneNumber: number | undefined, _assinaturaQualificadaArguido: any): boolean => {
        if (isFormatoQualificada_digital) {
            if (!_.isEmpty(_assinaturaQualificadaArguido)) {
                return true
            } else {
                return !chaveDigitalPhoneNumber
            }
        } else if(_.isEmpty(formatoAssinaturaQualificada)) {
            return true
        }

        return false
    }
    
    return (
        <>
            <IonGrid>
                <IonRow>
                    <IonCol size-sm="12" size-md="10" size-lg="8">
                        <IonItem className="ionItem-no-border">
                            <IonLabel> <strong>O arguido não assina a contraordenação</strong> </IonLabel>
                            <IonCheckbox checked={arguidoNaoAssinouNotificacao}
                                         onIonChange={e => setArguidoNaoAssinouNotificacao(e.detail.checked)}
                                         slot="start"/>
                        </IonItem>
                    </IonCol>
                </IonRow>
            </IonGrid>


            {arguidoNaoAssinouNotificacao ? '' :

                <IonCard style={{margin: 30}}>

                    <IonCardHeader>
                        <IonCardTitle style={{paddingLeft: 15}}> Arguido </IonCardTitle>

                        {!isSigned  ?
                            <IonIcon style={{
                                position: "absolute",
                                left: 10,
                                top: 20,
                                fontSize: 16
                            }} color="warning" icon={alertCircle}></IonIcon>
                            :
                            <IonIcon style={{
                                position: "absolute",
                                left: 10,
                                top: 20,
                                fontSize: 16
                            }} color="success" icon={checkmarkCircle}></IonIcon>
                        }

                    </IonCardHeader>
                    <IonCardContent style={{paddingTop: 0}}>
                        <IonGrid>
                            <IonRow>
                                {/*START: Tipo assinatura*/}
                                <IonCol size-sm="12" size-md="5" size-lg="5">
                                    <TipoAssinaturas interface={"popover"} inputName={"tipoAssinaturaArguido"}
                                                     selected={tipoAssinaturaArguido}
                                                     setSelected={setTipoAssinaturaArguido}
                                                     isDisablebAssinaturaPapelManuscrito={isDisablebAssinaturaPapelManuscrito}
                                    />
                                </IonCol>
                                {/*END: Tipo assinatura*/}
                                
                                {/*START: Tipos de assinaturas qualificadas*/}
                                {isTipoAssinatura_qualificada ?
                                    <>
                                        <IonCol size-sm="12" size-md="4" size-lg="4">
                                            <FormatoAssinaturasQualificadas setSelected={setFormatoAssinaturaQualificada}
                                                                            selected={formatoAssinaturaQualificada}
                                                                            interface={"popover"}
                                                                            inputName={"formatoAssinaturaArguido"}/>
                                        </IonCol>

                                        {isFormatoQualificada_digital ?
                                            <IonCol size-sm="12" size-md="3" size-lg="3">
                                                <IonInput required={true} value={chaveDigitalPhoneNumber} type="number"
                                                          autofocus={true}
                                                          placeholder="Número de telefone" onIonChange={(e: any) => {
                                                    setChaveDigitalPhoneNumber(e.detail.value)
                                                }
                                                }></IonInput>
                                            </IonCol>
                                            : ''}

                                        {/*START:  BTN*/}

                                        <IonCol size="12">
                                            <IonButtons>
                                                <IonButton
                                                    disabled={isSignBtnDisabled(isFormatoQualificada_digital, chaveDigitalPhoneNumber, assinaturaQualificadaArguido)}
                                                    fill="outline" strong={true} color="primary"
                                                    onClick={_.throttle((e:any) => {
                                                        handlerSignPDF(formatoAssinaturaQualificada, 'arguido',chaveDigitalPhoneNumber)
                                                    }, 2000)}>

                                                    Assinar
                                                </IonButton>
                                            </IonButtons>
                                        </IonCol>
                                        {/*END:  BTN*/}

                                    </>
                                    : ''}

                                {/*END: Tipos de assinaturas qualificadas*/}

                            </IonRow>

                        </IonGrid>


                    </IonCardContent>
                </IonCard>
            }
        </>
    )
}

export default AssinaturaArguido;

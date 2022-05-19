import {
    IonButton, IonButtons, IonCard,
    IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonRow
} from "@ionic/react";
import {alertCircle, checkmarkCircle} from "ionicons/icons";
import React from "react";
import {useState} from "react";
import _ from "underscore";
import { cleanString } from "../../../utils/apex-formatters";
import FormatoAssinaturasQualificadas from "../../Combos/FormatoAssinaturasQualificadas";
import TipoAssinaturas from "../../Combos/TipoAssinaturas";

interface IProps {
    testemunhaRef: number
    assinaturaManuscritaTestemunha: any
    tipoAssinaturaTestemunha: any
    setTipoAssinaturaTestemunha: any
    setAssinaturaManuscritaTestemunha?: any
    assinaturaQualificadaTestemunha?: any
    setAssinaturaQualificadaTestemunha?: any
    isDisablebAssinaturaPapelManuscrito: boolean
    handlerSignPDF: (value1: string, value2: string, value3?: number) => void
}

const AssinaturaTestemunha: React.FC<IProps> = (props) => {
    const {isDisablebAssinaturaPapelManuscrito} = props;
    const {
        testemunhaRef,
        assinaturaManuscritaTestemunha,
        tipoAssinaturaTestemunha,
        setTipoAssinaturaTestemunha,
        setAssinaturaManuscritaTestemunha
    } = props;

    //START: Qualificada
    const {handlerSignPDF, assinaturaQualificadaTestemunha} = props;
    const [formatoAssinaturaQualificada, setFormatoAssinaturaQualificada] = useState<any>();
    const [chaveDigitalPhoneNumber, setChaveDigitalPhoneNumber] = useState<number | undefined>(undefined);

    // Mostrar Formato assinatura
    const [isTipoAssinatura_qualificada, setIsTipoAssinatura_qualificada] = useState(false);
    React.useEffect(() => {
        let _is = false;

        if (!_.isEmpty(tipoAssinaturaTestemunha)) {
            const _data = JSON.parse(tipoAssinaturaTestemunha);

            if (_.isObject(_data)) {
                if (cleanString(_data.descricao) === cleanString("Qualificada")) {
                    _is = true
                }  else {
                    setFormatoAssinaturaQualificada('')
                }
            }
        }

        setIsTipoAssinatura_qualificada(_is)
    }, [tipoAssinaturaTestemunha])

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
        if (!_.isEmpty(assinaturaManuscritaTestemunha) || !_.isEmpty(assinaturaQualificadaTestemunha)) {
            setIsSigned(true)
        } else {
            setIsSigned(false)
        }

    }, [assinaturaManuscritaTestemunha, assinaturaQualificadaTestemunha])

    const isSignBtnDisabled = (_isFormatoQualificada_digital: boolean, _chaveDigitalPhoneNumber: number | undefined, _assinaturaQualificadaTestemunha: any): boolean => {
        if (isFormatoQualificada_digital) {
            if (!_.isEmpty(_assinaturaQualificadaTestemunha)) {
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


        <IonCard style={{margin: 30}}>

            <IonCardHeader>
                <IonCardTitle style={{paddingLeft: 15}}> Testemunha {testemunhaRef}</IonCardTitle>

                {!isSigned ?
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
                            <TipoAssinaturas interface={"popover"} inputName={"tipoAssinaturaTestemunha"}
                                             selected={tipoAssinaturaTestemunha}
                                             setSelected={setTipoAssinaturaTestemunha}
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
                                                                    inputName={"formatoAssinaturaTestemunha"}/>
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
                                            disabled={isSignBtnDisabled(isFormatoQualificada_digital, chaveDigitalPhoneNumber, assinaturaQualificadaTestemunha)}
                                            fill="outline" strong={true} color="primary"
                                            onClick={_.throttle((e:any) => {
                                                handlerSignPDF(formatoAssinaturaQualificada, 'testemunha' + testemunhaRef, chaveDigitalPhoneNumber)
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

    )
}

export default AssinaturaTestemunha;

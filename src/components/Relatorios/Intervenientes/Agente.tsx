import {
    IonButton, IonButtons, IonCard,
    IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonRow
} from "@ionic/react";
import {alertCircle, checkmarkCircle} from "ionicons/icons";
import React from "react";
import {useState} from "react";
import _ from "underscore";
import TipoAssinaturas from "../../Combos/TipoAssinaturas";
import FormatoAssinaturasQualificadas from "../../Combos/FormatoAssinaturasQualificadas";
import {cleanString} from "../../../utils/apex-formatters";

interface IProps {
    assinaturaManuscritaAgente: any
    tipoAssinaturaAgente: any
    setTipoAssinaturaAgente: any
    setAssinaturaManuscritaAgente?: any
    assinaturaQualificadaAgente?: any
    setAssinaturaQualificadaAgente?: any
    handlerSignPDF: (value1: string, value2: string, value3?: number) => void
}

const AssinaturaAgente: React.FC<IProps> = (props) => {

    // START: Manuscrito
    const {
        assinaturaManuscritaAgente,
        tipoAssinaturaAgente,
        setTipoAssinaturaAgente,
        setAssinaturaManuscritaAgente
    } = props;

    //START: Qualificada
    const {handlerSignPDF, assinaturaQualificadaAgente} = props;
    const [formatoAssinaturaQualificada, setFormatoAssinaturaQualificada] = useState<any>();
    const [chaveDigitalPhoneNumber, setChaveDigitalPhoneNumber] = useState<number | undefined>(undefined);

    // Mostrar Formato assinatura
    const [isTipoAssinatura_qualificada, setIsTipoAssinatura_qualificada] = useState(false);
    React.useEffect(() => {
        let _is = false;

        if (!_.isEmpty(tipoAssinaturaAgente)) {
            const _data = JSON.parse(tipoAssinaturaAgente);

            if (_.isObject(_data)) {
                if (cleanString(_data.descricao) === cleanString("Qualificada")) {
                    _is = true
                }  else {
                    setFormatoAssinaturaQualificada('')
                }
            }
        }

        setIsTipoAssinatura_qualificada(_is)
    }, [tipoAssinaturaAgente])

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
        if (!_.isEmpty(assinaturaManuscritaAgente) || !_.isEmpty(assinaturaQualificadaAgente)) {
            setIsSigned(true)
        } else {
            setIsSigned(false)
        }

    }, [assinaturaManuscritaAgente, assinaturaQualificadaAgente])

    const isSignBtnDisabled = (_isFormatoQualificada_digital: boolean, _chaveDigitalPhoneNumber: number | undefined, _assinaturaQualificadaAgente: any): boolean => {
        if (isFormatoQualificada_digital) {
            if (!_.isEmpty(_assinaturaQualificadaAgente)) {
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
                <IonCardTitle style={{paddingLeft: 15}}> Agente</IonCardTitle>

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
                            <TipoAssinaturas interface={"popover"} inputName={"tipoAssinaturaAgente"}
                                             selected={tipoAssinaturaAgente}
                                             setSelected={setTipoAssinaturaAgente}/>
                        </IonCol>
                        {/*END: Tipo assinatura*/}

                        {/*START: Tipos de assinaturas qualificadas*/}
                        {isTipoAssinatura_qualificada ?
                            <>
                                <IonCol size-sm="12" size-md="4" size-lg="4">
                                    <FormatoAssinaturasQualificadas setSelected={setFormatoAssinaturaQualificada}
                                                                    selected={formatoAssinaturaQualificada}
                                                                    interface={"popover"}
                                                                    inputName={"formatoAssinaturaAgente"}/>
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
                                            disabled={isSignBtnDisabled(isFormatoQualificada_digital, chaveDigitalPhoneNumber, assinaturaQualificadaAgente)}
                                            fill="outline" strong={true} color="primary"
                                            onClick={_.throttle((e:any) => {
                                                handlerSignPDF(formatoAssinaturaQualificada, 'agente', chaveDigitalPhoneNumber)
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

export default AssinaturaAgente;

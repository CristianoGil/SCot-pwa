import {
    IonButton, IonButtons, IonCard,
    IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonRow
} from "@ionic/react";
import {alertCircle, checkmarkCircle} from "ionicons/icons";
import React from "react";
import {useState} from "react";
import _ from "underscore";
import TipoAssinaturas from "../../Combos/TipoAssinaturas";

interface IProps {
    testemunhaRef: number
    assinaturaManuscritaTestemunha: any
    tipoAssinaturaTestemunha: any
    setTipoAssinaturaTestemunha: any
    setAssinaturaManuscritaTestemunha?: any
    assinaturaQualificadaTestemunha?: any
}

const AssinaturaTestemunha: React.FC<IProps> = (props) => {
    const {
        testemunhaRef,
        assinaturaQualificadaTestemunha,
        assinaturaManuscritaTestemunha,
        tipoAssinaturaTestemunha,
        setTipoAssinaturaTestemunha,
        setAssinaturaManuscritaTestemunha
    } = props;

    const [isSigned, setIsSigned] = useState(false);
    React.useEffect(() => {
        if (!_.isEmpty(assinaturaManuscritaTestemunha) || !_.isEmpty(assinaturaQualificadaTestemunha)) {
            setIsSigned(true)
        } else {
            setIsSigned(false)
        }

    }, [assinaturaManuscritaTestemunha, assinaturaQualificadaTestemunha])


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

                        <IonCol size-sm="12" size-md="8" size-lg="6">
                            <TipoAssinaturas interface={"popover"} inputName={"tipoAssinaturaTestemunha"}
                                             selected={tipoAssinaturaTestemunha}
                                             setSelected={setTipoAssinaturaTestemunha}/>
                        </IonCol>

                        <IonCol size="12">
                            <IonButtons>
                                <IonButton disabled={!isSigned}
                                           fill="outline" strong={true} color="warning"
                                           onClick={(e) => {
                                               setAssinaturaManuscritaTestemunha('');
                                               setTipoAssinaturaTestemunha('')
                                           }}>
                                    Limpar a assinatura actual
                                </IonButton>
                            </IonButtons>
                        </IonCol>

                    </IonRow>

                </IonGrid>


            </IonCardContent>
        </IonCard>

    )
}

export default AssinaturaTestemunha;

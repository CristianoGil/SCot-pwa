import {
    IonButton, IonButtons, IonCard,
    IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonRow
} from "@ionic/react";
import {alertCircle, checkmarkCircle} from "ionicons/icons";
import React, { useState } from "react";
import _ from "underscore";
import TipoAssinaturas from "../../Combos/TipoAssinaturas";

interface IProps {
    arguidoNaoAssinouNotificacao: any;
    setArguidoNaoAssinouNotificacao: any;
    assinaturaManuscritaArguido: any;
    tipoAssinaturaArguido: any;
    setTipoAssinaturaArguido: any;
    setAssinaturaManuscritaArguido?: any;
    assinaturaQualificadaArguido?: any
}

const AssinaturaArguido: React.FC<IProps> = (props) => {
    const {
        assinaturaQualificadaArguido,
        arguidoNaoAssinouNotificacao,
        setArguidoNaoAssinouNotificacao,
        assinaturaManuscritaArguido,
        tipoAssinaturaArguido,
        setTipoAssinaturaArguido,
        setAssinaturaManuscritaArguido,
    } = props;

    const [isSigned, setIsSigned] = useState(false);
    React.useEffect(() =>{
        if (!_.isEmpty(assinaturaManuscritaArguido) || !_.isEmpty(assinaturaQualificadaArguido)) {
            setIsSigned(true)
        } else {
            setIsSigned(false)
        }

    }, [assinaturaManuscritaArguido, assinaturaQualificadaArguido])


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

                                <IonCol size-sm="12" size-md="8" size-lg="6">
                                    <TipoAssinaturas interface={"popover"} inputName={"tipoAssinaturaArguido"}
                                                     selected={tipoAssinaturaArguido}
                                                     setSelected={setTipoAssinaturaArguido}/>
                                </IonCol>

                                <IonCol size="12">
                                    <IonButtons>
                                        <IonButton disabled={!isSigned}
                                                   fill="outline" strong={true} color="warning"
                                                   onClick={(e) => {
                                                       setAssinaturaManuscritaArguido('')
                                                       setTipoAssinaturaArguido('')
                                                   }}>
                                            Limpar a assinatura actual
                                        </IonButton>
                                    </IonButtons>
                                </IonCol>

                            </IonRow>

                        </IonGrid>


                    </IonCardContent>
                </IonCard>
            }
        </>
    )
}

export default AssinaturaArguido;

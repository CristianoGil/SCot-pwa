import {
    IonButton, IonButtons, IonCard,
    IonCardContent, IonCardHeader, IonCardTitle,  IonCol, IonGrid, IonIcon, IonRow
} from "@ionic/react";
import {alertCircle, checkmarkCircle} from "ionicons/icons";
import _ from "underscore";
import TipoAssinaturas from "../../Combos/TipoAssinaturas";

interface IProps {
    assinaturaManuscritaAgente: any
    tipoAssinaturaAgente: any
    setTipoAssinaturaAgente: any
    setAssinaturaManuscritaAgente: any
}

const AssinaturaAgente: React.FC<IProps> = (props) => {
    const {
        assinaturaManuscritaAgente,
        tipoAssinaturaAgente,
        setTipoAssinaturaAgente,
        setAssinaturaManuscritaAgente
    } = props;

    return (


        <IonCard style={{margin: 30}}>

            <IonCardHeader>
                <IonCardTitle style={{paddingLeft: 15}}> Agente</IonCardTitle>

                {_.isEmpty(assinaturaManuscritaAgente) ?
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
                            <TipoAssinaturas interface={"popover"} inputName={"tipoAssinaturaAgente"}
                                             selected={tipoAssinaturaAgente}
                                             setSelected={setTipoAssinaturaAgente}/>
                        </IonCol>

                        <IonCol size="12">
                            <IonButtons>
                                <IonButton disabled={!!_.isEmpty(assinaturaManuscritaAgente)}
                                           fill="outline" strong={true} color="warning"
                                           onClick={(e) => {
                                               setAssinaturaManuscritaAgente('');
                                               setTipoAssinaturaAgente('')
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

export default AssinaturaAgente;

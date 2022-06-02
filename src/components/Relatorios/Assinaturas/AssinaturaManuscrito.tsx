import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonLabel,
    IonModal,
    IonRow,
    IonToolbar,
    useIonAlert
} from "@ionic/react";
import {useState} from "react";
import { useHistory } from "react-router";
import SignatureCanvas from "react-signature-canvas";

export interface IProps {
    isOpen: boolean
    setIsOpen: any
    onClose: (value: string) => void
}

const AssinaturaManuscrito: React.FC<IProps> = (props) => {

    const [sign, setSign] = useState<SignatureCanvas | null>(null);
    const [isSign, setIsSign] = useState<boolean>(false);
    const [canDismiss, setCanDismiss] = useState<boolean>(false);

    const [presentAlert] = useIonAlert();

    //modal control
    const {isOpen, setIsOpen, onClose} = props;

    const clearHandler = () => {
        if (sign) {
            sign.clear();

            setIsSign(false);
        }
    };

    const getSignImg = () => {
        //set base64 signature
        if (sign) {
            onClose(sign.getTrimmedCanvas().toDataURL("image/png"));
            setCanDismiss(true);
            setTimeout(() => {
                setIsOpen(false)
            })

        } else {
            presentAlert({
                header: 'Erro!',
                message: 'Ocorreu um erro ao capturar a assinatura. Tente novamente e se o problema persistir contacte o administrador',
                buttons: [
                    {text: 'Compreendi'},
                ]
            })
        }

    };

    //get REF from SignatureCanvas
    const getSignFromCanvas = (ref: any) => {
        setSign(ref);
    };
 
    console.log('isOpen : ', isOpen)
    return (
        <IonModal
            canDismiss={canDismiss}
            isOpen={isOpen}
            onDidDismiss={(e) => {
                setIsOpen(false)
            }}
            breakpoints={[0.1, 0.5, 1]}
            initialBreakpoint={0.5}
        >

            <IonHeader className="ion-no-border">
                <IonToolbar color='transparent'>
                    <IonLabel>
                        <h1 className="text-center">
                            Assinatura Manuscrito Digital
                        </h1>
                    </IonLabel>

                </IonToolbar>
            </IonHeader>
            <IonContent>
                <SignatureCanvas
                    penColor="black"
                    onEnd={() => setIsSign(true)}
                    canvasProps={{
                        width: 500,
                        height: 100,
                        style: {
                            backgroundColor: "#fdfdfd",
                            border: '1px solid #cecece',
                            marginRight: 'auto',
                            marginLeft: 'auto',
                            display: 'block',
                            borderRadius: "5px",
                            borderBottomWidth: "4px"
                        },
                        className: "sigCanvas"
                    }}
                    ref={(ref: SignatureCanvas | null) => {
                        getSignFromCanvas(ref);
                    }}
                />
                <IonGrid>
                    <IonRow>
                        <IonCol style={{marginTop: 20}} size-sm={12} size-md={6} size-lg={6} offset-md={3}
                                offset-lg={3}>
                            <IonButtons>

                                <IonButton disabled={!isSign} fill="solid" strong={true} color="primary"
                                           onClick={getSignImg}>
                                    Assinar
                                </IonButton>

                                <IonButton fill="outline" strong={true} color="dark" onClick={clearHandler}>
                                    Limpar
                                </IonButton>
                                <IonButton fill="outline" strong={true} color="dark" onClick={() => {
                                    setCanDismiss(true)
                                    setIsOpen(false)
                                }}>
                                    Cancelar
                                </IonButton>

                            </IonButtons>
                        </IonCol>

                    </IonRow>

                </IonGrid>

            </IonContent>
        </IonModal>
    )
}

export default AssinaturaManuscrito

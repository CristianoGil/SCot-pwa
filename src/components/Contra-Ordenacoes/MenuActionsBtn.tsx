import {IonButton, IonButtons} from "@ionic/react"
import {Link} from "react-router-dom"

interface IProps {
    onSave?: any
}

export const MenuActionsBtnSave: React.FC<IProps> = (props) => {
    return (
        <IonButtons slot="start">

            <IonButton fill="solid" strong={true} color="success" onClick={props.onSave}>
                Gravar
            </IonButton>

            <IonButton fill="outline" strong={true} color="dark">
                Emitir
            </IonButton>

            <IonButton fill="outline" strong={true} color="dark">
                Terminar
            </IonButton>

            <IonButton disabled strong={true} color="dark">
                Imprimir
            </IonButton>

            <Link to="/dashboard">
                <IonButton fill="solid" strong={true} color="danger">
                    Cancelar
                </IonButton>
            </Link>

        </IonButtons>
    )
}

interface IProps {
    onSignPdf?: any
}

export const MenuActionsBtnSignPDF: React.FC<IProps> = (props) => {
    return (
        <IonButtons slot="start">

            <IonButton fill="solid" strong={true} color="success" onClick={props.onSignPdf}>
                Assinar
            </IonButton>

            <IonButton disabled strong={true} color="dark">
                Imprimir
            </IonButton>

            <Link to="/coDirecta">
                <IonButton fill="solid" strong={true} color="danger">
                    Cancelar
                </IonButton>
            </Link>

        </IonButtons>
    )
}

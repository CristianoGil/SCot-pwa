import {IonButton, IonButtons} from "@ionic/react"
import {Link} from "react-router-dom"

interface IProps {
    params?: any,
    onSave?: any,
    onEmit?: any,
    isCOSaved?: boolean
}

export const MenuActionsBtnSave: React.FC<IProps> = (props) => {
    return (
        <IonButtons slot="start">

            <IonButton fill="solid" strong={true} color="success" onClick={props.onSave}>
                Gravar
            </IonButton>

            <IonButton disabled={!props.isCOSaved} fill="outline" strong={true} color="dark" onClick={props.onEmit}>
                Emitir
            </IonButton>

            <IonButton fill="outline" strong={true} color="dark">
                Terminar
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
    onSignPdf?: any,
    onPrint?: any
    onSaveSignedPDF?:any
}

export const MenuActionsBtnSignPDF: React.FC<IProps> = (props) => {
    return (
        <IonButtons slot="start">

            <IonButton fill="outline" strong={true} color="primary" onClick={props.onSignPdf}>
                Recolha de assinaturas
            </IonButton>

            <IonButton fill="outline" strong={true} color="dark" onClick={props.onPrint}>
                Imprimir
            </IonButton>

            <IonButton fill="solid" strong={true} color="success" onClick={props.onSaveSignedPDF}>
                Terminar a emissão
            </IonButton>

            <Link to="/coDirecta">
                <IonButton fill="solid" strong={true} color="danger">
                    Cancelar
                </IonButton>
            </Link>

        </IonButtons>
    )
}

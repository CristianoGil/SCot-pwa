import {IonButton, IonButtons } from "@ionic/react"
import { Link } from "react-router-dom"

const MenuActionsBtb = () => {
    return (
        <IonButtons slot="start" >

            <IonButton fill="solid" strong={true} color="success">
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

export default MenuActionsBtb;
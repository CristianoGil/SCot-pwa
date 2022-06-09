import { IonCol, IonInput, IonLabel, IonRow, IonSelect } from "@ionic/react";
import { DepositosNaoPago } from "../../../../model/deposito";

const Deposito = (deposito: DepositosNaoPago) => {
    return (
        <IonRow>
            <IonCol size-sm='12' size-md='10' size-lg='2' style={{ marginTop: 16 }}>
                <IonLabel>Nome do Infractor</IonLabel>
                <IonInput value={deposito.infratorNome} disabled></IonInput>
            </IonCol>
            <IonCol size-sm='12' size-md='10' size-lg='2' style={{ marginTop: 16 }}>
                <IonLabel>Auto</IonLabel>
                <IonInput value={deposito.numeroAuto} disabled></IonInput>
            </IonCol>
            <IonCol size-sm='12' size-md='10' size-lg='2' style={{ marginTop: 16 }}>
                <IonLabel>SIGA</IonLabel>
                <IonInput value={deposito.inSIGA} disabled></IonInput>
            </IonCol>

            <IonCol size-sm='12' size-md='10' size-lg='2' style={{ marginTop: 16 }}>
                <IonLabel>Processo</IonLabel>
                <IonInput value={deposito.numeroProcesso} disabled></IonInput>
            </IonCol>
            <IonCol size-sm='12' size-md='10' size-lg='2' style={{ marginTop: 16 }}>
                <IonLabel>Descritivo</IonLabel>
                <IonInput value={deposito.descritivo} disabled></IonInput>
            </IonCol>

            <IonCol size-sm='12' size-md='10' size-lg='2' style={{ marginTop: 16 }}>
                <IonLabel>Ano</IonLabel>
                <IonInput value={deposito.ano} disabled></IonInput>
            </IonCol>

        </IonRow>
    )
}

export default Deposito;
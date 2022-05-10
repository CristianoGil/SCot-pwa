import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import Infraccao from "../Components/Infraccao/Infraccao";
import LocalInfraccao from "../Components/LocalInfraccao/LocalInfraccao";
import Unidade from "../Components/Unidade/Unidade";

const DadosInfracao: React.FC = () => {

    return (

        <IonGrid className="dadosInfracao">
            <IonRow>
                <IonCol size-sm='12' size-md="12" size-lg="11">
                    {/*START: UNIDADE*/}
                    <Unidade />
                    {/*END: UNIDADE*/}
                </IonCol>
            </IonRow>

            <IonRow>
                <IonCol size-sm='12' size-md="12" size-lg="11">
                    {/*START: Local Infracção*/}
                    <LocalInfraccao />
                    {/*END: Local Infracção*/}
                </IonCol>
            </IonRow>

            <IonRow>
                <IonCol size-sm='12' size-md="12" size-lg="11">
                    {/*START: Infracção*/}
                    <Infraccao />
                    {/*END: Infracção*/}
                </IonCol>
            </IonRow>
        </IonGrid>
    );

}

export default React.memo(DadosInfracao);
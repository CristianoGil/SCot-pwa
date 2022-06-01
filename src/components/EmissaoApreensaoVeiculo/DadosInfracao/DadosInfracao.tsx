import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React, { useState } from "react";
import Infraccao from "../../../components/Contra-Ordenacoes/Components/Infraccao/Infraccao";
import LocalInfraccao from "../../../components/Contra-Ordenacoes/Components/LocalInfraccao/LocalInfraccao";
import Unidade from "../../../components/Contra-Ordenacoes/Components/Unidade/Unidade";
import './DadosInfracao.scss';

const DadosInfracao: React.FC = () => {
    const [comarcaSelecionada, setComarcaSelecionada] = useState();

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
                    <Infraccao  currentComarca={comarcaSelecionada} />
                    {/*END: Infracção*/}
                </IonCol>
            </IonRow>
        </IonGrid>
    );

}

export default React.memo(DadosInfracao);
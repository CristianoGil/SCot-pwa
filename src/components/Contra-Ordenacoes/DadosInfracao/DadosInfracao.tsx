import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React, { useState } from "react";
import { IInfracao } from "../../../model/infracaoAdicional";
import Infraccao from "../Components/Infraccao/Infraccao";
import LocalInfraccao from "../Components/LocalInfraccao/LocalInfraccao";
import Unidade from "../Components/Unidade/Unidade";
import './DadosInfracao.scss';
    

interface IProps {
    setCoDirectaData?: any
}

const DadosInfracao: React.FC<IProps> = (props) => {
    

    const [unidadeData, setUnidadeData] = useState<any>();
    const [localInfracaoData, setLocalInfracaoData] = useState<any>();
    const [comarcaSelecionada, setComarcaSelecionada] = useState();
       
    // START: INFRACAO
    const [infracaoData, setInfracaoData] = useState<any>();
        // END: INFRACAO


        React.useEffect(() => {
            const data = {
                infracaoData:infracaoData,
                unidadeData:unidadeData,
                localInfracaoData:localInfracaoData
            }
            props.setCoDirectaData(data);

        }, [infracaoData,unidadeData,localInfracaoData ])    
        return (

        <IonGrid className="dadosInfracao">
            <IonRow>
                <IonCol size-sm='12' size-md="12" size-lg="11">
                    {/*START: UNIDADE*/}
                    <Unidade setUnidadeData={setUnidadeData} />
                    {/*END: UNIDADE*/}
                </IonCol>
            </IonRow>

            <IonRow>
                <IonCol size-sm='12' size-md="12" size-lg="11">
                    {/*START: Local Infracção*/}
                    <LocalInfraccao setParentLocalInfracaoData={setComarcaSelecionada} setLocalInfracaoData={setLocalInfracaoData}/>
                    {/*END: Local Infracção*/}
                </IonCol>
            </IonRow> 

            <IonRow>
                <IonCol size-sm='12' size-md="12" size-lg="11">
                    {/*START: Infracção*/}
                    <Infraccao currentComarca={comarcaSelecionada} setInfracao={setInfracaoData}/>
                    {/*END: Infracção*/}
                </IonCol>
            </IonRow>
        </IonGrid>
    );

}

export default React.memo(DadosInfracao);
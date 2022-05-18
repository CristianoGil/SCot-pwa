import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRadio, IonRadioGroup, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { useEffect, useState } from "react";
import { Deposito48hrService } from "../../../../api/Deposito48hrService";
import { DepositosNaoPago, DepositoResponse } from "../../../../model/deposito";
import DatePicker from "../../../Combos/DatePicker";
import Deposito from "./Depositos";

const Pagamento: React.FC = () => {
    const [depositosNaoPagos, setDepositosNaoPagos] = useState<DepositosNaoPago[]>();
    const [errorMsg, setErrorMsg] = useState('');

    const getDepositos48Hr = async () => {
        const depositosService = new Deposito48hrService();
        await depositosService.pesquisarDepositos48hrsEmAtraso({
            forca: "user.teste",
            idUtilizador: "user.teste",
            numDocumento: "42343423",
            tipoDocumento: "7"
        }).then((_response: DepositoResponse) => {
            const depositosResponse = _response.depositosNaoPagos;
            setDepositosNaoPagos(depositosResponse)
           
        }).catch((reason: any) => {
            setErrorMsg(reason?.message)
        })

    };
    useEffect(() => {
        getDepositos48Hr();
        if (depositosNaoPagos?.length===0) {
            setErrorMsg("Sem Dados a Apresentar");
         }
    },[]);


    return (
           
        <IonCard className={'co-pagamento'}>
            <IonCardHeader>
                <IonCardTitle>Deposito 48 horas
                </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
            <IonGrid>
                {depositosNaoPagos?.map((deposito:DepositosNaoPago)=>( 
                     <Deposito 
                     ano={deposito?.ano} 
                     descritivo={deposito?.descritivo} 
                     inSIGA={deposito?.inSIGA} 
                     infratorId={deposito?.infratorId}
                      infratorNome={deposito?.infratorNome} 
                      infratorTipo={deposito?.infratorTipo} 
                      numeroAuto={deposito?.numeroAuto}
                       numeroProcesso={deposito?.numeroProcesso}
                        procId={deposito?.procId}
                         tipoId={deposito?.tipoId} 
                         unidadeOrganica={deposito?.unidadeOrganica}/>
                ))}
              {errorMsg}
              
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
}

export default Pagamento;
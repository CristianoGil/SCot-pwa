import { IonCard, IonCardContent, IonCol, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRadio, IonRadioGroup, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { DepositoRequest, DepositoResponse, DepositosNaoPago } from "../../../model/deposito";
import AcoesComplementares from "../Components/AcoesComplementares/AcoesComplementares";
import InfraccoesAdicionais from "../Components/InfraccoesAdicionais/InfraccoesAdicionais";
import Pagamento from "../Components/Pagamento/Pagamento";
import './DadosComplementares.scss';

interface IProps {
    setCoDirectaData?: any
}
interface Infracao{
    id?:number,
    _id:number,
    entidade:string,
    infraccoesAdicionais:string,
    acoes: string

}

const DadosComplementares: React.FC<IProps> = (props) => {
    const [tipoProprietario, setTipoProprietario]= useState<String>();
    const [refArguido, setRefArguido]= useState('');
    const [arquidoNif, setArguidoNif]= useState('');
    const [infracoes, setInfracoes]= useState<Infracao[]>();
    const [depositoRequest, setDepositoRequest]= useState<DepositoRequest>();
    const [accoesComplementaresParentData, setAccoesComplementaresParentData] = useState<any>();
    const keyup_refArguido = (e: any) => {
        setRefArguido(e.target.value);
    }
    
    React.useEffect(()=>{
        const data = {
            tipoProprietario: tipoProprietario,
            refArguido: refArguido,
            depositoRequest:depositoRequest,
            infracoes: infracoes,   
            accoesComplementaresParentData: accoesComplementaresParentData
        }
        setArguidoNif(refArguido)
    },[])


    return (
        <IonGrid className="dadosComplementares">

            <IonRow>
                <IonCol size-sm='12' size-md="12" size-lg="11">
                    {/*START: Proprietário*/}

                    <IonCard className={'co-pagamento'}>
                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size-sm='12' size-md='10' size-lg='6'>
                                        <IonHeader>
                                            <IonLabel>Proprietário</IonLabel>
                                        </IonHeader>
                                        <IonRadioGroup
                                            value={tipoProprietario}
                                            onIonChange={(e)=>{
                                                setTipoProprietario(e.detail.value)
                                            }}>
                                            <IonRow>
                                                <IonCol size='4'>
                                                    <IonItem lines='none' className="veiculo-proprietario-radio radio-item">
                                                        <IonRadio value="arguido" />
                                                        <IonLabel className="radioBox">Arguido</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='4'>
                                                    <IonItem lines='none' className="veiculo-proprietario-radio radio-Item">
                                                        <IonRadio value="condutor" />
                                                        <IonLabel className="radioBox">Condutor</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol size='4'>
                                                    <IonItem lines='none' className="veiculo-proprietario-radio radio-Item">
                                                        <IonRadio value="outro" />
                                                        <IonLabel className="radioBox">Outro</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>

                                    <IonCol size-sm='12' size-md='10' size-lg='6'>
                                        <IonItem>
                                            <IonLabel position="floating" itemType="text" placeholder="Ref. Arquivo">Ref. Arquivo</IonLabel>
                                            <IonInput
                                            type="text"
                                            value={refArguido}
                                            onKeyUp={keyup_refArguido}
                                             ></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCardContent>
                    </IonCard>

                    {/*END: Proprietário*/}
                </IonCol>
            </IonRow>

            <IonRow>
                <IonCol size-sm='12' size-md="12" size-lg="11">
                    {/*START: Pagamento*/}
                    <Pagamento setParentDeposito48hr={setDepositoRequest} arguidoNif={setArguidoNif} />
                    {/*END: Pagamento*/}
                </IonCol>
            </IonRow>

            <IonRow>
                <IonCol size-sm='12' size-md="12" size-lg="11">
                    {/*START: Ações Complementares*/}
                    <AcoesComplementares setAccoesComplementaresParentData={setAccoesComplementaresParentData}/>
                    {/*END: Ações Complementares*/}
                </IonCol>
            </IonRow>

            <IonRow>
                <IonCol size-sm='12' size-md="12" size-lg="11">
                    {/*START: Infracções adicionais*/}
                    <InfraccoesAdicionais setParentInfracoesData={setInfracoes}/>
                    {/*END: Infracções adicionais*/}
                </IonCol>
            </IonRow>
        </IonGrid>
    );

}

export default React.memo(DadosComplementares);
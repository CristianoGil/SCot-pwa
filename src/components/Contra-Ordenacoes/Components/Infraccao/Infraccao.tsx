import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonListHeader, IonRadio, IonRadioGroup, IonRow, IonSelect, IonSelectOption, IonTextarea } from "@ionic/react";
import { search, text } from "ionicons/icons";
import React from "react";
import { useState } from "react";
import { Contraordenacao } from "../../../../api/Contraordenacao";
import './Infraccao.scss';

interface parentSharedData{

}
const Infraccao: React.FC = () => {

    interface InfracaoResponse {
        comarcas:ComonResult[]
        entidades:ComonResult[]
        tipificacoes:ComonResult[]
        subtipificacoes:Subtificacao[]
    }
    interface ComonResult {
        id: number;
        descricao: string;
        codigoSegmentoInfracao?:number
      }

      interface Subtificacao{
       id:number;
       descricao:string;
       tipificacao:ComonResult;
       normaInfringida:string; //descNormasInfracao;
       descricaoSumaria:string; //descInfracao;
       montanteDaCoimaMaxima:number; //valorMaxCoima;
       montanteDaCoimaMinima:number; //valorMinCoima;
       normaQuePreveContraOrdenacao:string; //descNormasCo;
       sancaoAcessoria:string; //descSancoes;
       normaPrevista:string;
       normaQuePreveSancaoAcessoria:string; //descNormasSancoes;
       observacoes:string;
       codigoDgv:number;
       recaiSobreProprietario:boolean;
       valorAberto:boolean;
       responsabilidadeMunicipio:boolean;
       ativo:boolean;
      }

    const [comarcas, setComarcas] = useState<ComonResult[]>();
    const [entidades, setEntidades] = useState<ComonResult[]>();
    const [tiposInfracao, setTiposInfracao] = useState<ComonResult[]>();
    const [subtiposInfracao, setSubTiposInfracao] = useState<Subtificacao[]>();
    const [subtiposInfracaoPadrao, setSubtiposInfracaoPadrao] = useState<Subtificacao[]>();

    const [autuante, setAutuante] = useState();
    const [tipoAutuante, setTipoAutuante] = useState();
    const [arguidoNif, setArguidoNif] = useState();
    const [nomeInfrigida, setNomeInfrigida] =useState<string | undefined>();
    const [descricao, setDescricao] = useState<string | undefined>();
    const [minValor, setMinValor] = useState<number | undefined>();
    const [maxValor, setMaxValor] =  useState<number | undefined>();
    const [normaPrevista, setNormaPrevista] =  useState<string | undefined>();
    const [sancaoAcessoria, setSancaoAcessoria] =  useState<string | undefined>();
    const [observacao, setObservacao] = useState<string | undefined>();
    const [normaSancaoAcessoria, setNormaSancaoAcessoria] =  useState<string | undefined>();

    const getInfracao = async (): Promise<InfracaoResponse>=> await new Contraordenacao().carregarCombosInfracao()
    React.useEffect(() => {
        getInfracao().then((response_infracao) => {
            console.log(response_infracao)
           
            setEntidades(response_infracao?.entidades)
            setComarcas(response_infracao?.comarcas)
            setTiposInfracao(response_infracao?.tipificacoes)
            setSubtiposInfracaoPadrao(response_infracao?.subtipificacoes)
            setSubTiposInfracao(response_infracao?.subtipificacoes)
        }).catch((error) => {
            console.error("Load infracao combos: \n", error);
        })
    }, []);


    
    const onchange_subtificacao = (e:any)=>{
        const subtificaoId = e.target.value
        let subtificacao:Subtificacao | undefined= subtiposInfracao?.find(subtipo=>subtipo.id === subtificaoId)
         setDescricao(subtificacao?.observacoes)
         setMinValor(subtificacao?.montanteDaCoimaMinima)
         setMaxValor(subtificacao?.montanteDaCoimaMaxima)
         setNomeInfrigida(subtificacao?.normaInfringida)
         setNormaPrevista(subtificacao?.normaPrevista)
         setSancaoAcessoria(subtificacao?.sancaoAcessoria)
         setNormaSancaoAcessoria(subtificacao?.normaQuePreveSancaoAcessoria)
         setObservacao(subtificacao?.observacoes)
        
    }

    const onchange_filtrarSubtificacaoPorTipificacao = (e:any)=>{
        const infracaoId = e.target.value
        const subTipos= subtiposInfracaoPadrao?.filter(sub=>{ return sub.tipificacao.id === infracaoId})
        setSubTiposInfracao(subTipos)
    }

    return (
        <IonCard className={'co-infraccao'}>
            <IonCardHeader>
                <IonCardTitle>Infracção</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <IonHeader>
                                <IonLabel>Presenciada pelo Autuante?</IonLabel>
                            </IonHeader>
                            <IonRadioGroup
                                value={tipoAutuante}
                                >
                                <IonRow>
                                    <IonCol size='6'>
                                        <IonItem lines='none' className="veiculo-proprietario-radio radio-item">
                                            <IonRadio value="singular" />
                                            <IonLabel className="radioBox">Sim</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size='6'>
                                        <IonItem lines='none' className="veiculo-proprietario-radio radio-Item">
                                            <IonRadio value="colection" />
                                            <IonLabel className="radioBox">Não</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonRadioGroup>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <IonItem>
                                <IonLabel position="floating" itemType="text" placeholder="Autuante">Autuante</IonLabel>
                                <IonInput   value={autuante}></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Comarca</IonLabel>
                                <IonSelect interface="popover">
                                    {comarcas?.map((local: any) => {
                                        return (
                                            <IonSelectOption key={`${local.id}`}
                                                value={local.id}>{`${local.descricao}`}</IonSelectOption>
                                        )
                                    })}
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3' style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Entidade</IonLabel>
                                <IonSelect interface="popover">
                                    {entidades?.map((local: any) => {
                                        return (
                                            <IonSelectOption key={`${local.id}`}
                                                value={local.id}>{`${local.descricao}`}</IonSelectOption>
                                        )
                                    })}
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <IonItem>
                                <IonButton color='medium' fill="clear" id="open-search-input-1">
                                    <IonIcon icon={search} />
                                </IonButton>
                                <IonInput maxlength={9}
                                    minlength={9}
                                    //   color={}
                                    required={true}
                                    clearInput={true}
                                    name='arguido-nif'
                                    value={arguidoNif}
                                    //   onKeyUp={}
                                    placeholder='Código' />
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <IonItem lines='none'>
                                <IonButton style={{ background: '#084F87', borderRadius: 4 }}
                                    color="#084F87"
                                    slot="start"
                                    //    disabled={}
                                    size='default'
                                    onClick={() => { }}> Pesquisar </IonButton>

                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='6'>
                            <IonItem>
                                <IonLabel>Tipificação da Infracção</IonLabel>
                                <IonSelect interface="popover" onIonChange={onchange_filtrarSubtificacaoPorTipificacao}>
                                    {tiposInfracao?.map((local: any) => {
                                        return (
                                            <IonSelectOption key={`${local.id}`}
                                                value={local.id}>{`${local.descricao}`}</IonSelectOption>
                                        )
                                    })}                                  </IonSelect>
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='6' offset="6">
                            <IonItem>
                                <IonLabel>Subtipificação da Infracção</IonLabel>
                                <IonSelect interface="popover" onIonChange={onchange_subtificacao}>
                                    {subtiposInfracao?.map((local: any) => {
                                        return (
                                            <IonSelectOption key={`${local.id}`}
                                                value={local.id}>{`${local.descricao}`}</IonSelectOption>
                                        )
                                    })}                                  </IonSelect>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='6'>
                            <IonItem>
                                <IonLabel position="floating" itemType="text" placeholder="Nome infringida">Nome infringida</IonLabel>
                                <IonInput
                                value={nomeInfrigida}
                                ></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='6'>
                            <IonItem lines="none">
                                <IonLabel position="stacked">Descrição Sumária</IonLabel>
                                <IonTextarea rows={6} cols={10} placeholder="" value={descricao} onIonChange={e => () => { }}>

                                </IonTextarea>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='6'>
                            <IonHeader>
                                <IonLabel>Montante da Coima (EUR)</IonLabel>
                            </IonHeader>

                            <IonRow>
                                <IonCol size='3'>
                                    <IonItem>
                                        <IonLabel position="floating">min</IonLabel>
                                        <IonInput value={minValor}></IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol size='3'>
                                    <IonItem>
                                        <IonLabel position="floating">max</IonLabel>
                                        <IonInput value={maxValor}></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>

                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='6' style={{ marginTop: 32 }}>
                            <IonItem>
                                <IonLabel position="floating" itemType="text" placeholder="Norma que prevê a Contraordenação">Norma que prevê a Contraordenação</IonLabel>
                                <IonInput value={normaPrevista}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='6'>
                            <IonItem>
                                <IonLabel position="floating" itemType="text" placeholder="Sanção Acessória">Sanção Acessória</IonLabel>
                                <IonInput value={sancaoAcessoria}></IonInput>
                            </IonItem>

                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='6'>
                            <IonItem>
                                <IonLabel position="floating" itemType="text" placeholder="Norma que prevê a Sanção Acessória">Norma que prevê a Sanção Acessória</IonLabel>
                                <IonInput  value={normaSancaoAcessoria}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>

                        <IonCol size-sm='12' size-md='10' size-lg='12'>
                            <IonItem lines="none">
                                <IonLabel position="stacked">Observações</IonLabel>
                                <IonTextarea rows={6} cols={10} placeholder="" value={observacao} onIonChange={e => () => { }}>

                                </IonTextarea>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
}

export default Infraccao;
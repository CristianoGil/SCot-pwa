import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonListHeader, IonRow, IonSelect, IonSelectOption, useIonAlert, useIonLoading } from "@ionic/react";
import { search, location } from "ionicons/icons";
import { GoogleMap } from '@capacitor/google-maps';
import { useEffect, useRef, useState } from "react";
import { Contraordenacao } from "../../../../api/Contraordenacao";
import React from "react";
import { setTimeout } from "timers";
import { useAppSelector } from "../../../../app/hooks";
import { getInputValidations_LocalInfraccao } from "../../../../Validations/Contra-Ordenacoes/InputValidationsSlice_LocalInfraccao";

interface LocalInfracaoData{
    setParentLocalInfracaoData?:any
    setLocalInfracaoData?:any
}
interface LocalResponse {
    tiposArruamento: ComonResult[];
    tipos: ComonResult[];
    subtipos: ComonResult[];
    paises: ComonResult[];
    distritos: ComonResult[];
    concelhos: ComonResult[];
    freguesias: ComonResult[];
    localidades: ComonResult[];
}
interface ComonResult {
    id: number
    idTipoLocal?: number;
    idConcelho?: number;
    idDistrito?: number;
    idFreguesia?: number;
    idComarca?: number;
    descricao: string
}
let newMap: GoogleMap;



const LocalInfraccao: React.FC<LocalInfracaoData> = (props) => {

    const inputValidations_LocalInfraccao = useAppSelector(getInputValidations_LocalInfraccao);

    const apiKey = 'AIzaSyBaOBxDiMCrEgbfIOU6Wau_gjhXdZ6GBXE';
    const mapRef = useRef<HTMLElement>();

    const [coordenadas, setCoordenadas] = useState({ "latitude": -19.831996961440094, "longitude": 34.83581986832666 });
    const [distritos, setDistritos] = useState<ComonResult[]>();
    const [distritosPadrao, setDistritosPadrao] = useState<ComonResult[]>();
    const [concelhos, setConcelhos] = useState<ComonResult[]>();
    const [concelhosPadrao, setConcelhosPadrao] = useState<ComonResult[]>();
    const [freguesias, setFreguesias] = useState<ComonResult[]>();
    const [freguesiasPadrao, setFreguesiasPadrao] = useState<ComonResult[]>();
    const [localidades, setLocalidades] = useState<ComonResult[]>();
    const [tipos, setTipos] = useState<ComonResult[]>();

    const [distrito, setDistrito] = useState();
    const [concelho, setConcelho] = useState();
    const [freguesia, setFreguesia] = useState();
    const [localidade, setLocalidade] = useState();
    const [tipo, setTipo] = useState();
    const [zona, setZona] = useState();
    const [arruamento, setArruamento] = useState();
    const [nrPolicia, setNrPolicia] = useState();
    const [presentAlert, dismissAlert] = useIonAlert();
    const [presentOnLoading, dismissOnLoading] = useIonLoading();
    const carregarCombosLocalizacao = async (): Promise<any> => await new Contraordenacao().carregarCombosLocalizacao()
    const carregarComboLocalidade = async (idFreguesia: any): Promise<any> => await new Contraordenacao().carregarComboLocalidades(idFreguesia)
    const carregarDistritoByCoords = async (position: { lat: any, lng: any }): Promise<any> => await new Contraordenacao().getMapAddressByPosition({ position: position, apiKey: apiKey })
    const carregarCoordsByAddress = async (address: string ): Promise<any> => await new Contraordenacao().getCoordsByAddress({ address: address, apiKey: apiKey })

    React.useEffect(() => {
        
        const data={
                distrito:distritos?.find(d => d.id === distrito),
                concelho:concelhos?.find(c=>c.id===concelho),
                freguesia:freguesias?.find(f=>f.id===freguesia),
                localidade:localidades?.find(l=> l.id===localidade),
                numeroPolicia:nrPolicia,
                zona:zona,
                tipo:tipo,
                arruamento:arruamento
        }
  
        props.setLocalInfracaoData(data)
    },[distrito,concelho,freguesia,localidade,nrPolicia, zona,tipo, arruamento])

    async function createMap() {
        if (!mapRef.current) return;

        newMap = await GoogleMap.create({
            id: 'my-cool-map',
            element: mapRef.current,
            apiKey: apiKey,//process.env.REACT_APP_YOUR_API_KEY_HERE as string,
            config: {
                center: {
                    lat: 38.710833,
                    lng: -9.164948
                },
                zoom: 8
            }

        });
    }

    const getCurrentPosition = () => {

        presentOnLoading({
            message: 'Carregando a sua localização...'
        });

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((geo) => {
                newMap.setCamera({
                    coordinate: {
                        lat: geo.coords.latitude,
                        lng: geo.coords.longitude
                    }
                });

                newMap.addMarker({
                    coordinate: {
                        lat: geo.coords.latitude,
                        lng: geo.coords.longitude
                    }
                });

    

                carregarDistritoByCoords({ lat: geo.coords.latitude, lng: geo.coords.longitude }).then(response => {
                    const zonaCapturadaPeloMapa = response.data.results[0].formatted_address
                    dismissOnLoading();

                }).catch(err => {
                    dismissOnLoading();
                    presentAlert({
                        header: 'Atenção!',
                        message: `Não foi possivel carregar a localização \n ${err.message} \n tente novamente.`,
                        buttons: [
                            { text: 'Fechar' },
                        ]
                    })


                })
             


            }, (error) => {
                dismissOnLoading();

                presentAlert({
                    header: 'Atenção!',
                    message: `Não foi possivel carregar a localização \n ${error.message} \n tente novamente.`,
                    buttons: [
                        { text: 'Fechar' },
                    ]
                })
            })

        } else {
            dismissOnLoading();

            presentAlert({
                header: 'Atenção!',
                message: 'Ativar a localização do dispositivo \n tente novamente.',
                buttons: [
                    { text: 'Fechar' },
                ]
            })


        }


    };

    useEffect(() => {
        createMap();
    }, []);

    useEffect(() => {
        carregarCombosLocalizacao().then((response_local) => {
            const _local = response_local as LocalResponse
            setDistritos(_local?.distritos)
            setDistritosPadrao(_local?.distritos)
            setConcelhos(_local?.concelhos)
            setConcelhosPadrao(_local?.concelhos)
            setFreguesiasPadrao(_local?.freguesias)
            setTipos(_local.tiposArruamento)
        }).catch((error) => {
            console.error("Load localizacao combos: \n", error);
        })

    }, []);

    const onchange_filterConcelhoByDistritoId = (e: any) => {

        const id = e.target.value;
        const filteredConcelhos: ComonResult[] | undefined = concelhosPadrao?.filter(concelho => { return concelho.idDistrito === id })
        setConcelhos(filteredConcelhos)
        setDistrito(id)
    }

    const onchange_filterFreguesiasByConcelhoId = (e: any) => {
        const id = e.target.value;
        const result: ComonResult[] | undefined = freguesiasPadrao?.filter(freguesia => { return freguesia.idConcelho === id });
        setFreguesias(result)
        setConcelho(id)
        props.setParentLocalInfracaoData(concelhos?.find(c=> {return c.id === id})?.idComarca)

    }


    const onchange_filterLocalidadesByFreguesiaId = (e: any) => {
        const id = e.target.value;
        carregarComboLocalidade(id).then((response_local) => {
            const _local = response_local as LocalResponse
            setLocalidades(_local.localidades)
            setFreguesia(id)
        }).catch((error) => {
            console.error("Load localizacao combos: \n", error);
        })

    }

    const keyup_nrPolicia = (e: any) => {
        setNrPolicia(e.target.value)
    }

    const keyup_zona = (e: any) => {
        setZona(e.target.value)
    }
    const keyup_arruamento = (e: any) => {
        setArruamento(e.target.value)
    }
    const onClick_pesquisar = () => {
        carregarCoordsByAddress("").then(res=>{
            let coords:{ lat:any; lng:any}={
                lat: undefined,
                lng: undefined
            }

            const distrito = ""
            const concelho = ""
            const freguesia = ""
            const localidade = ""
            
            



        }).catch(err=>{

        })
    }

    return (

        <IonCard className={'co-localInfraccao'}>
            <IonCardHeader>
                <IonCardTitle>Local Infracção</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm="12" size-md="12" size-lg="12" style={{ marginTop: 16 }}>
                            <div className="component-wrapper">
                                <capacitor-google-map ref={mapRef} style={{
                                    display: 'inline-block',
                                    width: '100%',
                                    height: 400
                                }}></capacitor-google-map>
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size-sm="12" size-md="12" size-lg="12" style={{ marginTop: 16 }}>

                            <IonButton onClick={getCurrentPosition}>Usar minha posição atual  <IonIcon icon={location} slot='start' /></IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size-sm="9" size-md="12" size-lg="4" style={{ marginTop: 16 }}>

                            <IonItem>

                                <IonLabel>Distrito *</IonLabel>
                                <IonSelect interface="popover" onIonChange={onchange_filterConcelhoByDistritoId}>
                                    {distritos?.map((local: any) => {
                                        return (
                                            <IonSelectOption key={`${local.id}`}
                                                value={local.id}>{`${local.descricao}`}</IonSelectOption>
                                        )
                                    })}

                                </IonSelect>

                            </IonItem>
                            <IonItem className="componentError" lines="none" hidden={inputValidations_LocalInfraccao.distrito_isValid}>Campo obrigatório</IonItem>
                        </IonCol>

                        <IonCol size-sm="9" size-md="12" size-lg="4" style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Concelho *</IonLabel>
                                <IonSelect interface="popover" onIonChange={onchange_filterFreguesiasByConcelhoId}>
                                    {concelhos?.map((local: any) => {
                                        return (
                                            <IonSelectOption key={`${local.id}`}
                                                value={local.id}>{`${local.descricao}`}</IonSelectOption>
                                        )
                                    })}
                                </IonSelect>
                            </IonItem>
                            <IonItem className="componentError" lines="none" hidden={inputValidations_LocalInfraccao.concelho_isValid}>Campo obrigatório</IonItem>
                        </IonCol>

                        <IonCol size-sm="9" size-md="12" size-lg="4" style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Freguesia *</IonLabel>
                                <IonSelect interface="popover" onIonChange={onchange_filterLocalidadesByFreguesiaId}>
                                    {freguesias?.map((local: any) => {
                                        return (
                                            <IonSelectOption key={`${local.id}`}
                                                value={local.id}>{`${local.descricao}`}</IonSelectOption>
                                        )
                                    })}

                                </IonSelect>
                            </IonItem>
                            <IonItem className="componentError" lines="none" hidden={inputValidations_LocalInfraccao.freguesia_isValid}>Campo obrigatório</IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm="9" size-md="12" size-lg="4" style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Localidade *</IonLabel>
                                <IonSelect interface="popover" value={localidade} onIonChange={(e)=>{ setLocalidade(e.detail.value)}}>
                                    {localidades?.map((local: any) => {
                                        return (
                                            <IonSelectOption key={`${local.id}`}
                                                value={local.id}>{`${local.descricao}`}</IonSelectOption>
                                        )
                                    })}
                                </IonSelect>
                            </IonItem>
                            <IonItem className="componentError" lines="none" hidden={inputValidations_LocalInfraccao.localidade_isValid}>Campo obrigatório</IonItem>
                        </IonCol>

                        <IonCol size-sm="9" size-md="12" size-lg="4">
                            <IonItem>
                                <IonLabel position="floating" itemType="number" placeholder="Nº Polícia">Nº Polícia/km</IonLabel>
                                <IonInput  onKeyUp={keyup_nrPolicia}
                                    value={nrPolicia}></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm="9" size-md="12" size-lg="4">
                            <IonItem>
                                <IonLabel position="floating" itemType="text" placeholder="Nº Polícia">Zona/Bairro</IonLabel>
                                <IonInput   onKeyUp={keyup_zona} value={zona}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm="9" size-md="12" size-lg="4">
                            <IonItem>
                                <IonLabel>Tipo *</IonLabel>
                                <IonSelect interface="popover" onIonChange={(e)=>{setTipo(e.detail.value)}}>
                                    {tipos?.map((local: any) => {
                                        return (
                                            <IonSelectOption key={`${local.id}`}
                                                value={local.descricao}>{`${local.descricao}`}</IonSelectOption>
                                        )
                                    })}
                                </IonSelect>
                            </IonItem>
                            <IonItem className="componentError" lines="none" hidden={inputValidations_LocalInfraccao.tipo_isValid}>Campo obrigatório</IonItem>
                        </IonCol>

                        <IonCol size-sm='8' size-md='6' size-lg='4'>
                            <IonItem>
                                <IonButton color='medium' fill="clear" id="open-search-input-1">
                                    <IonIcon icon={search} />
                                </IonButton>
                                <IonInput maxlength={9}
                                    minlength={9}
                                    required={true}
                                    onKeyUp={keyup_arruamento} 
                                    clearInput={true}
                                    name='arguido-nif'
                                    value={arruamento}
                                    placeholder='Arruamento *' />
                            </IonItem>
                            <IonItem className="componentError" lines="none" hidden={inputValidations_LocalInfraccao.arruamento_isValid}>Campo obrigatório</IonItem>
                        </IonCol>
                        <IonCol size-sm='4' size-md='6' size-lg='2'>
                            <IonItem lines='none'>
                                <IonButton style={{ background: '#084F87', borderRadius: 4 }}
                                    color="#084F87"
                                    slot="start"
                                    size='default'
                                    onClick={onClick_pesquisar}> Pesquisar </IonButton>

                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
}

export default LocalInfraccao;

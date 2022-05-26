import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonListHeader, IonRow, IonSelect, IonSelectOption, useIonAlert, useIonLoading } from "@ionic/react";
import { search, location } from "ionicons/icons";
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { useEffect, useMemo, useRef, useState } from "react";
import { Contraordenacao } from "../../../../api/Contraordenacao";
import React from "react";
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Select, Page, setOptions, getJson } from '@mobiscroll/react';
import { ApiUtils } from "../../../../api/ApiUtils";
setOptions({
    theme: 'ios',
    themeVariant: 'light'
});
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
    descricao: string
}


const LocalInfraccao: React.FC = () => {

    const [coordenadas, setCoordenadas] = useState({ "latitude": -19.831996961440094, "longitude": 34.83581986832666 });

    const apiKey = 'AIzaSyBaOBxDiMCrEgbfIOU6Wau_gjhXdZ6GBXE';
    const mapRef = useRef<HTMLElement>();
    let newMap: GoogleMap;

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
    const [presentAlert, dismissAlert] = useIonAlert();
    const [presentOnLoading, dismissOnLoading] = useIonLoading();

    const getCurrentPosition = async () => {
      
        presentOnLoading({
            message: 'Carregando a sua localização...'
        });

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position)=>{
                console.log(position, "coords")
                 newMap.setCamera({
            coordinate: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        });

             newMap.addMarker({
            coordinate: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        });
                dismissOnLoading();
    
            }, (error)=>{
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

            
     
        // const canRequestMap = Geolocation.checkPermissions();
        // canRequestMap.then(c=>{
        //     Geolocation.getCurrentPosition().then(success =>{
        //         console.log("sss", success)

        //     }).catch(err=>{
        //         console.log("###", err)

        //     })
        // }).catch(err=>{
        //     console.log("err", err)
        // })
        // const coordinates = await Geolocation.getCurrentPosition();
        
        // console.log(coordinates, "positions")
        // setCoordenadas({ "latitude": coordinates.coords.latitude, "longitude": coordinates.coords.longitude });
        // Move the map programmatically
         
        // await newMap.setCamera({
        //     coordinate: {
        //         lat: coordinates.coords.latitude,
        //         lng: coordinates.coords.longitude
        //     }
        // });
        // // Add a marker to the map
        // await newMap.addMarker({
        //     coordinate: {
        //         lat: coordinates.coords.latitude,
        //         lng: coordinates.coords.longitude
        //     }
        // });

    };

    const carregarCombosLocalizacao = async (): Promise<any> => await new Contraordenacao().carregarCombosLocalizacao()
    const carregarComboLocalidade = async (idFreguesia: any): Promise<any> => await new Contraordenacao().carregarComboLocalidades(idFreguesia)
    const [distritos, setDistritos] = useState<ComonResult[]>();
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

    useEffect(() => {
        createMap();
    }, []);

    useEffect(() => {
        carregarCombosLocalizacao().then((response_local) => {
            const _local = response_local as LocalResponse
            setDistritos(_local?.distritos)
            setConcelhos(_local?.concelhos)
            setConcelhosPadrao(_local?.concelhos)
            setFreguesiasPadrao(_local?.freguesias)
            setTipos(_local.tipos)
        }).catch((error) => {
            console.error("Load localizacao combos: \n", error);
        })

    }, []);

    const onchange_filterConcelhoByDistritoId = (e: any) => {
        const id = e.target.value;
        const filteredConcelhos: ComonResult[] | undefined = concelhosPadrao?.filter(concelho => { return concelho.idDistrito === id })
        
        setConcelhos(filteredConcelhos)
        
    }

    const onchange_filterFreguesiasByConcelhoId = (e: any) => {
        const id = e.target.value;
        const result: ComonResult[] | undefined = freguesiasPadrao?.filter(freguesia => { return freguesia.idConcelho === id });
        setFreguesias(result)
    }


    const onchange_filterLocalidadesByFreguesiaId = (e: any) => {
        const id = e.target.value;
        carregarComboLocalidade(id).then((response_local) => {
            const _local = response_local as LocalResponse
            setLocalidades(_local.localidades)
        }).catch((error) => {
            console.error("Load localizacao combos: \n", error);
        })

    }

    const keyup_nrPolicia = (e: any) => {
        setNrPolicia(e.target.value)
    }
    const onClick_pesquisar = () => {

    }



    // const [remoteData, setRemoteData] = useState<any>();


    // const remoteFiltering = React.useCallback((filterText: string | number | boolean) => {
    //     getJson('https://trial.mobiscroll.com/airports/' + encodeURIComponent(filterText), (data) => {
    //         const airports: {
    //             text: any;
    //             value: any;
    //         }[]   =[] 
    //                 for (const item of data) {
    //           airports.push({ text: item.name, value: item.code });
    //         }
    //         setRemoteData(airports);
    //         console.table(remoteData)
    //     }, 'jsonp');
    // }, []);

    // const onFilter = React.useCallback((ev: { filterText: string | number | boolean; }) => {
    //     remoteFiltering(ev.filterText);
    //     return false;
    // }, []);

    // React.useEffect(() => {
    //     remoteFiltering('');
    // });
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
                        <IonCol size-sm="9" size-md="8" size-lg="4" style={{ marginTop: 16 }}>


                        {/* <Select
                            data={distritos}
                            display="anchored"
                            filter={true}
                            label="Distrito"
                        /> */}
                            <IonItem>

                                                         <IonLabel>Distrito</IonLabel>
                                <IonSelect interface="popover" onIonChange={onchange_filterConcelhoByDistritoId}>
                                    {distritos?.map((local: any) => {
                                        return (
                                            <IonSelectOption key={`${local.id}`}
                                                value={local.id}>{`${local.descricao}`}</IonSelectOption>
                                        )
                                    })}

                                </IonSelect> 
                                                                </IonItem>
                        </IonCol>

                        <IonCol size-sm="9" size-md="8" size-lg="4" style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Concelho</IonLabel>
                                <IonSelect interface="popover" onIonChange={onchange_filterFreguesiasByConcelhoId}>
                                    {concelhos?.map((local: any) => {
                                        return (
                                            <IonSelectOption key={`${local.id}`}
                                                value={local.id}>{`${local.descricao}`}</IonSelectOption>
                                        )
                                    })}
                                </IonSelect>
                            </IonItem>
                              {/* <Select
                            data={concelhos}
                            display="anchored"
                            filter={true}
                            label="Conselho"
                        /> */}
                        </IonCol>

                        <IonCol size-sm="9" size-md="8" size-lg="4" style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Freguesia</IonLabel>
                                <IonSelect interface="popover" onIonChange={onchange_filterLocalidadesByFreguesiaId}>
                                    {freguesias?.map((local: any) => {
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
                        <IonCol size-sm="9" size-md="8" size-lg="4" style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Localidade</IonLabel>
                                <IonSelect interface="popover" value={localidade}>
                                    {localidades?.map((local: any) => {
                                        return (
                                            <IonSelectOption key={`${local.id}`}
                                                value={local.id}>{`${local.descricao}`}</IonSelectOption>
                                        )
                                    })}
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm="9" size-md="8" size-lg="4">
                            <IonItem>
                                <IonLabel position="floating" itemType="number" placeholder="Nº Polícia">Nº Polícia/km</IonLabel>
                                <IonInput
                                   value={nrPolicia}></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm="9" size-md="8" size-lg="4">
                            <IonItem>
                                <IonLabel position="floating" itemType="text" placeholder="Nº Polícia">Zona/Bairro</IonLabel>
                                <IonInput value={zona}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm="9" size-md="8" size-lg="4">
                            <IonItem>
                                <IonLabel>Tipo</IonLabel>
                                <IonSelect interface="popover" value={tipo}>
                                    {tipos?.map((local: any) => {
                                        return (
                                            <IonSelectOption key={`${local.id}`}
                                                value={local.id}>{`${local.descricao}`}</IonSelectOption>
                                        )
                                    })}
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='8' size-md='6' size-lg='4'>
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
                                    value={arruamento}
                                    //   onKeyUp={}
                                    placeholder='Arruamento' />
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='4' size-md='6' size-lg='2'>
                            <IonItem lines='none'>
                                <IonButton style={{ background: '#084F87', borderRadius: 4 }}
                                    color="#084F87"
                                    slot="start"
                                    //    disabled={}
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

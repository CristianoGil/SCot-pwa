import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonListHeader, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { search, location } from "ionicons/icons";
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { useEffect, useRef, useState } from "react";

const LocalInfraccao: React.FC = () => {

    const [coordenadas, setCoordenadas] = useState({ "latitude": -19.831996961440094, "longitude": 34.83581986832666 });

    //const apiKey = 'AIzaSyAj5vVYw4tPa-GkA99WJRZ_NeiTcUI2688';
    const apiKey = 'AIzaSyCYy0Et8LID7WqxJxJOwFJ4_ejnepbKxAM'; //chave temporária
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
                    lat: -19.831996961440094,
                    lng: 34.83581986832666
                },
                zoom: 8
            }
        });
    }

    const getCurrentPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition();
        setCoordenadas({ "latitude": coordinates.coords.latitude, "longitude": coordinates.coords.longitude });
        // Move the map programmatically
        await newMap.setCamera({
            coordinate: {
                lat: coordinates.coords.latitude,
                lng: coordinates.coords.longitude
            }
        });
        // Add a marker to the map
        await newMap.addMarker({
            coordinate: {
                lat: coordinates.coords.latitude,
                lng: coordinates.coords.longitude
            }
        });
    };


    useEffect(() => {
        createMap();
    }, []);

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
                            <IonItem lines="none">
                                <span className="ion-padding-end">Lat: {coordenadas.latitude}</span>
                                <span>Lng: {coordenadas.longitude}</span>
                            </IonItem>

                            <IonButton onClick={getCurrentPosition}>USAR MINHA POSIÇÃO ATUAL  <IonIcon icon={location} slot='start' /></IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size-sm="9" size-md="8" size-lg="4" style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Distrito</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="distrito">Distrito 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm="9" size-md="8" size-lg="4" style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Conselho</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="conselho">Conselho 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm="9" size-md="8" size-lg="4" style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Freguesia</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="freguesia">Freguesia 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm="9" size-md="8" size-lg="4" style={{ marginTop: 16 }}>
                            <IonItem>
                                <IonLabel>Localidade</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="localidade">Localidade 1</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm="9" size-md="8" size-lg="4">
                            <IonItem>
                                <IonLabel position="floating" itemType="number" placeholder="Nº Polícia">Nº Polícia/km</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>

                        <IonCol size-sm="9" size-md="8" size-lg="4">
                            <IonItem>
                                <IonLabel position="floating" itemType="text" placeholder="Nº Polícia">Zona/Bairro</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm="9" size-md="8" size-lg="4">
                            <IonItem>
                                <IonLabel>Tipo</IonLabel>
                                <IonSelect interface="popover">
                                    <IonSelectOption value="tipo">Tipo 1</IonSelectOption>
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
                                    //   value={}
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
                                    onClick={() => { }}> Pesquisar </IonButton>

                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
}

export default LocalInfraccao;
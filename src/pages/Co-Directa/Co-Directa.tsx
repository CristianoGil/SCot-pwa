import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonCol, IonContent, IonDatetime, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonPopover, IonRadio, IonRadioGroup, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonToggle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Menu from '../../components/Menu';
import './Co-Directa.css';
import { alertCircle, moon, close, apps } from 'ionicons/icons';

const CoDirecta: React.FC = () => {

  const [cbSingular, setCbSingular] = useState(false);
  const [cbColetivo, setCbColetivo] = useState(false);
  const [searchNFI, setSearchNFI] = useState('');
  const [paisDeEmissao, setPaisDeEmissao] = useState<string>();
  const [isProprietarioDoVeiculo, setIsProprietarioDoVeiculo] = useState(false);
  const [selectedSingularColetivo, setSelectedSingularColetivo] = useState<string>('biff');
  const [number, setNumber] = useState<number>();
  const [showPopoverIndentVeiculo, setShowPopoverIndentVeiculo] = useState<boolean>(false);

  return (
    <>
      <Menu />
      <IonContent color='#FCFCFC'>

        <IonGrid id="gridGeral">
          <IonRow style={{ marginBottom: 40 }}>
            <IonCol>
              <h1>Registro de contraordenações Directas</h1>
              <p>Registro de contraordenações Directas</p>
            </IonCol>
          </IonRow>


          <IonRow>
            <IonCol>
              time-line
              <IonItem>
                <div className="ion-text-center">
                  <h3>text-center</h3>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac vehicula lorem.
                </div>
              </IonItem>
            </IonCol>
            <IonCol sizeSm='10'>
              {/* Arguido */}
              <IonCard>

                <IonCardHeader>
                  <IonCardTitle>Arguido</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol sizeSm='6'>
                        <IonItem>
                          <IonLabel>O arguido é proprietário do veículo?</IonLabel>
                          <IonToggle
                            slot="end"
                            name="darkMode"
                            checked={isProprietarioDoVeiculo}
                            onIonChange={e => {
                              setIsProprietarioDoVeiculo(e.detail.checked)

                            }}
                          />
                        </IonItem>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol sizeSm='3'>
                        <IonItem lines='none'>
                          <IonSearchbar value={searchNFI} onIonChange={e => setSearchNFI(e.detail.value!)}></IonSearchbar>
                        </IonItem>
                      </IonCol>
                      <IonCol sizeSm='3'>
                        <IonItem lines='none'>

                          <IonButtons style={{ color: 'white' }} slot="start" onClick={() => { setShowPopoverIndentVeiculo(true); }}>

                            <IonButton expand="full">
                              Pesquisar
                            </IonButton>
                          </IonButtons>

                        </IonItem>
                      </IonCol>
                      <IonCol>
                        <IonItem lines='none'>
                          <IonIcon slot="start" icon={alertCircle} />
                          <IonBadge color="warning" slot="start">
                            Dados sujeitos a validação
                          </IonBadge>


                        </IonItem>

                      </IonCol>
                    </IonRow>

                    <IonRow>
                      <IonCol sizeSm='3'>

                        <IonRadioGroup value={selectedSingularColetivo} onIonChange={e => setSelectedSingularColetivo(e.detail.value)}>

                          <IonItem lines='none'>
                            <IonLabel>Singular</IonLabel>
                            <IonRadio slot="start" value="biff" />
                          </IonItem>

                          <IonItem lines='none'>
                            <IonLabel>Coletivo</IonLabel>
                            <IonRadio slot="start" value="griff" />
                          </IonItem>

                        </IonRadioGroup>
                      </IonCol>
                      <IonCol sizeSm='3'>
                        <IonItem>
                          <IonLabel>País de emissão</IonLabel>
                          <IonSelect value={paisDeEmissao} interface="popover" onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                            <IonSelectOption value="female">Female</IonSelectOption>
                            <IonSelectOption value="male">Male</IonSelectOption>
                          </IonSelect>
                        </IonItem>
                      </IonCol>
                    </IonRow>

                  </IonGrid>

                </IonCardContent>
              </IonCard>
              {/* Arguido */}
            </IonCol>
          </IonRow>



          <IonRow>
            <IonCol>

            </IonCol>
            <IonCol sizeSm='10'>
              {/* Título de condução */}
              <IonCard>

                <IonCardHeader>
                  <IonCardTitle>Título de condução</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol sizeSm='6'>
                        <IonItem>
                          <IonLabel>O arguido apresentou o título de condução?</IonLabel>
                          <IonToggle
                            slot="end"
                            name="darkMode"
                            checked={isProprietarioDoVeiculo}
                            onIonChange={e => {
                              setIsProprietarioDoVeiculo(e.detail.checked)

                            }}
                          />
                        </IonItem>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol sizeSm='3'>
                        <IonItem>
                          <IonLabel>Título de condução</IonLabel>
                          <IonSelect value={paisDeEmissao} interface="popover" onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                            <IonSelectOption value="female">Female</IonSelectOption>
                            <IonSelectOption value="male">Male</IonSelectOption>
                          </IonSelect>
                        </IonItem>
                      </IonCol>
                      <IonCol sizeSm='3'>
                        <IonItem style={{ marginTop: -16 }}>
                          <IonLabel position="floating" itemType="number" defaultValue={number} placeholder="Enter Number">Número</IonLabel>
                          <IonInput></IonInput>
                        </IonItem>
                      </IonCol>
                    </IonRow>

                    <IonRow>
                      <IonCol sizeSm='3'>
                        <IonItem>
                          <IonLabel>País de emissão</IonLabel>
                          <IonSelect value={paisDeEmissao} interface="popover" onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                            <IonSelectOption value="female">Female</IonSelectOption>
                            <IonSelectOption value="male">Male</IonSelectOption>
                          </IonSelect>
                        </IonItem>
                      </IonCol>
                      <IonCol sizeSm='3'>
                        <IonItem>
                          <IonLabel>Entidade de emissora</IonLabel>
                          <IonSelect value={paisDeEmissao} interface="popover" onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                            <IonSelectOption value="female">Female</IonSelectOption>
                            <IonSelectOption value="male">Male</IonSelectOption>
                          </IonSelect>
                        </IonItem>
                      </IonCol>
                      <IonCol sizeSm='3'>
                        <IonItem>
                          <IonLabel>Local de emissão</IonLabel>
                          <IonSelect value={paisDeEmissao} interface="popover" onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                            <IonSelectOption value="female">Female</IonSelectOption>
                            <IonSelectOption value="male">Male</IonSelectOption>
                          </IonSelect>
                        </IonItem>
                      </IonCol>

                      <IonCol sizeSm='3'>
                        <IonItem style={{ marginTop: -16 }}>
                          <IonLabel position="floating" itemType="number" defaultValue={number} placeholder="Enter Number">Data de emissão</IonLabel>
                          <IonInput></IonInput>
                        </IonItem>
                      </IonCol>
                    </IonRow>

                  </IonGrid>

                </IonCardContent>
              </IonCard>
              {/* Título de condução */}
            </IonCol>
          </IonRow>



          <IonRow>
            <IonCol>

            </IonCol>
            <IonCol sizeSm='10'>
              {/* Documento de identificação */}
              <IonCard>

                <IonCardHeader>
                  <IonCardTitle>Documento de identificação</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol sizeSm='6'>
                        <IonItem>
                          <IonLabel>O arguido apresentou o documento de identificação?</IonLabel>
                          <IonToggle
                            slot="end"
                            name="darkMode"
                            checked={isProprietarioDoVeiculo}
                            onIonChange={e => {
                              setIsProprietarioDoVeiculo(e.detail.checked)

                            }}
                          />
                        </IonItem>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol sizeSm='3'>
                        <IonItem>
                          <IonLabel>Doc. de Identificação</IonLabel>
                          <IonSelect value={paisDeEmissao} interface="popover" onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                            <IonSelectOption value="female">Female</IonSelectOption>
                            <IonSelectOption value="male">Male</IonSelectOption>
                          </IonSelect>
                        </IonItem>
                      </IonCol>
                      <IonCol sizeSm='3'>
                        <IonItem style={{ marginTop: -16 }}>
                          <IonLabel position="floating" itemType="number" defaultValue={number} placeholder="Enter Number">Número</IonLabel>
                          <IonInput></IonInput>
                        </IonItem>
                      </IonCol>
                    </IonRow>

                    <IonRow>
                      <IonCol sizeSm='3'>
                        <IonItem>
                          <IonLabel>País de emissão</IonLabel>
                          <IonSelect value={paisDeEmissao} interface="popover" onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                            <IonSelectOption value="female">Female</IonSelectOption>
                            <IonSelectOption value="male">Male</IonSelectOption>
                          </IonSelect>
                        </IonItem>
                      </IonCol>
                      <IonCol sizeSm='3'>
                        <IonItem>
                          <IonLabel>Entidade de emissora</IonLabel>
                          <IonSelect value={paisDeEmissao} interface="popover" onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                            <IonSelectOption value="female">Female</IonSelectOption>
                            <IonSelectOption value="male">Male</IonSelectOption>
                          </IonSelect>
                        </IonItem>
                      </IonCol>
                      <IonCol sizeSm='3'>
                        <IonItem>
                          <IonLabel>Local de emissão</IonLabel>
                          <IonSelect value={paisDeEmissao} interface="popover" onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                            <IonSelectOption value="female">Female</IonSelectOption>
                            <IonSelectOption value="male">Male</IonSelectOption>
                          </IonSelect>
                        </IonItem>
                      </IonCol>

                      <IonCol sizeSm='3'>
                        <IonItem style={{ marginTop: -16 }}>
                          <IonLabel position="floating">Data de emissão</IonLabel>
                          <IonInput></IonInput>
                        </IonItem>
                      </IonCol>
                    </IonRow>

                  </IonGrid>

                </IonCardContent>
              </IonCard>
              {/* Documento de identificação */}
            </IonCol>
          </IonRow>


          <IonRow>
            <IonCol>

            </IonCol>
            <IonCol sizeSm='10'>
              {/* Informações adicionais */}
              <IonCard>

                <IonCardHeader>
                  <IonCardTitle>Informações adicionais</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol sizeSm='6'>
                        <IonItem>
                          <IonLabel>O arguido apresentou o documento de identificação?</IonLabel>
                          <IonToggle
                            slot="end"
                            name="darkMode"
                            checked={isProprietarioDoVeiculo}
                            onIonChange={e => {
                              setIsProprietarioDoVeiculo(e.detail.checked)

                            }}
                          />
                        </IonItem>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol sizeSm='9'>
                        <IonItem>
                          <IonLabel position="floating" placeholder="Nome / Firma">Nome / Firma</IonLabel>
                          <IonInput></IonInput>
                        </IonItem>
                      </IonCol>
                      <IonCol sizeSm='3'>
                        <IonItem>
                          <IonLabel position="floating">Data de nascimento</IonLabel>
                          <IonInput></IonInput>
                        </IonItem>
                      </IonCol>
                    </IonRow>

                    <IonRow>
                      <IonCol sizeSm='3'>
                        <IonRadioGroup value={selectedSingularColetivo} onIonChange={e => setSelectedSingularColetivo(e.detail.value)}>
                          <IonListHeader>
                            <IonLabel>
                              Domicílio / Sede
                            </IonLabel>
                          </IonListHeader>
                          <IonItem lines='none'>
                            <IonLabel>Singular</IonLabel>
                            <IonRadio slot="start" value="biff" />
                          </IonItem>

                          <IonItem lines='none'>
                            <IonLabel>Coletivo</IonLabel>
                            <IonRadio slot="start" value="griff" />
                          </IonItem>

                        </IonRadioGroup>
                      </IonCol>
                      <IonCol sizeSm='6'>
                        <IonItem>
                          <IonLabel position="floating" placeholder="Morada">Morada</IonLabel>
                          <IonInput></IonInput>
                        </IonItem>
                      </IonCol>

                      <IonCol sizeSm='3'>
                        <IonItem>
                          <IonLabel position="floating" itemType="number" defaultValue={number} placeholder="Enter Number">Nº Polícia</IonLabel>
                          <IonInput></IonInput>
                        </IonItem>
                      </IonCol>
                    </IonRow>

                    <IonRow>
                      <IonCol sizeSm='3'>
                        <IonItem>
                          <IonLabel position="floating" placeholder="Fracção">Fracção</IonLabel>
                          <IonInput></IonInput>
                        </IonItem>
                      </IonCol>
                      <IonCol sizeSm='3'>
                        <IonItem>
                          <IonLabel position="floating" placeholder="Localidade">Localidade</IonLabel>
                          <IonInput></IonInput>
                        </IonItem>
                      </IonCol>

                      <IonCol sizeSm='3'>
                        <IonItem>
                          <IonLabel position="floating" itemType="number" defaultValue={number} placeholder="Enter Number">Código Postal</IonLabel>
                          <IonInput></IonInput>
                        </IonItem>
                      </IonCol>

                      <IonCol sizeSm='3'>
                        <IonItem style={{ marginTop: 16 }}>
                          <IonLabel>País de emissão</IonLabel>
                          <IonSelect value={paisDeEmissao} interface="popover" onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                            <IonSelectOption value="female">Female</IonSelectOption>
                            <IonSelectOption value="male">Male</IonSelectOption>
                          </IonSelect>
                        </IonItem>
                      </IonCol>
                    </IonRow>

                    <IonRow>
                      <IonCol sizeSm='6'>
                        <IonItem>
                          <IonLabel position="floating" placeholder="Representante legal">Representante legal</IonLabel>
                          <IonInput></IonInput>
                        </IonItem>
                      </IonCol>

                    </IonRow>
                  </IonGrid>

                </IonCardContent>
              </IonCard>
              {/* Informações adicionais */}
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol color='secondary'>
              <IonItem lines='none'>
                <IonButton slot='end' color='medium' expand="full" onClick={e => {

                }}>Seguinte: Veículo</IonButton>

              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow style={{ margin: 30 }}>
            <IonCol>

            </IonCol>
          </IonRow>
        </IonGrid>

        <IonPopover
          id='popoverIdentVeiculo'
          isOpen={showPopoverIndentVeiculo}
          className="menu"
          mode="md"
          showBackdrop={true}
          onDidDismiss={() => { setShowPopoverIndentVeiculo(false); }}>
          <IonPage>
            <IonHeader className="ion-no-border">
              <IonToolbar color='transparent'>
                <IonLabel slot='start'>
                  <h1>
                    Identificação do veículo
                  </h1>
                </IonLabel>
                <IonButtons slot="end" onClick={() => { setShowPopoverIndentVeiculo(false); }}>

                  <IonButton
                    style={{
                      backgroundColor: "#EBF2FF",
                      color: "#003E7E",
                    }}>
                    Fechar

                  </IonButton>

                </IonButtons>

              </IonToolbar>
            </IonHeader>
            <IonContent>

            </IonContent>
          </IonPage>
        </IonPopover>

        {/* 
        <div className="container">
          <ul>
            <li><span></span>
              <div>
                <IonCard>
                  <IonCardHeader>
                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                    <IonCardTitle>Card Title</IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent>
                    Keep close to Nature's heart... and break clear away, once in awhile,
                    and climb a mountain or spend a week in the woods. Wash your spirit clean.
                  </IonCardContent>
                </IonCard>
              </div> <span className="number"><span>10:00</span> <span>12:00</span></span>
            </li>
          </ul>
        </div> */}
      </IonContent>
    </>
  );
};

export default CoDirecta;
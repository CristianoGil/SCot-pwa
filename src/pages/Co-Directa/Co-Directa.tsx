import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonListHeader, IonModal, IonPage, IonPopover, IonRadio, IonRadioGroup, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonToggle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import './Co-Directa.css';
import { calendar, search } from 'ionicons/icons';
import { format, parseISO } from 'date-fns';
import { setVisiblePopoverIndentVeiculo } from '../../components/Menu/popoverIndentVeiculoSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import AlertNetwork from '../../components/AlertNetwork/AlertNetwork';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import React from 'react';

const CoDirecta: React.FC = () => {

  const [paisDeEmissao, setPaisDeEmissao] = useState<string>();
  const [isProprietarioDoVeiculo, setIsProprietarioDoVeiculo] = useState(false);
  const [selectedSingularColetivo, setSelectedSingularColetivo] = useState<string>('');
  const [number, setNumber] = useState<number>();
  const [popoverDate1, setPopoverDate1] = useState('');
  const [popoverDate2, setPopoverDate2] = useState('');
  const [popoverDate3, setPopoverDate3] = useState('');
  const popoverIndentVeiculoIsOpen = useAppSelector((state) => state.popoverIndentVeiculo.isOpen)

  const dispatch = useAppDispatch()

  const formatDate = (value: string) => {
    return format(parseISO(value), 'MMM dd yyyy');
  };

  return (
    <IonPage>
      <Menu />
      <IonContent>
        <div>
          <IonGrid id="gridGeral" style={{ marginBottom: 40 }}>
            <IonRow style={{ marginBottom: 40 }}>
              <IonCol>
                <h1>Registro de contraordenações Directas</h1>
                <p>Registro de contraordenações Directas</p>
              </IonCol>
            </IonRow>


            <IonRow>
              <IonCol>
                time-line
                <Link to={'#teste'}>
                  Arguido
                </Link>
                <AlertNetwork />
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
                          <IonItem>
                            <IonButton color='medium' fill="clear" id="open-search-input-1">
                              <IonIcon icon={search} />
                            </IonButton>
                            <IonInput placeholder='NIF' />

                          </IonItem>
                        </IonCol>
                        <IonCol sizeSm='3'>
                          <IonItem lines='none'>

                            <IonButton style={{ background: '#084F87', borderRadius: 4 }} color="#084F87" slot="start" size='default' onClick={() => { dispatch(setVisiblePopoverIndentVeiculo(true)); }}>
                              Pesquisar
                            </IonButton>

                          </IonItem>
                        </IonCol>
                        <IonCol>

                          <div style={{ display: 'inline-flex', borderRadius: 10, background: '#FEF7EA', width: '100%', border: 'groove' }}>
                            <IonImg src={'assets/images/Group 4529_icon.png'} style={{ width: 'fit-content' }}></IonImg>
                            <strong style={{ marginTop: 12, marginLeft: 2, color: 'black' }}>Dados sujeitos a validação</strong>
                          </div>

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
                          <IonItem>
                            <IonInput id="date-input-1" value={popoverDate1} placeholder='Data de emissão' />
                            <IonButton color='medium' fill="clear" id="open-date-input-1">
                              <IonIcon icon={calendar} />
                            </IonButton>
                            <IonPopover trigger="open-date-input-1" showBackdrop={false}>
                              <IonDatetime
                                presentation="date"
                                onIonChange={ev => setPopoverDate1(formatDate(ev.detail.value!))}
                              />
                            </IonPopover>
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
                          <IonItem>
                            <IonInput id="date-input-2" value={popoverDate2} placeholder='Data de emissão' />
                            <IonButton color='medium' fill="clear" id="open-date-input-2">
                              <IonIcon icon={calendar} />
                            </IonButton>
                            <IonPopover trigger="open-date-input-2" showBackdrop={false}>
                              <IonDatetime
                                presentation="date"
                                onIonChange={ev => setPopoverDate2(formatDate(ev.detail.value!))}
                              />
                            </IonPopover>
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
                          <IonItem style={{ marginTop: -16 }}>
                            <IonLabel position="floating" placeholder="Nome / Firma">Nome / Firma</IonLabel>
                            <IonInput></IonInput>
                          </IonItem>
                        </IonCol>
                        <IonCol sizeSm='3'>
                          <IonItem>
                            <IonInput id="date-input-3" value={popoverDate3} placeholder='Data de nascimento' />
                            <IonButton color='medium' fill="clear" id="open-date-input-3">
                              <IonIcon icon={calendar} />
                            </IonButton>
                            <IonPopover trigger="open-date-input-3" showBackdrop={false}>
                              <IonDatetime
                                presentation="date"
                                onIonChange={ev => setPopoverDate3(formatDate(ev.detail.value!))}
                              />
                            </IonPopover>
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

            <IonRow id='teste'>
              <IonCol color='secondary'>
                <IonItem lines='none'>
                  <IonButton slot='end' color='light' onClick={e => {

                  }}>Seguinte: Veículo</IonButton>

                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                time-line
                <Link to={'#teste'}>
                  Veículo
                </Link>
              </IonCol>
              <IonCol sizeSm='10'>
                {/* Veículo */}
                <IonCard>

                  <IonCardHeader>
                    <IonCardTitle>Veículo</IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent>
                    <IonGrid>
                      <IonRow>
                        <IonCol sizeSm='6'>
                          <IonItem>
                            <IonLabel>O veículo é conduzido pelo Arguido?</IonLabel>
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
                            <IonButton color='medium' fill="clear" id="open-search-input-1">
                              <IonIcon icon={search} />
                            </IonButton>
                            <IonInput placeholder='Matricula' />

                          </IonItem>
                        </IonCol>
                        <IonCol sizeSm='3'>
                          <IonItem lines='none'>

                            <IonButton style={{ background: '#084F87', borderRadius: 4 }} color="#084F87" slot="start" size='default' onClick={() => { dispatch(setVisiblePopoverIndentVeiculo(true)); }}>
                              Pesquisar
                            </IonButton>

                          </IonItem>
                        </IonCol>
                        <IonCol>

                          <div style={{ display: 'inline-flex', borderRadius: 10, background: '#FEF7EA', width: '100%', border: 'groove' }}>
                            <IonImg src={'assets/images/Group 4529_icon.png'} style={{ width: 'fit-content' }}></IonImg>
                            <strong style={{ marginTop: 12, marginLeft: 2, color: 'black' }}>Dados sujeitos a validação</strong>
                          </div>

                        </IonCol>
                      </IonRow>

                      <IonRow>
                        <IonCol sizeSm='3'>

                          <IonItem>
                            <IonLabel>País</IonLabel>
                            <IonSelect value={paisDeEmissao} interface="popover" onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                              <IonSelectOption value="female">Female</IonSelectOption>
                              <IonSelectOption value="male">Male</IonSelectOption>
                            </IonSelect>
                          </IonItem>
                        </IonCol>
                        <IonCol sizeSm='3'>
                          <IonItem>
                            <IonLabel>Marca</IonLabel>
                            <IonSelect value={paisDeEmissao} interface="popover" onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                              <IonSelectOption value="female">Female</IonSelectOption>
                              <IonSelectOption value="male">Male</IonSelectOption>
                            </IonSelect>
                          </IonItem>
                        </IonCol>

                        <IonCol sizeSm='3'>
                          <IonItem>
                            <IonLabel>Modelo</IonLabel>
                            <IonSelect value={paisDeEmissao} interface="popover" onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                              <IonSelectOption value="female">Female</IonSelectOption>
                              <IonSelectOption value="male">Male</IonSelectOption>
                            </IonSelect>
                          </IonItem>
                        </IonCol>

                        <IonCol sizeSm='3'>
                          <IonItem>
                            <IonLabel>Cor</IonLabel>
                            <IonSelect value={paisDeEmissao} interface="popover" onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                              <IonSelectOption value="female">Female</IonSelectOption>
                              <IonSelectOption value="male">Male</IonSelectOption>
                            </IonSelect>
                          </IonItem>
                        </IonCol>
                      </IonRow>

                      <IonRow>
                        <IonCol sizeSm='3'>

                          <IonItem>
                            <IonLabel>Categoria</IonLabel>
                            <IonSelect value={paisDeEmissao} interface="popover" onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                              <IonSelectOption value="female">Female</IonSelectOption>
                              <IonSelectOption value="male">Male</IonSelectOption>
                            </IonSelect>
                          </IonItem>
                        </IonCol>
                        <IonCol sizeSm='3'>
                          <IonItem>
                            <IonLabel>Classe</IonLabel>
                            <IonSelect value={paisDeEmissao} interface="popover" onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                              <IonSelectOption value="female">Female</IonSelectOption>
                              <IonSelectOption value="male">Male</IonSelectOption>
                            </IonSelect>
                          </IonItem>
                        </IonCol>

                        <IonCol sizeSm='3'>
                          <IonItem>
                            <IonLabel>Tipo</IonLabel>
                            <IonSelect value={paisDeEmissao} interface="popover" onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                              <IonSelectOption value="female">Female</IonSelectOption>
                              <IonSelectOption value="male">Male</IonSelectOption>
                            </IonSelect>
                          </IonItem>
                        </IonCol>

                        <IonCol sizeSm='3'>
                          <IonItem>
                            <IonLabel>Subclasse</IonLabel>
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
                {/* Veículo */}
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol color='secondary'>
                <IonItem lines='none'>
                  <IonButton slot='end' color='light' onClick={e => {

                  }}>Arguido</IonButton>
                  <IonButton slot='end' color='light' onClick={e => {

                  }}>Condutor</IonButton>

                </IonItem>
              </IonCol>
            </IonRow>

          </IonGrid>

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
        </div>
      </IonContent>

    </IonPage>
  );
};

export default React.memo(CoDirecta);
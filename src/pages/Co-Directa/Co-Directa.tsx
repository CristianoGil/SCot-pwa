import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonListHeader, IonPage, IonPopover, IonRadio, IonRadioGroup, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonToggle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import Menu from '../../components/Menu';
import './Co-Directa.css';
import { alertCircle } from 'ionicons/icons';
import CardListItem from '../../components/CardListItem';

const CoDirecta: React.FC = () => {

  const [searchNFI, setSearchNFI] = useState('');
  const [paisDeEmissao, setPaisDeEmissao] = useState<string>();
  const [isProprietarioDoVeiculo, setIsProprietarioDoVeiculo] = useState(false);
  const [selectedSingularColetivo, setSelectedSingularColetivo] = useState<string>('biff');
  const [number, setNumber] = useState<number>();
  const [showPopoverIndentVeiculo, setShowPopoverIndentVeiculo] = useState<boolean>(false);

  return (
    <>
      <Menu />
      <IonContent>

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

                          <IonButton color="light" slot="start" onClick={() => { setShowPopoverIndentVeiculo(true); }}>
                            Pesquisar
                          </IonButton>

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
                <IonButton slot='end' color='medium' onClick={e => {

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
                <IonButton color="light" slot="end" onClick={() => { setShowPopoverIndentVeiculo(false); }}>
                  Fechar
                </IonButton>

              </IonToolbar>
            </IonHeader>
            <IonContent>

              {/* Informação do IMT */}
              <IonCard style={{ margin: 30 }}>

                <IonCardHeader>
                  <IonCardTitle>Informação do IMT</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <IonGrid>

                    <CardListItem
                      c1={{ titulo: 'Categoria', valor: 'Automóveis' }}
                      c2={{ titulo: 'Classe', valor: 'Ligeiros' }}
                      c3={{ titulo: 'Tipo', valor: 'Passageiros' }}
                      c4={{ titulo: 'Subclasse', valor: 'n/d' }}
                    />

                    <CardListItem
                      c1={{ titulo: 'Matrícula', valor: '00-XX-01' }}
                      c2={{ titulo: 'Chassi', valor: 'VF12R5A1H52369818' }}
                      c3={{ titulo: 'Ano Origem', valor: '2021' }}
                      c4={{ titulo: 'País de Origem', valor: 'Portugal' }}
                    />

                    <CardListItem
                      c1={{ titulo: 'Marca', valor: 'Toyota' }}
                      c2={{ titulo: 'Modelo', valor: 'Corolla' }}
                      c3={{ titulo: 'Cor principal', valor: 'Preto' }}
                      c4={{ titulo: 'Situação do veículo', valor: 'Veículo regular' }}
                    />

                    <CardListItem
                      c1={{ titulo: 'Data primeira matrícula', valor: '01-01-2021' }}
                      c2={{ titulo: 'Dígito matrícula', valor: '0' }}
                      c3={{ titulo: 'Variante', valor: '2R5A' }}
                      c4={{ titulo: 'Versão', valor: '2R5A1H' }}
                    />

                    <CardListItem
                      c1={{ titulo: 'Peso bruto', valor: 'n/d' }}
                      c2={{ titulo: 'Peso bruto total', valor: '1658' }}
                      c3={{ titulo: 'Peso bruto conjunto', valor: 'n/d' }}
                      c4={{ titulo: 'Tara total', valor: '1176' }}
                    />

                    <CardListItem
                      c1={{ titulo: 'Data de validade', valor: 'n/d' }}
                      c2={{ titulo: 'Data de matrícula', valor: '2015-03-23' }}
                      c3={{ titulo: 'Nº homologação CE', valor: '213123/1123' }}
                      c4={{ titulo: 'Nº homologação Nacional', valor: '95481667954' }}
                    />

                    <CardListItem
                      c1={{ titulo: 'Cilindrada', valor: '2000' }}
                      c2={{ titulo: 'Potência efetiva', valor: '220' }}
                      c3={{ titulo: 'Tipo combustivel', valor: 'GASOLINA' }}
                      c4={{ titulo: 'Potêncial rpm', valor: '5250' }}
                    />


                    <CardListItem
                      c1={{ titulo: 'Fração pot. efetiva de tara total', valor: 'n/d' }}
                      c2={{ titulo: 'Nº de lugares', valor: '005' }}
                      c3={{ titulo: 'Lotação em pé', valor: 'n/d' }}
                      c4={{ titulo: 'Categoria CE', valor: 'M1' }}
                    />

                    <CardListItem
                      c1={{ titulo: 'Tipo de caixa', valor: 'FECH.C/S TECTO ABRIR' }}
                      c2={{ titulo: 'Distância entre eixos', valor: '2606' }}
                      c3={{ titulo: 'Peso max. admissível 1', valor: '900' }}
                      c4={{ titulo: 'Peso max. admissível 2', valor: '877' }}
                    />

                    <CardListItem
                      c1={{ titulo: 'Peso max. admissível 3', valor: 'n/d' }}
                      c2={{ titulo: 'Peso max. admissível 4', valor: 'n/d' }}
                      c3={{ titulo: 'Peso max. admissível 5', valor: 'n/d' }}
                      c4={{ titulo: 'Peso bruto reb. com travão', valor: '1200' }}
                    />

                    <CardListItem
                      c1={{ titulo: 'Peso bruto reb. sem travão', valor: 'n/d' }}
                      c2={{ titulo: 'Nível sonoro estacionário', valor: '80.0' }}
                      c3={{ titulo: 'Nível sonoro rpm', valor: '3750' }}
                      c4={{ titulo: 'Emissões CO tipo I', valor: '.307' }}
                    />

                    <CardListItem
                      c1={{ titulo: 'Emissão de partículas', valor: 'n/d' }}
                      c2={{ titulo: 'CO2 combinado', valor: '113' }}
                      c3={{ titulo: 'Medida pneus frente', valor: '205/60 R16' }}
                      c4={{ titulo: 'Medida pneus retaguarda', valor: '205/60 R16' }}
                    />

                    <CardListItem
                      c1={{ titulo: 'Comprimento caixa', valor: 'n/d' }}
                      c2={{ titulo: 'Poder elevação', valor: 'n/d' }}
                    />

                    <CardListItem
                      c1={{ titulo: 'Anotações', valor: 'PN: 205/55 R17; T125/70 R16 (PNEU EMERGENCIA) BIOCOMBUSTÍVEL: 5%;', tamCol: '12' }}
                    />
                  </IonGrid>

                </IonCardContent>

                <IonRow class="cardfooter">
                  <IonCol>

                    <IonItem lines='none'>
                      <div className='ion-text-center'>
                        <small>Esconder dados complementares do veículo</small><br />
                      </div>
                    </IonItem>

                  </IonCol>
                </IonRow>
              </IonCard>
              {/* Informação do IMT */}

              {/* Informações adicionais */}
              <IonCard style={{ margin: 30 }}>

                <IonCardHeader>
                  <IonCardTitle>Informações adicionais</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>

                  <IonGrid>

                    <CardListItem
                      c1={{ titulo: 'Estado da viatura', valor: 'Normal' }}
                      c2={{ titulo: 'Inspeção em Atraso-IPO', valor: 'n/d' }}
                      c3={{ titulo: 'Coimas em Atraso', valor: 'Não' }}
                      c4={{ titulo: 'Sanções acessórias', valor: 'n/d' }}
                    />

                  </IonGrid>

                </IonCardContent>
              </IonCard>
              {/* Informações adicionais */}


              {/* Semelhantes */}
              <IonCard style={{ margin: 30 }}>

                <IonCardHeader>
                  <IonCardTitle>Semelhantes</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>

                  <IonGrid>



                  </IonGrid>

                </IonCardContent>
              </IonCard>
              {/* Semelhantes */}


              {/* Detalhes do semelhante selecionado */}
              <IonCard style={{ margin: 30 }}>

                <IonCardHeader>
                  <IonCardTitle>Detalhes do semelhante selecionado</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>

                  <IonGrid>

                    <CardListItem
                      c1={{ titulo: 'Categoria', valor: 'Automóveis' }}
                      c2={{ titulo: 'Classe', valor: 'Ligeiros' }}
                      c3={{ titulo: 'Tipo', valor: 'Passageiros' }}
                      c4={{ titulo: 'Subclasse', valor: 'n/d' }}
                    />

                    <CardListItem
                      c1={{ titulo: 'Matricula', valor: '00-XX-01' }}
                      c2={{ titulo: 'Chassi', valor: 'Ligeiros' }}
                      c3={{ titulo: 'Ano Origem', valor: '2021' }}
                      c4={{ titulo: 'País de Origem', valor: 'Portugal' }}
                    />


                    <CardListItem
                      c1={{ titulo: 'Marca', valor: 'Toyota' }}
                      c2={{ titulo: 'Modelo', valor: 'Corolla' }}
                      c3={{ titulo: 'Cor principal', valor: 'Azul' }}
                      c4={{ titulo: 'Situação do veículo', valor: 'Veículo regulado' }}
                    />

                  </IonGrid>

                </IonCardContent>
              </IonCard>
              {/* Detalhes do semelhante selecionado */}

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
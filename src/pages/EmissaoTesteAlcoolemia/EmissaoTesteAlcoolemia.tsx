import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCheckbox,
    IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRadio, IonRadioGroup, IonRow, IonSelect, IonSelectOption,
} from '@ionic/react';
import Menu from '../../components/Menu/Menu';
import React, { useState } from 'react';
import './EmissaoTesteAlcoolemia.scss';
import Veiculo from '../../components/Contra-Ordenacoes/Components/Veiculo/Veiculo';
import TituloConducao from '../../components/Contra-Ordenacoes/Components/TituloConducao/TituloConducao';
import Arguido from '../../components/Contra-Ordenacoes/Components/Arguido/Arguido';
import DocumentoIdentificacao from '../../components/Contra-Ordenacoes/Components/DocumentoIdentificacao/DocumentoIdentificacao';
import InformacoesAdicionais from '../../components/Contra-Ordenacoes/Components/InformacoesAdicionais/InformacoesAdicionais';
import LocalInfraccao from '../../components/Contra-Ordenacoes/Components/LocalInfraccao/LocalInfraccao';
import DatePicker from '../../components/Combos/DatePicker';
import NumeroDocumento from '../../components/NumeroDocumento/NumeroDocumento';
import { customPopoverOptions } from '../../utils/customPopoverOptions';

const CoIndirecta: React.FC = () => {

    const [checked, setChecked] = useState(false);

    return (
        <IonPage>
            <Menu />
            <IonContent className="coindirecta">

                <IonGrid id="gridGeral" style={{ marginBottom: 40 }}>

                    <IonRow style={{ marginBottom: 40 }}>
                        <IonCol size="12">
                            <h1>Registo de Teste de Alcoolémia</h1>
                            <p>Registo de Teste de Alcoolémia</p>
                        </IonCol>
                    </IonRow>

                </IonGrid>

                <IonGrid className="coindirectaPartial">

                    <IonRow>
                        <IonCol size-sm='12' size-md="12" size-lg="11">
                            {/* Veículo */}
                            <Veiculo />
                            {/* Veículo */}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size-sm='12' size-md="12" size-lg="11">
                            {/*START: ARGUIDO*/}
                            <Arguido />
                            {/*END: ARGUIDO*/}
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md="12" size-lg="11">
                            {/* Título de condução */}
                            <TituloConducao />
                            {/* Título de condução */}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size-sm='12' size-md="12" size-lg="11">
                            {/* Documento de identificação */}
                            <DocumentoIdentificacao />
                            {/* Documento de identificação */}
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md="12" size-lg="11">
                            {/* Informações adicionais */}
                            <InformacoesAdicionais />
                            {/* Informações adicionais */}
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md="12" size-lg="11">
                            {/*START: Local Infracção*/}
                            <LocalInfraccao />
                            {/*END: Local Infracção*/}
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md="12" size-lg="11">
                            {/*START: Álcool*/}

                            <IonCard className={'alcool'}>
                                <IonCardHeader>
                                    <IonCardTitle>Álcool</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size-sm='12' size-md='10' size-lg='4' style={{ marginTop: 16 }}>
                                                <DatePicker inputName={'unidade-data_horaInfraccao'} textLabel="Data/Hora *" />
                                            </IonCol>
                                            <IonCol size-sm='12' size-md='10' size-lg='4' style={{ marginTop: 10 }}>

                                                <IonItem lines='none'>

                                                    <IonCheckbox checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
                                                    <IonLabel class="ion-margin-start">Punível à TAS 0.200 g/l</IonLabel>
                                                </IonItem>

                                            </IonCol>

                                        </IonRow>

                                        <IonRow class="ion-margin-top">
                                            <IonCol size-sm='12' size-md='10' size-lg='6'>
                                                <IonHeader>
                                                    <IonLabel>Tipo de Teste *</IonLabel>
                                                </IonHeader>
                                                <IonRadioGroup
                                                    // value={}
                                                    onIonChange={e => () => { }}>
                                                    <IonRow>
                                                        <IonCol size='4'>
                                                            <IonItem lines='none' className="veiculo-proprietario-radio radio-item">
                                                                <IonRadio value="arguido" />
                                                                <IonLabel className="radioBox" class="ion-margin-start">Teste de Ar Expirado</IonLabel>
                                                            </IonItem>
                                                        </IonCol>
                                                        <IonCol size='4'>
                                                            <IonItem lines='none' className="veiculo-proprietario-radio radio-Item">
                                                                <IonRadio value="condutor" />
                                                                <IonLabel className="radioBox" class="ion-margin-start">Análise Sangue</IonLabel>
                                                            </IonItem>
                                                        </IonCol>
                                                        <IonCol size='4'>
                                                            <IonItem lines='none' className="veiculo-proprietario-radio radio-Item">
                                                                <IonRadio value="outro" />
                                                                <IonLabel className="radioBox" class="ion-margin-start">Exame Médico</IonLabel>
                                                            </IonItem>
                                                        </IonCol>
                                                    </IonRow>
                                                </IonRadioGroup>
                                            </IonCol>
                                        </IonRow>

                                    </IonGrid>
                                </IonCardContent>
                            </IonCard>

                            {/*END: Álcool*/}
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md="12" size-lg="11">
                            {/*START: Alcoolímetro*/}

                            <IonCard className={'Alcoolimetro'}>
                                <IonCardHeader>
                                    <IonCardTitle>Alcoolímetro</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonGrid>

                                        <IonRow>
                                            <IonCol size-sm='12' size-md='10' size-lg='4' style={{ marginTop: 16 }}>
                                                <IonItem>
                                                    <IonLabel position="floating">Marca/Modelo *</IonLabel>
                                                    <IonSelect interfaceOptions={customPopoverOptions} interface="popover">
                                                        <IonSelectOption value="Marca_Modelo">Marca/Modelo 1</IonSelectOption>
                                                    </IonSelect>
                                                </IonItem>
                                            </IonCol>
                                            <IonCol size-sm='12' size-md='10' size-lg='4' style={{ marginTop: 16 }}>
                                                <IonItem>
                                                    <IonLabel position="floating">Série *</IonLabel>
                                                    <IonSelect interfaceOptions={customPopoverOptions} interface="popover">
                                                        <IonSelectOption value="Serie">Série 1</IonSelectOption>
                                                    </IonSelect>
                                                </IonItem>
                                            </IonCol>
                                            <IonCol size-sm='12' size-md='10' size-lg='4' style={{ marginTop: 16 }}>
                                                <IonItem>
                                                    <IonLabel position="floating">Tipo Verificação *</IonLabel>
                                                    <IonSelect interfaceOptions={customPopoverOptions} interface="popover">
                                                        <IonSelectOption value="Tipo_Verificação">Tipo Verificação 1</IonSelectOption>
                                                    </IonSelect>
                                                </IonItem>
                                            </IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol size-sm='12' size-md='10' size-lg='4'>

                                                <IonItem>
                                                    <IonLabel position="floating" itemType="text" placeholder="Número">Número *</IonLabel>
                                                    <IonInput></IonInput>
                                                </IonItem>

                                            </IonCol>
                                            <IonCol size-sm='12' size-md='10' size-lg='4' style={{ marginTop: 16 }}>
                                                <DatePicker inputName={'verificadoEm'} textLabel="Verificado em *" />
                                            </IonCol>
                                            <IonCol size-sm='12' size-md='10' size-lg='4'>

                                                <IonItem>
                                                    <IonLabel position="floating" itemType="text" placeholder="Número de Talão">Número de Talão *</IonLabel>
                                                    <IonInput></IonInput>
                                                </IonItem>

                                            </IonCol>
                                        </IonRow>

                                        <IonRow class="ion-margin-top">
                                            <IonCol size-sm='12' size-md='10' size-lg='8'>
                                                <IonHeader>
                                                    <IonLabel>Teste (g/l) *</IonLabel>
                                                </IonHeader>
                                                <IonRadioGroup
                                                    // value={}
                                                    onIonChange={e => () => { }}>
                                                    <IonRow>
                                                        <IonCol size-sm='12' size-md='10' size-lg='6'>

                                                            <IonItem>
                                                                <IonLabel position="floating" itemType="text" placeholder="Valor Registrado">Valor Registrado</IonLabel>
                                                                <IonInput></IonInput>
                                                            </IonItem>

                                                        </IonCol>
                                                        <IonCol size-sm='12' size-md='10' size-lg='6'>

                                                            <IonItem>
                                                                <IonLabel position="floating" itemType="text" placeholder="Valor Apurado">Valor Apurado</IonLabel>
                                                                <IonInput></IonInput>
                                                            </IonItem>

                                                        </IonCol>

                                                    </IonRow>
                                                </IonRadioGroup>
                                            </IonCol>
                                        </IonRow>

                                        <IonRow class="ion-margin-top">
                                            <IonCol size-sm='12' size-md='10' size-lg='12'>
                                                <IonHeader>
                                                    <IonLabel>ContraProva *</IonLabel>
                                                </IonHeader>
                                                <IonRadioGroup
                                                    // value={}
                                                    onIonChange={e => () => { }}>
                                                    <IonRow>
                                                        <IonCol size='4'>
                                                            <IonItem lines='none' className="veiculo-proprietario-radio radio-item">
                                                                <IonRadio value="arguido" />
                                                                <IonLabel className="radioBox" class="ion-margin-start">Não Pretende ContraProva</IonLabel>
                                                            </IonItem>
                                                        </IonCol>
                                                        <IonCol size='4'>
                                                            <IonItem lines='none' className="veiculo-proprietario-radio radio-Item">
                                                                <IonRadio value="condutor" />
                                                                <IonLabel className="radioBox" class="ion-margin-start">ContraProva através de teste de ar expirado</IonLabel>
                                                            </IonItem>
                                                        </IonCol>
                                                        <IonCol size='4'>
                                                            <IonItem lines='none' className="veiculo-proprietario-radio radio-Item">
                                                                <IonRadio value="outro" />
                                                                <IonLabel className="radioBox" class="ion-margin-start">ContraProva através de análise de sangue</IonLabel>
                                                            </IonItem>
                                                        </IonCol>
                                                    </IonRow>
                                                </IonRadioGroup>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonCardContent>
                            </IonCard>

                            {/*END: Alcoolímetro*/}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size-sm='12' size-md="12" size-lg="11">
                            {/*START: Número de Documento*/}
                            <IonCard className={'co-pagamento'}>
                                <NumeroDocumento />
                            </IonCard>
                            {/*END: Número de Documento*/}
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonContent>
        </IonPage>
    );
};

export default CoIndirecta;

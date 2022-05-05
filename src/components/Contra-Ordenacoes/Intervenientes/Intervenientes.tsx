import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonDatetime,
    IonGrid,
    IonIcon,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonListHeader,
    IonPopover,
    IonRadio,
    IonRadioGroup,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonToolbar
} from '@ionic/react';
import {useState} from 'react';
import {calendar, informationCircle, map, personCircle, search, star} from 'ionicons/icons';
import {format, parseISO} from 'date-fns';
import {setVisiblePopoverIndentVeiculo} from '../../../components/Menu/popoverIndentVeiculoSlice';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';
import AlertNetwork from '../../../components/AlertNetwork/AlertNetwork';
import {Link} from 'react-router-dom';
import React from 'react';

import Arguido from '../../../components/Contra-Ordenacoes/Arguido/Arguido';
import {IDocumentoPessoa, IPerson} from '../../../model/person';
import TipoConducao from '../TipoConducao/TipoConducao';
import DocumentoIdentificacao from '../DocumentoIdentificacao/DocumentoIdentificacao';
import InformacoesAdicionais from '../InformacoesAdicionais/InformacoesAdicionais';


const Intervenientes: React.FC = () => {

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


    // START: ARGUIDO
    const [arguidoData, setArguidoData] = useState<IPerson>();
    // END: ARGUIDO

    // START: TIPO CONDUCAO
    const [tipoDocumento, setTipoDocumentoData] = useState();
    // END: TIPO CONDUCAO

    // START:  DOCUMENTO IDENTIFICACAO
    const [docIdentificacao, setDocIdentificacaoData] = useState();
    // END:  DOCUMENTO IDENTIFICACAO

    // START:  INFORMACOES ADICIONAIS
    const [informacoesAdicionaisData, setInformacoesAdicionaisData] = useState();
    // END:   INFORMACOES ADICIONAIS
    return (
        <IonGrid className="intervenientes">
            <IonRow>
                <IonCol size-sm='12' size-md="12" size-lg="11">
                    {/*START: ARGUIDO*/}
                    <Arguido setParentArguidoData={setArguidoData}/>
                    {/*END: ARGUIDO*/}
                </IonCol>
            </IonRow>


            <IonRow>
                <IonCol size-sm='12' size-md="12" size-lg="11">
                    {/* Título de condução */}
                    <TipoConducao setParentTipoConducaoData={setTipoDocumentoData}/>
                    {/* Título de condução */}
                </IonCol>
            </IonRow>


            <IonRow>
                <IonCol size-sm='12' size-md="12" size-lg="11">
                    {/* Documento de identificação */}
                    <DocumentoIdentificacao setParentDocumentoIdentificacaoData={setDocIdentificacaoData}/>
                    {/* Documento de identificação */}
                </IonCol>
            </IonRow>


            <IonRow>
                <IonCol size-sm='12' size-md="12" size-lg="11">
                    {/* Informações adicionais */}
                    <InformacoesAdicionais setParentInformacoesAdicionaisData={setInformacoesAdicionaisData}/>
                    {/* Informações adicionais */}
                </IonCol>
            </IonRow>

            <IonRow>
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
                                                <IonIcon icon={search}/>
                                            </IonButton>
                                            <IonInput placeholder='Matricula'/>

                                        </IonItem>
                                    </IonCol>
                                    <IonCol sizeSm='3'>
                                        <IonItem lines='none'>

                                            <IonButton style={{background: '#084F87', borderRadius: 4}}
                                                       color="#084F87" slot="start" size='default'
                                                       onClick={() => {
                                                           dispatch(setVisiblePopoverIndentVeiculo(true));
                                                       }}>
                                                Pesquisar
                                            </IonButton>

                                        </IonItem>
                                    </IonCol>
                                    <IonCol>

                                        <div style={{
                                            display: 'inline-flex',
                                            borderRadius: 10,
                                            background: '#FEF7EA',
                                            width: '100%',
                                            border: 'groove'
                                        }}>
                                            <IonImg src={'assets/images/Group 4529_icon.png'}
                                                    style={{width: 'fit-content'}}></IonImg>
                                            <strong style={{marginTop: 12, marginLeft: 2, color: 'black'}}>Dados
                                                sujeitos a validação</strong>
                                        </div>

                                    </IonCol>
                                </IonRow>

                                <IonRow>
                                    <IonCol sizeSm='3'>

                                        <IonItem>
                                            <IonLabel>País</IonLabel>
                                            <IonSelect value={paisDeEmissao} interface="popover"
                                                       onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                                                <IonSelectOption value="female">Female</IonSelectOption>
                                                <IonSelectOption value="male">Male</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol sizeSm='3'>
                                        <IonItem>
                                            <IonLabel>Marca</IonLabel>
                                            <IonSelect value={paisDeEmissao} interface="popover"
                                                       onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                                                <IonSelectOption value="female">Female</IonSelectOption>
                                                <IonSelectOption value="male">Male</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol sizeSm='3'>
                                        <IonItem>
                                            <IonLabel>Modelo</IonLabel>
                                            <IonSelect value={paisDeEmissao} interface="popover"
                                                       onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                                                <IonSelectOption value="female">Female</IonSelectOption>
                                                <IonSelectOption value="male">Male</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol sizeSm='3'>
                                        <IonItem>
                                            <IonLabel>Cor</IonLabel>
                                            <IonSelect value={paisDeEmissao} interface="popover"
                                                       onIonChange={e => setPaisDeEmissao(e.detail.value)}>
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
                                            <IonSelect value={paisDeEmissao} interface="popover"
                                                       onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                                                <IonSelectOption value="female">Female</IonSelectOption>
                                                <IonSelectOption value="male">Male</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol sizeSm='3'>
                                        <IonItem>
                                            <IonLabel>Classe</IonLabel>
                                            <IonSelect value={paisDeEmissao} interface="popover"
                                                       onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                                                <IonSelectOption value="female">Female</IonSelectOption>
                                                <IonSelectOption value="male">Male</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol sizeSm='3'>
                                        <IonItem>
                                            <IonLabel>Tipo</IonLabel>
                                            <IonSelect value={paisDeEmissao} interface="popover"
                                                       onIonChange={e => setPaisDeEmissao(e.detail.value)}>
                                                <IonSelectOption value="female">Female</IonSelectOption>
                                                <IonSelectOption value="male">Male</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol sizeSm='3'>
                                        <IonItem>
                                            <IonLabel>Subclasse</IonLabel>
                                            <IonSelect value={paisDeEmissao} interface="popover"
                                                       onIonChange={e => setPaisDeEmissao(e.detail.value)}>
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

        </IonGrid>
    )
}

export default React.memo(Intervenientes);
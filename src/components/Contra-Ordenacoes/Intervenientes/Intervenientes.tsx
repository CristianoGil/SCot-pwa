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

import Arguido from '../../../components/Contra-Ordenacoes/Components/Arguido/Arguido';
import {IDocumentoPessoa, IPerson} from '../../../model/person';
import TipoConducao from '../Components/TipoConducao/TipoConducao';
import DocumentoIdentificacao from '../Components/DocumentoIdentificacao/DocumentoIdentificacao';
import InformacoesAdicionais from '../Components/InformacoesAdicionais/InformacoesAdicionais';
import Veiculo from '../Components/Veiculo/Veiculo';


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

    // START: VEICULO
    const [veiculoData, setVeiculoData] = useState();
    // END: VEICULO

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
                <IonCol size-sm='12' size-md="12" size-lg="11">
                    {/* Veículo */}
                    <Veiculo setParentVeiculoData={setVeiculoData}/>
                    {/* Veículo */}
                </IonCol>
            </IonRow>

        </IonGrid>
    )
}

export default React.memo(Intervenientes);


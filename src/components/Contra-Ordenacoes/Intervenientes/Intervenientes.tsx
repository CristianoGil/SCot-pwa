import {
    IonCol,
    IonGrid,
    IonRow
} from '@ionic/react';
import {useState} from 'react';
import {format, parseISO} from 'date-fns';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';
import React from 'react';
import Arguido from '../../../components/Contra-Ordenacoes/Components/Arguido/Arguido';
import {IDocumentoPessoa, IPerson} from '../../../model/person';
import TituloConducao from '../Components/TituloConducao/TituloConducao';
import DocumentoIdentificacao from '../Components/DocumentoIdentificacao/DocumentoIdentificacao';
import InformacoesAdicionais from '../Components/InformacoesAdicionais/InformacoesAdicionais';
import Veiculo from '../Components/Veiculo/Veiculo';
import './Intervenientes.scss';
interface IProps {
    setCoDirectaData?: any
}
const Intervenientes: React.FC<IProps> = (props) => {

    const [paisDeEmissao, setPaisDeEmissao] = useState<string>();
    const [isProprietarioDoVeiculo, setIsProprietarioDoVeiculo] = useState(false);
    const [selectedSingularColetivo, setSelectedSingularColetivo] = useState<string>('');
    const [number, setNumber] = useState<number>();
    const [popoverDate1, setPopoverDate1] = useState('');
    const [popoverDate2, setPopoverDate2] = useState('');
    const [popoverDate3, setPopoverDate3] = useState('');

    const dispatch = useAppDispatch()

    const formatDate = (value: string) => {
        return format(parseISO(value), 'MMM dd yyyy');
    };


    // START: ARGUIDO
    const [arguidoData, setArguidoData] = useState<IPerson>();
    // END: ARGUIDO

    // START: TITULO CONDUCAO
    const [tituloDocumentoData, setTituloDocumentoData] = useState();
    // END: TITULO CONDUCAO

    // START:  DOCUMENTO IDENTIFICACAO
    const [docIdentificacaoData, setDocIdentificacaoData] = useState();
    // END:  DOCUMENTO IDENTIFICACAO

    // START:  INFORMACOES ADICIONAIS
    const [informacoesAdicionaisData, setInformacoesAdicionaisData] = useState();
    // END:   INFORMACOES ADICIONAIS

    // START: VEICULO
    const [veiculoData, setVeiculoData] = useState();
    // END: VEICULO

    React.useEffect(()=>{
        const data = {
            arguido: arguidoData,
            documento: tituloDocumentoData,
            docIdentificacao: docIdentificacaoData,
            informacoesAdicionais: informacoesAdicionaisData,
            veiculo: veiculoData
        }
        
        props.setCoDirectaData(data);
    },[arguidoData,tituloDocumentoData,docIdentificacaoData,informacoesAdicionaisData,veiculoData])

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
                    <TituloConducao currentDocumentosData={arguidoData?.documentos} setParentTituloConducaoData={setTituloDocumentoData}/>
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
                    <InformacoesAdicionais currentData={arguidoData?.moradas} representanteLegal={arguidoData?.representanteLegal}  setParentInformacoesAdicionaisData={setInformacoesAdicionaisData}/>
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


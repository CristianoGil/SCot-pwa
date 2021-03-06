import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonPopover,
    IonRadio,
    IonRadioGroup,
    IonRow,
    IonSegment,
    IonSegmentButton,
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonToolbar,
    useIonAlert,
    useIonLoading,
} from '@ionic/react';
import {useContext, useState} from 'react';
import {bookOutline, checkboxOutline, search, star} from 'ionicons/icons';
import React from 'react';
import {useAppSelector} from '../../../../app/hooks';
import {setVisiblePopoverIndentVeiculo} from '../../../Menu/popoverIndentVeiculoSlice';
import './Veiculo.scss';
import Pais from '../../../Combos/Veiculo/Pais';
import {AlertNetworkOfflineContext} from '../../../../Context/AlertNetworkOfflineContext';
import {getNetworkState} from '../../../../common/capacitor_global';
import _ from 'underscore';
import {Contraordenacao} from '../../../../api/Contraordenacao';
import {IPesquisarPessoaResponse, IPesquisarVeiculoResponse} from '../../../../model/contraordenacao';
import CardListItem from '../../../CardListItem';
import DataTable from 'react-data-table-component';
import {dateFormat} from '../../../../utils/apex-formatters';
import Marca from '../../../Combos/Veiculo/Marca';
import Modelo from '../../../Combos/Veiculo/Modelo';
import Cor from '../../../Combos/Veiculo/Cor';
import Categoria from '../../../Combos/Veiculo/Categoria';
import Classe from '../../../Combos/Veiculo/Classe';
import Tipo from '../../../Combos/Veiculo/Tipo';
import Subclasse from '../../../Combos/Veiculo/Subclasse';
import {ICoimaVeiculo, IVeiculo} from '../../../../model/veiculo';

interface IPROPS {
    setParentVeiculoData?: any
}

const Veiculo: React.FC<IPROPS> = (props) => {

    const alertOfflineContext = useContext<any>(AlertNetworkOfflineContext)

    const [presentAlert, dismissAlert] = useIonAlert();
    const [presentOnLoanding, dismissOnLoanding] = useIonLoading();
    const [paisDeEmissao, setPaisDeEmissao] = useState<string>();
    const [isConduzidoVeiculo, setIsConduzidoVeiculo] = useState(false);
    const [VeiculoVeiculoSingularColetivo, setVeiculoVeiculoSingularColetivo] = useState<string>('singular');
    const [openPopoverVeiculoData, setOpenPopoverVeiculoData] = useState(false);

    //START:  INPUT Matricula
    const [veiculoMatricula, setVeiculoMatricula] = useState('');
    const keyup_VeiculoMatricula = (e: any) => {
        setVeiculoMatricula(e.target.value);
    }

    const handler_VeiculoSearchByMatricula = (e: any) => {
        e.preventDefault();
        dismissOnLoanding();

        if (_.isEmpty(veiculoMatricula)) {
            presentAlert({
                header: 'Aten????o!',
                message: 'Matricula inv??lido.',
                buttons: [
                    {text: 'Fechar'},
                ]
            })
            return;
        }

        if (!navigator.onLine) {
            alertOfflineContext.openModal();
            return;
        }


        presentOnLoanding({
            message: 'A pesquisar...'
        });

        searchVeiculoByMatricula();

    }

    const [veiculoData, setVeiculoData] = useState<IVeiculo>();
    const searchVeiculoByMatricula = async () => {

        const instanceContraordenacao = new Contraordenacao();
        await instanceContraordenacao.pesquisarVeiculo({matricula: veiculoMatricula}).then((_veiculoData: IPesquisarVeiculoResponse) => {

            setTimeout(() => {
                setOpenPopoverVeiculoData(true);
                setTimeout(() => {
                    // @ts-ignore
                    setVeiculoData(_veiculoData.veiculo);
                    console.log(_veiculoData.veiculo)
                })
                dismissOnLoanding();
            }, 100)

        }).catch((e: any) => {
            presentAlert({
                header: 'Error!',
                message: 'Opera????o sem sucesso!\n' + e.message,
                buttons: [
                    {text: 'Fechar'},
                ]
            })
        }).finally(() => {
            dismissOnLoanding();
        })
    }

    // END: INPUT Matricula

    // START: Popover
    // Morada
    const [segmentMorada, setSegmentMorada] = useState('morada');

    // Documentos
    const [segmentDocumentos, setSegmentDocumentos] = useState('documentos');
    // END: Popover


    // Pais
    const [pais, setPais] = useState<string | number>();

    // Marca
    const [marca, setMarca] = useState<string | number>();

    // Cor
    const [cor, setCor] = useState<string | number>();

    // Classe
    const [classe, setClasse] = useState<string | number>();

    // Categoria
    const [categoria, setCategoria] = useState<string | number>();

    //Modelo
    const [modelo, setModelo] = useState<string | number>();
    
    // Subclasse
    const [subclasse, setSubclasse] = useState<string | number>();
    
    // Tipo
    const [tipo, setTipo] = useState<string | number>();

    const handlerFullfillForm = () => {
        props.setParentVeiculoData(veiculoData);
        setOpenPopoverVeiculoData(false);

        if (veiculoData) {
            setPais(veiculoData?.pais?.id);
            setMarca(veiculoData?.marca?.id);
            setCor(veiculoData?.cor?.id);
            setClasse(veiculoData?.classe?.id);
            setCategoria(veiculoData?.categoria?.id);
            setModelo(veiculoData?.modelo?.id);
            setSubclasse(veiculoData?.subclasse?.id);
            setTipo(veiculoData?.tipo?.id);

        }
    }

    React.useEffect(()=>{
        const _data = {
            isConduzidoVeiculo,veiculoMatricula,pais,marca,modelo,cor,categoria,classe,tipo,subclasse
        }

        if (_.has(props, 'setParentVeiculoData')) {
            props.setParentVeiculoData(_data)
        }

    }, [isConduzidoVeiculo,veiculoMatricula,pais,marca,modelo,cor,categoria,classe,tipo,subclasse ])


    return (
        <IonCard className={'co-veiculo'}>

            <IonCardHeader>
                <IonCardTitle>Veiculo</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='4'>
                            <IonItem lines={'none'}>
                                <IonLabel>O Veiculo ?? conduzido pelo arguido?</IonLabel>
                                <IonToggle
                                    slot="end"
                                    name="veiculo-conduzidoVeiculo"
                                    checked={isConduzidoVeiculo}
                                    onIonChange={e => {
                                        setIsConduzidoVeiculo(e.detail.checked)
                                    }}
                                />
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size-sm='8' size-md='5' size-lg='3'>
                            <IonItem>
                                <IonButton color='medium' fill="clear" id="open-search-input-1">
                                    <IonIcon icon={search}/>
                                </IonButton>
                                <IonInput
                                    required={true}
                                    clearInput={true}
                                    name='Veiculo-matricula'
                                    value={veiculoMatricula}
                                    onKeyUp={keyup_VeiculoMatricula}
                                    placeholder='Matr??cula'/>
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='4' size-md='5' size-lg='2'>
                            <IonItem lines='none'>
                                <IonButton style={{background: '#084F87', borderRadius: 4}}
                                           color="#084F87"
                                           slot="start"
                                           size='default'
                                           onClick={handler_VeiculoSearchByMatricula}> Pesquisar </IonButton>

                            </IonItem>
                        </IonCol>

                        <IonCol size-sm='12' size-md='8' size-lg='6'>
                            <div className="info-content-label" style={{
                                display: 'inline-flex',
                                borderRadius: 10,
                                width: '100%',
                                border: 'none'
                            }}>
                                <IonImg src={'assets/images/Group 4529_icon.png'}
                                        style={{width: 'fit-content'}}></IonImg>
                                <strong style={{marginTop: 12, marginLeft: 2, color: 'black'}}>Dados sujeitos a
                                    valida????o</strong>
                            </div>
                        </IonCol>
                    </IonRow>


                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <Pais selected={pais} setSelected={setPais} inputName={'veiculo-pais'} textLabel={'Pa??s'}
                                  interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <Marca selected={marca} setSelected={setMarca} inputName={'veiculo-marca'}
                                   textLabel={'Marca'} interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <Modelo selected={modelo} setSelected={setModelo}  inputName={'veiculo-modelo'} textLabel={'Modelo'} interface="popover"/>
                        </IonCol>
                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <Cor selected={cor} setSelected={setCor}  inputName={'veiculo-cor'} textLabel={'Cor'}/>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <Categoria selected={categoria} setSelected={setCategoria}  inputName={'veiculo-categoria'} textLabel={'Categoria'} interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <Classe selected={classe} setSelected={setClasse}  inputName={'veiculo-classe'} textLabel={'Classe'} interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <Tipo selected={tipo} setSelected={setTipo}  inputName={'veiculo-tipo'} textLabel={'Tipo'} interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='10' size-lg='3'>
                            <Subclasse selected={subclasse} setSelected={setSubclasse}  inputName={'veiculo-subclasse'} textLabel={'Subclasse'} interface="popover"/>
                        </IonCol>


                    </IonRow>

                </IonGrid>

            </IonCardContent>


            {/*START: POPOVER*/}
            <IonPopover
                isOpen={openPopoverVeiculoData}
                className="menu popoverVeiculo"
                showBackdrop={true}
                onDidDismiss={() => {
                    setOpenPopoverVeiculoData(false);
                }}>

                <IonHeader className="ion-no-border">
                    <IonToolbar color='transparent'>
                        <IonLabel slot='start'>
                            <h1>
                                Identifica????o do Veiculo
                            </h1>
                        </IonLabel>

                        <IonButton className="btn-catalogo" fill="outline" color="medium" slot="end">
                            Cat??logo <IonIcon slot="start" icon={bookOutline}/>
                        </IonButton>

                        <IonButton className="btn-close" fill="outline" color="medium" slot="end" onClick={() => {
                            setOpenPopoverVeiculoData(false);
                        }}>
                            Fechar
                        </IonButton>

                    </IonToolbar>
                </IonHeader>

                <IonContent>

                    {/* Informa????o do IMT */}
                    <IonCard style={{margin: 30}}>

                        <IonCardHeader>
                            <IonCardTitle>Informa????o do IMT
                            </IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>

                            <IonButton className="btn-apply-info" fill="solid" color="primary" slot="end"
                                       onClick={handlerFullfillForm}>
                                Utilizar estes dados <IonIcon slot="start" icon={bookOutline}/>
                            </IonButton>

                            <IonGrid>

                                <CardListItem
                                    c1={{titulo: 'Categoria', valor: veiculoData?.categoria?.descricao}}
                                    c2={{titulo: 'Classe', valor: veiculoData?.classe?.descricao}}
                                    c3={{titulo: 'Tipo', valor: veiculoData?.tipo?.descricao}}
                                    c4={{titulo: 'Subclasse', valor: veiculoData?.subclasse?.descricao}}
                                />

                                <CardListItem
                                    c1={{titulo: 'Matr??cula', valor: veiculoData?.matricula}}
                                    c2={{titulo: 'Chassi', valor: veiculoData?.chassi}}
                                    c3={{titulo: 'Ano Origem', valor: veiculoData?.ano}}
                                    c4={{titulo: 'Pa??s de Origem', valor: veiculoData?.pais?.descricao}}
                                />

                                <CardListItem
                                    c1={{titulo: 'Marca', valor: veiculoData?.marca?.descricao}}
                                    c2={{titulo: 'Modelo', valor: veiculoData?.modelo?.descricao}}
                                    c3={{titulo: 'Cor principal', valor: veiculoData?.cor?.descricao}}
                                    c4={{titulo: 'Estado policial', valor: veiculoData?.estadoPolicial?.descricao}}
                                />

                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Informa????o do IMT */}

                    {/* Informa????es adicionais */}
                    <IonCard style={{margin: 30}}>

                        <IonCardHeader>
                            <IonCardTitle>Informa????es adicionais</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>

                            <IonGrid>

                                <CardListItem
                                    c2={{titulo: 'Inspe????o em Atraso-IPO', valor: veiculoData?.ipo ? 'Sim' : 'N??o'}}
                                    c3={{
                                        titulo: 'Coimas em Atraso',
                                        valor: veiculoData?.isCoimasEmAtraso ? 'Sim' : 'N??o'
                                    }}
                                />

                                <IonCardContent>
                                    <IonGrid>

                                        {
                                            (veiculoData?.coimasEmAtraso || []).map((coimas: ICoimaVeiculo, index: number) => {
                                                    return (
                                                        <IonCardContent key={`${coimas.id}-${coimas.data}-${index}`}>

                                                            <IonCardHeader>
                                                                <IonCardSubtitle>Coima - {++index}</IonCardSubtitle>
                                                            </IonCardHeader>

                                                            < CardListItem
                                                                c1={{
                                                                    titulo: 'Data',
                                                                    valor: dateFormat(`${coimas?.data}`, 'yyyy-MM-DD')
                                                                }}
                                                                c2={{
                                                                    titulo: 'N??mero do Auto',
                                                                    valor: coimas?.numeroAuto
                                                                }}
                                                                c3={{
                                                                    titulo: 'Codigo de Infra????o',
                                                                    valor: coimas?.codigoInfracao
                                                                }}
                                                                c4={{
                                                                    titulo: 'Valor',
                                                                    valor: coimas?.valor
                                                                }}

                                                            />

                                                            < CardListItem
                                                                c1={{
                                                                    titulo: 'Valor Checado',
                                                                    valor: coimas?.valorChecado ? 'Sim' : 'N??o'
                                                                }}
                                                                c2={{titulo: 'Custas', valor: coimas?.custas}}
                                                                c3={{
                                                                    titulo: 'Custas Checada',
                                                                    valor: coimas?.valorChecado ? 'Sim' : 'N??o'
                                                                }}
                                                                c4={{
                                                                    titulo: 'Total',
                                                                    valor: coimas?.total
                                                                }}

                                                            />
                                                            < CardListItem
                                                                c1={{
                                                                    titulo: 'Data Prazo',
                                                                    valor: dateFormat(`${coimas?.dataPrazo}`, 'yyyy-MM-DD')
                                                                }}
                                                                c2={{
                                                                    titulo: 'Est?? pago',
                                                                    valor: coimas?.isPago ? 'Sim' : 'N??o'
                                                                }}
                                                                c3={{
                                                                    titulo: 'San????es acess??rias',
                                                                    valor: coimas?.sancaoAcessoria
                                                                }}

                                                            />
                                                        </IonCardContent>
                                                    )
                                                }
                                            )}
                                    </IonGrid>
                                </IonCardContent>
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>

                </IonContent>

            </IonPopover>
            {/*END: POPOVER*/}
        </IonCard>


    )
}

export default Veiculo

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
    IonRow,
    IonToggle,
    IonToolbar,
    useIonAlert,
    useIonLoading,
} from '@ionic/react';
import {useContext, useState} from 'react';
import {bookSharp, search, newspaperSharp, informationCircle} from 'ionicons/icons';
import React from 'react';
import './Veiculo.scss';
import Pais from '../../../Combos/Veiculo/Pais';
import {AlertNetworkOfflineContext} from '../../../../Context/AlertNetworkOfflineContext';
import _ from 'underscore';
import {Contraordenacao} from '../../../../api/Contraordenacao';
import {IPesquisarVeiculoResponse} from '../../../../model/contraordenacao';
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
import {ICoimaVeiculo, IVeiculo, IVeiculoRequest} from '../../../../model/veiculo';
import {veiculoSchema} from '../../../../Validations/VeiculoValidation';
import {LivreteService} from '../../../../api/LivreteService';



interface VeiculoSemelhante {
    id: number | undefined;
    categoria: string | undefined;
    classe: string | undefined;
    tipo: string | undefined;
    matricula: string | undefined;
    nChassis: string | undefined;
    anoOrigem: string | undefined;
    accao: string | undefined;
}

const dataSemelhantes: VeiculoSemelhante[] = []


interface IPROPS {
    setParentVeiculoData?: any
}

const Veiculo: React.FC<IPROPS> = (props) => {
    const columnsSemelhantes = [
        {
            name: 'Categoria',
            selector: (row: { categoria: any; }) => row.categoria,
        },
        {
            name: 'Classe',
            selector: (row: { classe: any; }) => row.classe,
        },
        {
            name: 'Tipo',
            selector: (row: { tipo: any; }) => row.tipo,
        },
        {
            name: 'Matricula',
            selector: (row: { matricula: any; }) => row.matricula,
        },
        {
            name: 'N de chassis',
            selector: (row: { nChassis: any; }) => row.nChassis,
        },
        {
            name: 'Ano origem',
            selector: (row: { anoOrigem: any; }) => row.anoOrigem,
        },
        {
            name: 'Ações',
            cell: (row: { accao: any }) => (
                <IonButton onClick={(e) =>{
                    
                    const veiculoSemelhante = veiculos.find(v=> v.matricula ===row.accao)
                    console.log(veiculoSemelhante,"veiculo")
                    setVeiculoSemelhanteData(veiculoSemelhante)
                    
                }}   size="small" color="primary" >
                    <IonIcon slot="start" icon={informationCircle} />
                </IonButton>
            )
        }
    
    ]; 
    const alertOfflineContext = useContext<any>(AlertNetworkOfflineContext)

    const [inputMatricula_color, setInputMatricula_color] = useState<string>();
    const inputMatricula_canSearch = () => {

        const matricula_IsValid = veiculoSchema.isValidSync({matricula: veiculoMatricula})
        let inputColor: string;

        if (matricula_IsValid) {
            inputColor = 'success';
        } else {
            inputColor = 'danger';
        }

        setTimeout(() => {
            setInputMatricula_color(inputColor)
        });

        return !matricula_IsValid;
    }

    const veiculosPadraoDto: IVeiculo[] = []
    const [veiculos, setVeiculos] = useState(veiculosPadraoDto);
    const [presentAlert, dismissAlert] = useIonAlert();

    const [presentOnLoanding, dismissOnLoanding] = useIonLoading();
    const [paisDeEmissao, setPaisDeEmissao] = useState<string>();
    const [veiculosSemelhantes, setVeiculosSemelhantes] = useState(dataSemelhantes);
    const [isConduzidoVeiculo, setIsConduzidoVeiculo] = useState(false);
    const [VeiculoVeiculoSingularColetivo, setVeiculoVeiculoSingularColetivo] = useState<string>('singular');
    const [openPopoverVeiculoData, setOpenPopoverVeiculoData] = useState(false);

    //START:  INPUT Matricula
    const [veiculoMatricula, setVeiculoMatricula] = useState('');
    const keyup_VeiculoMatricula = (e: any) => {
        setVeiculoMatricula(e.target.value);
    }

    const handler_VeiculoSearchByMatricula = async (e: any) => {
        e.preventDefault();
        dismissOnLoanding();

        if (inputMatricula_canSearch() || _.isEmpty(veiculoMatricula)) {
            presentAlert({
                header: 'Atenção!',
                message: 'Matricula inválido.',
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


        await presentOnLoanding({
            message: 'A pesquisar...'
        });

        searchVeiculoByMatricula();

    }

    const [veiculoData, setVeiculoData] = useState<IVeiculo>();
    const [veiculoSemelhanteData, setVeiculoSemelhanteData] = useState<IVeiculo>();
    const searchVeiculoByMatricula = async () => {

        const instanceContraordenacao = new Contraordenacao();
        await instanceContraordenacao.pesquisarVeiculo({matricula: veiculoMatricula}).then((_veiculoData: IPesquisarVeiculoResponse) => {
             
            setTimeout(() => {
                setOpenPopoverVeiculoData(true);
                setTimeout(() => {
                    // @ts-ignore
                    setVeiculoData(_veiculoData.veiculo);
                })
                dismissOnLoanding();
            }, 100)

        }).catch((e: any) => {
            presentAlert({
                header: 'Error!',
                message: 'Operação sem sucesso!\n' + e.message,
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
    const [pais, setPais] = useState<any>();

    // Marca
    const [marca, setMarca] = useState<any>();

    // Cor
    const [cor, setCor] = useState<any>();

    // Classe
    const [classe, setClasse] = useState<any>();

    // Categoria
    const [categoria, setCategoria] = useState<any>();

    //Modelo
    const [modelo, setModelo] = useState<any>();

    // Subclasse
    const [subclasse, setSubclasse] = useState<any>();

    // Tipo
    const [tipo, setTipo] = useState<any>();

    const [currentVeiculoData, setCurrentVeiculoData] = useState<IVeiculo>();
    const handlerFullfillFormVeiculoSemelhante = ()=>{
        props.setParentVeiculoData(veiculoSemelhanteData);
        setCurrentVeiculoData(veiculoSemelhanteData)
        setOpenPopoverVeiculoData(false);
    }
    const handlerFullfillForm = () => {
        props.setParentVeiculoData(veiculoData);

        setCurrentVeiculoData(currentVeiculoData)
        setOpenPopoverVeiculoData(false);

        if (veiculoData) {
            setPais(veiculoData?.pais);
            setMarca(veiculoData?.marca);
            setCor(veiculoData?.cor);
            setClasse(veiculoData?.classe);
            setCategoria(veiculoData?.categoria);
            setModelo(veiculoData?.modelo);
            setSubclasse(veiculoData?.subclasse);
            setTipo(veiculoData?.tipo);
}


       
    }

    React.useEffect(() => {
        const _data = {
            matricula: veiculoMatricula,
            isConduzidoVeiculo, pais, marca, modelo, cor, categoria,
            classe,
            tipo, subclasse
        }

        if (_.has(props, 'setParentVeiculoData')) {
            let __data = _data;
            if (currentVeiculoData) {
                __data = Object.assign(__data, currentVeiculoData)
            }
            props.setParentVeiculoData(_data)
        }

        const veiculoRequest: IVeiculoRequest = {
            matricula:veiculoMatricula,
            classe: classe,
            categoria: categoria,
            tipo: tipo,
            marca: marca,
            modelo: modelo,
            cor: cor
            
        }


        new Contraordenacao().pesquisarVeiculosSemelhantes(veiculoRequest).then(veiculosResponse => {
            const veiculosSemelhantesDto: VeiculoSemelhante[] = []
            const veiculosDto: IVeiculo[] = veiculosResponse.veiculos
            setVeiculos(veiculosDto)

            for (let index = 0; index < veiculosDto.length; index++) {
                const v = veiculosDto[index];
                const veiculoDto: VeiculoSemelhante = {
                    id: index,
                    categoria: v.categoria?.descricao,
                    classe: v.classe?.descricao,
                    tipo: v.tipo?.descricao,
                    matricula: v.matricula,
                    nChassis: v.chassi,
                    anoOrigem: String(v.ano),
                    accao: v.matricula
                }
                veiculosSemelhantesDto.push(veiculoDto)

            }

            setVeiculosSemelhantes(veiculosSemelhantesDto)

        }).catch(veiculosError => {
            // TODO: Por alguma razao isto eh chamado fora do scopo
            console.log("veiculosError: ", veiculosError)
        })

    }, [isConduzidoVeiculo, veiculoMatricula, pais, marca, modelo, cor, categoria, classe, tipo, subclasse])

    const carregarInformacaoLivreve = () => {
        presentOnLoanding({
            message: 'A pesquisar...'
        });

        new LivreteService().obterInfoLivrete({
            idSistema: 4,
            matricula: veiculoMatricula,
            numQuadro: ''
        }).then(_livreteInfo => {
            const veiculo: IVeiculo = {

                matricula: _livreteInfo.j1CategoriaNacional,
                chassi: "",
                ano: 0,
                classe: {

                    descricao: ""
                },
                categoria: {
                    descricao: _livreteInfo.j1CategoriaNacional
                }
                , tipo: {
                    descricao: _livreteInfo.j2Tipo

                },
                subclasse: {
                    descricao: ""
                },
                pais: {
                    descricao: ""

                },
                marca: {
                    descricao: _livreteInfo.d1Marca
                }
                ,
                modelo: {
                    descricao: _livreteInfo.d3ModeloComercial
                },
                cor: {
                    descricao: _livreteInfo.rcores
                },
                estadoPolicial: {
                    descricao: _livreteInfo.dscSituacao
                },
                ipo: false,
            }
            setVeiculoData(veiculo)


            const veiculoRequest: IVeiculoRequest = {
                matricula: _livreteInfo.amatricula,
                    }

            new Contraordenacao().pesquisarVeiculosSemelhantes(veiculoRequest).then(veiculosResponse => {
                const veiculosSemelhantesDto: VeiculoSemelhante[] = []
                const veiculosDto: IVeiculo[] = veiculosResponse.veiculos
                for (let index = 0; index < veiculosDto.length; index++) {
                    const v = veiculosDto[index];
                    const veiculoDto: VeiculoSemelhante = {
                        id: index,
                        categoria: v.categoria?.descricao,
                        classe: v.classe?.descricao,
                        tipo: v.tipo?.descricao,
                        matricula: v.matricula,
                        nChassis: v.chassi,
                        anoOrigem: String(v.ano),
                        accao: v.matricula
                    }
                    veiculosSemelhantesDto.push(veiculoDto)

                }

                setVeiculosSemelhantes(veiculosSemelhantesDto)

            }).catch(veiculosError => {
                presentAlert({
                    header: 'Error!',
                    message: 'Operação sem sucesso!\n' + veiculosError.message,
                    buttons: [
                        {text: 'Fechar'},
                    ]
                })
            })

            dismissOnLoanding()


        }).catch(e => {
            dismissOnLoanding()

            presentAlert({
                header: 'Error!',
                message: 'Operação sem sucesso!\n' + e.message,
                buttons: [
                    {text: 'Fechar'},
                ]
            })

        })
    }
    return (
        <IonCard className={'co-veiculo'}>

            <IonCardHeader>
                <IonCardTitle>Veiculo</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm='12' size-md='12' size-lg='4'>
                            <IonItem lines={'none'}>
                                <IonLabel>O veículo é conduzido pelo arguido?</IonLabel>
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
                                    maxlength={8}
                                    minlength={8}
                                    color={inputMatricula_color}
                                    required={true}
                                    clearInput={true}
                                    name='Veiculo-matricula'
                                    value={veiculoMatricula}
                                    onKeyUp={keyup_VeiculoMatricula}
                                    placeholder='Matrícula *'/>
                            </IonItem>
                        </IonCol>
                        <IonCol size-sm='4' size-md='5' size-lg='2'>
                            <IonItem lines='none'>
                                <IonButton style={{background: '#084F87', borderRadius: 4}}
                                           color="#084F87"
                                           slot="start"
                                           disabled={inputMatricula_canSearch()}
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
                                    validação</strong>
                            </div>
                        </IonCol>
                    </IonRow>


                    <IonRow>
                        <IonCol size-sm='12' size-md='12' size-lg='3'>
                            <Pais selected={pais} setSelected={setPais} inputName={'veiculo-pais'} textLabel={'País'}
                                  interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='12' size-lg='3'>
                            <Marca selected={marca} setSelected={setMarca} inputName={'veiculo-marca'}
                                   textLabel={'Marca'} interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='12' size-lg='3'>
                            <Modelo selected={modelo} setSelected={setModelo} inputName={'veiculo-modelo'}
                                    textLabel={'Modelo'} interface="popover"/>
                        </IonCol>
                        <IonCol size-sm='12' size-md='12' size-lg='3'>
                            <Cor selected={cor} setSelected={setCor} interface="popover" inputName={'veiculo-cor'} textLabel={'Cor'}/>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size-sm='12' size-md='12' size-lg='3'>
                            <Categoria selected={categoria} setSelected={setCategoria} inputName={'veiculo-categoria'}
                                       textLabel={'Categoria'} interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='12' size-lg='3'>
                            <Classe selected={classe} setSelected={setClasse} inputName={'veiculo-classe'}
                                    textLabel={'Classe'} interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='12' size-lg='3'>
                            <Tipo selected={tipo} setSelected={setTipo} inputName={'veiculo-tipo'} textLabel={'Tipo'}
                                  interface="popover"/>
                        </IonCol>

                        <IonCol size-sm='12' size-md='12' size-lg='3'>
                            <Subclasse selected={subclasse} setSelected={setSubclasse} inputName={'veiculo-subclasse'}
                                       textLabel={'Subclasse'} interface="popover"/>
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
                                Identificação do Veiculo
                            </h1>
                        </IonLabel>

                        <IonButton className="btn-catalogo" fill="outline" color="medium" slot="end"
                                   onClick={carregarInformacaoLivreve}>
                            Catálogo <IonIcon slot="start" icon={bookSharp}/>
                        </IonButton>

                        <IonButton className="btn-close" fill="outline" color="medium" slot="end" onClick={() => {
                            setOpenPopoverVeiculoData(false);
                        }}>
                            Fechar
                        </IonButton>

                    </IonToolbar>
                </IonHeader>

                <IonContent>

                    {/* Informação do IMT */}
                    <IonCard style={{margin: 30}}>

                        <IonCardHeader>
                            <IonCardTitle>Informação do IMT
                            </IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>

                            <IonButton className="btn-apply-info" fill="solid" color="primary" slot="end"
                                       onClick={handlerFullfillForm}>
                                Utilizar estes dados <IonIcon slot="start" icon={newspaperSharp}/>
                            </IonButton>

                            <IonGrid>

                                <CardListItem
                                    c1={{titulo: 'Categoria', valor: veiculoData?.categoria?.descricao}}
                                    c2={{titulo: 'Classe', valor: veiculoData?.classe?.descricao}}
                                    c3={{titulo: 'Tipo', valor: veiculoData?.tipo?.descricao}}
                                    c4={{titulo: 'Subclasse', valor: veiculoData?.subclasse?.descricao}}
                                />

                                <CardListItem
                                    c1={{titulo: 'Matrícula', valor: veiculoData?.matricula}}
                                    c2={{titulo: 'Chassi', valor: veiculoData?.chassi}}
                                    c3={{titulo: 'Ano Origem', valor: veiculoData?.ano}}
                                    c4={{titulo: 'País de Origem', valor: veiculoData?.pais?.descricao}}
                                />

                                <CardListItem
                                    c1={{titulo: 'Marca', valor: veiculoData?.marca?.descricao}}
                                    c2={{titulo: 'Modelo', valor: veiculoData?.modelo?.descricao}}
                                    c3={{titulo: 'Cor principal', valor: veiculoData?.cor?.descricao}}
                                    c4={{titulo: 'Situação do veículo', valor: veiculoData?.estadoPolicial?.descricao}}
                                />

                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Informação do IMT */}

                    {/* Informações adicionais */}
                    <IonCard style={{margin: 30}}>

                        <IonCardHeader>
                            <IonCardTitle>Informações adicionais</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>

                            <IonGrid>

                                <CardListItem
                                    c1={{titulo: 'Estado da viatura', valor: ""}}
                                    c2={{titulo: 'Inspeção em Atraso-IPO', valor: veiculoData?.ipo ? 'Sim' : 'Não'}}
                                    // c3={{
                                    //     titulo: 'Coimas em Atraso',
                                    //     valor: veiculoData?.isCoimasEmAtraso ? 'Sim' : 'Não'
                                    // }}
                                    // c4={{ titulo: 'Sanções acessórias', valor: 'n/d' }}
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
                                                                    titulo: 'Número do Auto',
                                                                    valor: coimas?.numeroAuto
                                                                }}
                                                                c3={{
                                                                    titulo: 'Codigo de Infração',
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
                                                                    valor: coimas?.valorChecado ? 'Sim' : 'Não'
                                                                }}
                                                                c2={{titulo: 'Custas', valor: coimas?.custas}}
                                                                c3={{
                                                                    titulo: 'Custas Checada',
                                                                    valor: coimas?.valorChecado ? 'Sim' : 'Não'
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
                                                                    titulo: 'Está pago',
                                                                    valor: coimas?.isPago ? 'Sim' : 'Não'
                                                                }}
                                                                c3={{
                                                                    titulo: 'Sanções acessórias',
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

                    {/* START: Semelhantes */}
                    <IonCard style={{margin: 30}}>

                        <IonCardHeader>
                            <IonCardTitle>Semelhantes</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonGrid>
                                <DataTable
                                    columns={columnsSemelhantes}
                                    data={veiculosSemelhantes}
                                />
                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* END: Semelhantes */}


                    {/* Detallhes do semelhante selecionado */}
                    <IonCard style={{margin: 30}}>

                        <IonCardHeader>
                            <IonCardTitle>Detalhes do semelhante selecionado
                            </IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>

                            <IonButton className="btn-apply-info" fill="solid" color="primary" slot="end"
                                       onClick={handlerFullfillFormVeiculoSemelhante}>
                                Utilizar estes dados <IonIcon slot="start" icon={newspaperSharp}/>
                            </IonButton>

                            <IonGrid>

                                <CardListItem
                                    c1={{titulo: 'Categoria', valor: veiculoSemelhanteData?.categoria?.descricao}}
                                    c2={{titulo: 'Classe', valor: veiculoSemelhanteData?.classe?.descricao}}
                                    c3={{titulo: 'Tipo', valor: veiculoSemelhanteData?.tipo?.descricao}}
                                    c4={{titulo: 'Subclasse', valor: veiculoSemelhanteData?.subclasse?.descricao}}
                                />

                                <CardListItem
                                    c1={{titulo: 'Matrícula', valor: veiculoSemelhanteData?.matricula}}
                                    c2={{titulo: 'Chassi', valor: veiculoSemelhanteData?.chassi}}
                                    c3={{titulo: 'Ano Origem', valor: veiculoSemelhanteData?.ano}}
                                    c4={{titulo: 'País de Origem', valor: veiculoSemelhanteData?.pais?.descricao}}
                                />

                                <CardListItem
                                    c1={{titulo: 'Marca', valor: veiculoSemelhanteData?.marca?.descricao}}
                                    c2={{titulo: 'Modelo', valor: veiculoSemelhanteData?.modelo?.descricao}}
                                    c3={{titulo: 'Cor principal', valor: veiculoSemelhanteData?.cor?.descricao}}
                                    c4={{titulo: 'Situação do veículo', valor: veiculoSemelhanteData?.estadoPolicial?.descricao}}
                                />

                            </IonGrid>

                        </IonCardContent>
                    </IonCard>
                    {/* Detallhes do semelhante selecionado */}

                </IonContent>

            </IonPopover>
            {/*END: POPOVER*/}
        </IonCard>


    )
}

export default Veiculo

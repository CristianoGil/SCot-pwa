import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonModal, IonPage, IonPopover, IonRow, IonToggle, IonToolbar } from '@ionic/react';
import { list, person, wifi, apps, close, moon } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import CardListItem from '../CardListItem';
import './Menu.css'
import { setVisiblePopoverIndentVeiculo } from './popoverIndentVeiculoSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const paginationComponentOptions = {
    rowsPerPageText: 'Linhas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};

const columns = [
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
        name: 'Matrícula',
        selector: (row: { matricula: any; }) => row.matricula,
    },
    {
        name: 'Nº de chassis',
        selector: (row: { nChassis: any; }) => row.nChassis,
    },
    {
        name: 'Ano origem',
        selector: (row: { anoOrigem: any; }) => row.anoOrigem,
    },
];

const data = [
    {
        id: 1,
        categoria: 'Automóveis',
        classe: 'Ligeiros',
        tipo: 'Passageiros',
        matricula: '00-XX-01',
        nChassis: 'ABCDE20201',
        anoOrigem: '2020',
    },
    {
        id: 2,
        categoria: 'Automóveis',
        classe: 'Ligeiros',
        tipo: 'Passageiros',
        matricula: '00-XX-01',
        nChassis: 'ABCDE20201',
        anoOrigem: '2020',
    },
    {
        id: 3,
        categoria: 'Automóveis',
        classe: 'Ligeiros',
        tipo: 'Passageiros',
        matricula: '00-XX-01',
        nChassis: 'ABCDE20201',
        anoOrigem: '2020',
    },
    {
        id: 4,
        categoria: 'Automóveis',
        classe: 'Ligeiros',
        tipo: 'Passageiros',
        matricula: '00-XX-01',
        nChassis: 'ABCDE20201',
        anoOrigem: '2020',
    },

]

const Menu: React.FC = () => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<any>("ion-hide");
    const history = useHistory()
    const [checked, setChecked] = useState(false);
    const toggleDarkModeHandler = () => {
        document.body.classList.toggle("dark");
    };

    const popoverIndentVeiculoIsOpen = useAppSelector((state) => state.popoverIndentVeiculo.isOpen)
    const dispatch = useAppDispatch()

    useEffect(() => {

        if (history.location.pathname == '/login')
            setIsVisible("ion-hide");
        else
            setIsVisible("");

        return history.listen((location) => {

            if (location.pathname == '/login') {
                setIsVisible("ion-hide");
            }
            else
                setIsVisible("");

        });
    }, [history])

    return (
        <IonHeader className={`ion-no-border ${isVisible}`}>
            <IonToolbar color='transparent'>

                <IonButtons slot="start" onClick={() => { setShowModal(true); }}>

                    <IonButton
                        className='btnRound'
                        style={{
                            backgroundColor: "#EBF2FF",
                            color: "#003E7E",
                        }}>
                        <IonIcon icon={list}></IonIcon>

                    </IonButton>
                </IonButtons>

                <IonButtons slot="end">
                    <IonLabel>
                        Alberto Nunes
                    </IonLabel>
                    <IonButton
                        className='btnRound'
                        style={{
                            backgroundColor: "#FBD95E",
                            color: "white",
                        }}>
                        <IonIcon icon={person}></IonIcon>

                    </IonButton>


                </IonButtons>

                <IonButtons slot="end">
                    <IonButton
                        className='btnRound'
                        style={{
                            backgroundColor: "#6EAF43",
                            color: "white",
                        }}>
                        <IonIcon icon={wifi}></IonIcon>

                    </IonButton>

                    <IonLabel>
                        online
                    </IonLabel>
                </IonButtons>

                <IonButtons slot="end" onClick={() => { setShowPopover(true); }}>

                    <IonButton
                        className='btnRound'
                        style={{
                            backgroundColor: "#EBF2FF",
                            color: "#003E7E",
                        }}>
                        <IonIcon icon={apps}></IonIcon>

                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <IonModal
                animated={true}
                isOpen={showModal}
                onDidDismiss={() => setShowModal(false)}
                className="fullscreen">

                <IonPage>
                    <IonHeader className="ion-no-border" style={{ position: 'absolute' }}>
                        <IonToolbar style={{ background: 'transparent' }} id='toolbarModal'>
                            <IonButtons slot="start" onClick={() => { setShowModal(false); }}>

                                <IonButton
                                    className='btnRound'
                                    style={{
                                        backgroundColor: "#EBF2FF",
                                        color: "#003E7E",
                                    }}>
                                    <IonIcon icon={close}></IonIcon>
                                </IonButton>

                            </IonButtons>

                        </IonToolbar>
                    </IonHeader>
                    <IonContent id='modelContent'>

                        <div id='imgModal' />

                        <div id='imgModal-fx'></div>

                        <div id='modelContent_Interno' className='ion-align-items-center'>
                            <IonGrid style={{ padding: 180 }}>
                                {/* Header */}
                                <IonRow>
                                    <IonCol sizeLg='4'>
                                        <div style={{ display: 'inline-flex' }}>
                                            <IonImg src={'assets/images/Icon Dashboard.png'} style={{ width: 'fit-content' }}></IonImg>
                                            <h1 style={{ marginTop: 14, marginLeft: 10 }}>Dashboard</h1>
                                        </div>
                                    </IonCol>
                                    <IonCol sizeLg='4'>
                                        <div style={{ display: 'inline-flex' }}>
                                            <IonImg src={'assets/images/Icon Catálogo.png'} style={{ width: 'fit-content' }}></IonImg>
                                            <h1 style={{ marginTop: 14, marginLeft: 10 }}>RI/Catálogo</h1>
                                        </div>
                                    </IonCol>
                                    <IonCol sizeLg='4'>
                                        <div style={{ display: 'inline-flex' }}>
                                            <IonImg src={'assets/images/Icon Contraordenações.png'} style={{ width: 'fit-content' }}></IonImg>
                                            <h1 style={{ marginTop: 14, marginLeft: 10 }}>Contraordenações</h1>
                                        </div>
                                    </IonCol>
                                </IonRow>
                                {/* Header */}

                                {/* Linha 1 */}
                                <IonRow>

                                    <IonCol sizeLg='4' style={{ alignSelf: 'center' }}>
                                        <Link to={'#'} onClick={() => {
                                            setShowModal(false);
                                        }}>
                                            <div style={{ display: 'inline-flex' }}>
                                                <IonImg src={'assets/images/temp.png'} style={{ width: 'fit-content' }}></IonImg>
                                                <h1 style={{ marginTop: 14, marginLeft: 10 }}>Gestão de cobraças</h1>
                                            </div>
                                        </Link>
                                    </IonCol>

                                    <IonCol sizeLg='4' style={{ alignSelf: 'center' }}>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol>
                                                    <Link to={'#'} onClick={() => {
                                                        setShowModal(false);
                                                    }}>
                                                        <div style={{ display: 'inline-flex' }}>
                                                            <IonImg className='ion-hide' src={'assets/images/temp.png'} style={{ width: 'fit-content' }}></IonImg>
                                                            <h5 style={{ marginTop: 14, marginLeft: 10 }}>Pessoa</h5>
                                                        </div>
                                                    </Link>
                                                </IonCol>
                                            </IonRow>

                                            <IonRow>
                                                <IonCol>
                                                    <Link to={'#'} onClick={() => {
                                                        setShowModal(false);
                                                    }}>
                                                        <div style={{ display: 'inline-flex' }}>
                                                            <IonImg className='ion-hide' src={'assets/images/temp.png'} style={{ width: 'fit-content' }}></IonImg>
                                                            <h5 style={{ marginTop: 14, marginLeft: 10 }}>Veículo</h5>
                                                        </div>
                                                    </Link>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </IonCol>

                                    <IonCol sizeLg='4'>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol>
                                                    <Link to={'/coDirecta'} onClick={() => {
                                                        setShowModal(false);
                                                    }}>
                                                        <div style={{ display: 'inline-flex' }}>
                                                            <IonImg className='ion-hide' src={'assets/images/temp.png'} style={{ width: 'fit-content' }}></IonImg>
                                                            <h5 style={{ marginTop: 14, marginLeft: 10 }}>Registrar contraordenação direta</h5>
                                                        </div>
                                                    </Link>
                                                </IonCol>
                                            </IonRow>

                                            <IonRow>
                                                <IonCol>
                                                    <Link to={'#'} onClick={() => {
                                                        setShowModal(false);
                                                    }}>
                                                        <div style={{ display: 'inline-flex' }}>
                                                            <IonImg className='ion-hide' src={'assets/images/temp.png'} style={{ width: 'fit-content' }}></IonImg>
                                                            <h5 style={{ marginTop: 14, marginLeft: 10 }}>Registrar contraordenação indireta</h5>
                                                        </div>
                                                    </Link>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </IonCol>

                                </IonRow>
                                {/* Linha 1 */}

                                {/* Linha 2 */}
                                <IonRow>
                                    <IonCol sizeLg='4' style={{ alignSelf: 'center' }}>
                                        <Link to={'#'} onClick={() => {
                                            setShowModal(false);
                                        }}>
                                            <div style={{ display: 'inline-flex' }}>
                                                <IonImg src={'assets/images/temp.png'} style={{ width: 'fit-content' }}></IonImg>
                                                <h1 style={{ marginTop: 14, marginLeft: 10 }}>Estatísticas e listagens</h1>
                                            </div>
                                        </Link>
                                    </IonCol>
                                    <IonCol sizeLg='4'>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol>
                                                    <Link to={'#'} onClick={() => {
                                                        setShowModal(false);
                                                    }}>
                                                        <div style={{ display: 'inline-flex' }}>
                                                            <IonImg className='ion-hide' src={'assets/images/temp.png'} style={{ width: 'fit-content' }}></IonImg>
                                                            <h5 style={{ marginTop: 14, marginLeft: 10 }}>Organização</h5>
                                                        </div>
                                                    </Link>
                                                </IonCol>
                                            </IonRow>

                                            <IonRow>
                                                <IonCol>
                                                    <Link to={'#'} onClick={() => {
                                                        setShowModal(false);
                                                    }}>
                                                        <div style={{ display: 'inline-flex' }}>
                                                            <IonImg className='ion-hide' src={'assets/images/temp.png'} style={{ width: 'fit-content' }}></IonImg>
                                                            <h5 style={{ marginTop: 14, marginLeft: 10 }}>Local</h5>
                                                        </div>
                                                    </Link>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </IonCol>
                                </IonRow>
                                {/* Linha 2 */}

                                {/* Linha 3 */}
                                <IonRow>
                                    <IonCol sizeLg='4' style={{ alignSelf: 'center' }}>
                                        <Link to={'#'} onClick={() => {
                                            setShowModal(false);
                                        }}>
                                            <div style={{ display: 'inline-flex' }}>
                                                <IonImg src={'assets/images/temp.png'} style={{ width: 'fit-content' }}></IonImg>
                                                <h1 style={{ marginTop: 14, marginLeft: 10 }}>Ofícios gerais</h1>
                                            </div>
                                        </Link>
                                    </IonCol>

                                    <IonCol sizeLg='4'>

                                        <IonGrid>
                                            <IonRow>
                                                <IonCol>
                                                    <Link to={'#'} onClick={() => {
                                                        setShowModal(false);
                                                    }}>
                                                        <div style={{ display: 'inline-flex' }}>
                                                            <IonImg className='ion-hide' src={'assets/images/temp.png'} style={{ width: 'fit-content' }}></IonImg>
                                                            <h5 style={{ marginTop: 44, marginLeft: 10 }}>Documentos</h5>
                                                        </div>
                                                    </Link>
                                                </IonCol>
                                            </IonRow>

                                            <IonRow>
                                                <IonCol>
                                                    <Link to={'#'} onClick={() => {
                                                        setShowModal(false);
                                                    }}>
                                                        <div style={{ display: 'inline-flex' }}>
                                                            <IonImg className='ion-hide' src={'assets/images/temp.png'} style={{ width: 'fit-content' }}></IonImg>
                                                            <h5 style={{ marginTop: 14, marginLeft: 10 }}></h5>
                                                        </div>
                                                    </Link>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </IonCol>
                                </IonRow>
                                {/* Linha 3 */}
                            </IonGrid>
                        </div>

                    </IonContent>
                </IonPage>
            </IonModal>

            <IonPopover
                id='popoverMenu'
                isOpen={showPopover}
                className="menu"
                mode="md"
                showBackdrop={true}
                onDidDismiss={() => { setShowPopover(false); }}>
                <IonPage>
                    <IonHeader className="ion-no-border">
                        <IonToolbar>
                            <IonLabel slot='start'>

                                <h1>
                                    <IonItem lines='none'>
                                        Aplicação
                                    </IonItem>
                                </h1>

                            </IonLabel>
                            <IonButton slot="end" color="light" onClick={() => { setShowPopover(false); }}>
                                Fechar
                            </IonButton>

                        </IonToolbar>
                    </IonHeader>
                    <IonContent>

                        <IonItem className="ion-margin-top" style={{ margin: 24 }}>
                            <IonIcon slot="start" icon={moon} />
                            <IonLabel>Modo escuro</IonLabel>
                            <small>Reduzir exposição à luz e poupança de bateria</small>
                            <IonToggle
                                slot="end"
                                name="darkMode"
                                checked={checked}
                                onIonChange={e => {
                                    setChecked(e.detail.checked)
                                    toggleDarkModeHandler();
                                }}
                            />
                        </IonItem>


                        <IonItem className="ion-margin-top" style={{ margin: 24 }} lines='none'>
                            <div style={{ width: '-webkit-fill-available' }}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol sizeSm='3'>
                                            <IonLabel>
                                                Terminal
                                            </IonLabel>
                                        </IonCol>
                                        <IonCol sizeSm='3'>
                                            <IonLabel>
                                                Versão app
                                            </IonLabel>
                                        </IonCol>
                                    </IonRow>

                                    <IonRow>
                                        <IonCol sizeSm='3'>
                                            <h1>
                                                129
                                            </h1>
                                        </IonCol>
                                        <IonCol sizeSm='3'>
                                            <h1>
                                                3.10
                                            </h1>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>


                                <IonGrid>
                                    <IonRow>
                                        <IonCol sizeSm='3'>
                                            <IonLabel>
                                                Sincronizado
                                            </IonLabel>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol>
                                            <h1>
                                                2011-12-06 10:46
                                            </h1>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </div>
                        </IonItem>


                        <IonItem style={{ padding: '0px 30px 0px 30px' }} lines='none'>
                            <div style={{ borderRadius: 10, background: '#F0FFF6', width: '100%', padding: '0px 0px 20px 20px', color: 'black', border: 'groove' }}>
                                <h1 style={{ fontSize: 44 }}>48</h1>
                                <IonLabel>
                                    Autos disponíveis
                                </IonLabel>
                            </div>
                        </IonItem>

                        <IonItem style={{ padding: '0px 30px 0px 30px', marginTop: 20 }} lines='none'>
                            <div style={{ borderRadius: 10, background: '#FFF0FA', width: '100%', padding: '0px 0px 20px 20px', color: 'black', border: 'groove' }}>
                                <h1 style={{ fontSize: 44 }}>71</h1>
                                <IonLabel>
                                    Processos disponíveis
                                </IonLabel>
                            </div>
                        </IonItem>

                    </IonContent>
                    <IonFooter>
                        <IonItem lines='none'>
                            <div id='imgModelosBarras' className='ion-text-center' style={{ padding: 12 }}>
                                <small>Copyright @ 2021 SCOT+. Todos os direitos reservados.</small><br />
                                <IonImg className='ion-margin-top ion-margin-bottom' src={'assets/images/Group 4529.png'} style={{ height: 40, marginTop: 36 }} />
                            </div>
                        </IonItem>

                    </IonFooter>
                </IonPage>
            </IonPopover>

            <IonPopover
                id='popoverIdentVeiculo'
                isOpen={popoverIndentVeiculoIsOpen}
                className="menu"
                mode="md"
                showBackdrop={true}
                onDidDismiss={() => { dispatch(setVisiblePopoverIndentVeiculo(false)); }}>
                <IonPage>
                    <IonHeader className="ion-no-border">
                        <IonToolbar color='transparent'>
                            <IonLabel slot='start'>
                                <h1>
                                    Identificação do veículo
                                </h1>
                            </IonLabel>
                            <IonButton color="light" slot="end" onClick={() => { dispatch(setVisiblePopoverIndentVeiculo(false)); }}>
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

                                <DataTable
                                    columns={columns}
                                    data={data}
                                    pagination
                                    paginationComponentOptions={paginationComponentOptions}
                                    paginationRowsPerPageOptions={[5, 25, 50, 100]}
                                />


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
        </IonHeader>
    );
};

export default Menu;
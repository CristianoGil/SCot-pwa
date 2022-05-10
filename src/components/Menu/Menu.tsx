import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonContent,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonModal,
    IonPopover,
    IonRow,
    IonToggle,
    IonToolbar
} from '@ionic/react';
import {list, person, wifi, apps, close, moon} from 'ionicons/icons';
import {useContext, useEffect, useState} from 'react';
import CardListItem from '../CardListItem';
import './Menu.css'
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {Link, useHistory} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import React from 'react';
import {UserContext} from '../../Context/UserContext';
import _ from 'underscore';

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

interface IProps {
    actionsCOBtn?: any,
    activePagePath?: any
}

const Menu: React.FC<IProps> = (props) => {
    const history = useHistory();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [checked, setChecked] = useState(false);

    const userContext = useContext<any>(UserContext);

    const [networkState, setNetworkState] = useState<string>(navigator.onLine ? 'online' : 'offline');

    window.addEventListener('offline', function () {
        setNetworkState('offline')
    });

    window.addEventListener('online', function () {
        setNetworkState('online')
    });

    const toggleDarkModeHandler = () => {
        document.body.classList.toggle("dark");
    };

    const dispatch = useAppDispatch()
    console.log(history)

    useEffect(() => {

        console.log('props.activePagePath', props.activePagePath )
        console.log(history.location.pathname)

        setTimeout(() => {
            setShowModal(false);
        })




    }, [props.activePagePath]);

    return (
        <IonHeader className='ion-no-border'>
            <IonToolbar color='transparent'>

                <IonButtons slot="start" onClick={() => {
                    setShowModal(true);
                }}>

                    <IonButton
                        className='btnRound'
                        style={{
                            backgroundColor: "#EBF2FF",
                            color: "#003E7E",
                        }}>
                        <IonIcon icon={list}></IonIcon>

                    </IonButton>

                </IonButtons>

                {props.actionsCOBtn}

                <IonButtons slot="end">

                    <IonLabel>
                        {userContext.user.nomeUsuario || userContext.user.userName}
                    </IonLabel>
                    <IonButton
                        className='btnRound'
                        style={{
                            backgroundColor: "#FBD95E",
                            color: "white"
                        }}>
                        <IonIcon icon={person}></IonIcon>

                    </IonButton>

                </IonButtons>

                <IonButtons slot="end">
                    <IonButton
                        className='btnRound'
                        style={networkState === 'online' ? {
                            backgroundColor: "#6EAF43",
                            color: "white"
                        } : {backgroundColor: "#eb445a", color: "white"}}>
                        <IonIcon icon={wifi}></IonIcon>

                    </IonButton>

                    <IonLabel>
                        {networkState}
                    </IonLabel>
                </IonButtons>

                <IonButtons slot="end" onClick={() => {
                    setShowPopover(true);
                }}>

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

            {/*START: MENU LATERAL ESQUERDA*/}
            <IonModal
                animated={true}
                isOpen={showModal}
                onDidDismiss={() => setShowModal(false)}
                className="fullscreen">

                <IonHeader className="ion-no-border" style={{position: 'absolute'}}>
                    <IonToolbar style={{background: 'transparent'}} id='toolbarModal'>
                        <IonButtons slot="start" onClick={() => {
                            setShowModal(false);
                        }}>

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

                    <div id='imgModal'/>

                    <div id='imgModal-fx'></div>

                    <div id='modelContent_Interno' className='ion-align-items-center'>
                        <IonGrid style={{padding: 180}}>
                            {/* Header */}
                            <IonRow>
                                <IonCol sizeLg='4'>
                                    <div style={{display: 'inline-flex'}}>
                                        <IonImg src={'assets/images/Icon Dashboard.png'}
                                                style={{width: 'fit-content'}}></IonImg>
                                        <h1 style={{marginTop: 14, marginLeft: 10}}>Dashboard</h1>
                                    </div>
                                </IonCol>
                                <IonCol sizeLg='4'>
                                    <div style={{display: 'inline-flex'}}>
                                        <IonImg src={'assets/images/Icon Catálogo.png'}
                                                style={{width: 'fit-content'}}></IonImg>
                                        <h1 style={{marginTop: 14, marginLeft: 10}}>RI/Catálogo</h1>
                                    </div>
                                </IonCol>
                                <IonCol sizeLg='4'>
                                    <div style={{display: 'inline-flex'}}>
                                        <IonImg src={'assets/images/Icon Contraordenações.png'}
                                                style={{width: 'fit-content'}}></IonImg>
                                        <h1 style={{marginTop: 14, marginLeft: 10}}>Contraordenações</h1>
                                    </div>
                                </IonCol>
                            </IonRow>
                            {/* Header */}

                            {/* Linha 1 */}
                            <IonRow>

                                <IonCol sizeLg='4' style={{alignSelf: 'center'}}>
                                    <Link to={'#'} onClick={() => {
                                        setShowModal(false);
                                    }}>
                                        <div style={{display: 'inline-flex'}}>
                                            <IonImg src={'assets/images/temp.png'}
                                                    style={{width: 'fit-content'}}></IonImg>
                                            <h1 style={{marginTop: 14, marginLeft: 10}}>Gestão de cobraças</h1>
                                        </div>
                                    </Link>
                                </IonCol>

                                <IonCol sizeLg='4' style={{alignSelf: 'center'}}>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol>
                                                <Link to={'/pessoa'} onClick={() => {
                                                    setShowModal(false);
                                                }}>
                                                    <div style={{display: 'inline-flex'}}>
                                                        <IonImg className='ion-hide' src={'assets/images/temp.png'}
                                                                style={{width: 'fit-content'}}></IonImg>
                                                        <h5 style={{marginTop: 14, marginLeft: 10}}>Pessoa</h5>
                                                    </div>
                                                </Link>
                                            </IonCol>
                                        </IonRow>

                                        <IonRow>
                                            <IonCol>
                                                <Link to={'/veiculo'} onClick={() => {
                                                    setShowModal(false);
                                                }}>
                                                    <div style={{display: 'inline-flex'}}>
                                                        <IonImg className='ion-hide' src={'assets/images/temp.png'}
                                                                style={{width: 'fit-content'}}></IonImg>
                                                        <h5 style={{marginTop: 14, marginLeft: 10}}>Veículo</h5>
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
                                                    <div style={{display: 'inline-flex'}}>
                                                        <IonImg className='ion-hide' src={'assets/images/temp.png'}
                                                                style={{width: 'fit-content'}}></IonImg>
                                                        <h5 style={{marginTop: 14, marginLeft: 10}}>Registrar
                                                            contraordenação direta</h5>
                                                    </div>
                                                </Link>
                                            </IonCol>
                                        </IonRow>

                                        <IonRow>
                                            <IonCol>
                                                <Link to={'/coIndirecta'} onClick={() => {
                                                    setShowModal(false);
                                                }}>
                                                    <div style={{display: 'inline-flex'}}>
                                                        <IonImg className='ion-hide' src={'assets/images/temp.png'}
                                                                style={{width: 'fit-content'}}></IonImg>
                                                        <h5 style={{marginTop: 14, marginLeft: 10}}>Registrar
                                                            contraordenação indireta</h5>
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
                                <IonCol sizeLg='4' style={{alignSelf: 'center'}}>
                                    <Link to={'#'} onClick={() => {
                                        setShowModal(false);
                                    }}>
                                        <div style={{display: 'inline-flex'}}>
                                            <IonImg src={'assets/images/temp.png'}
                                                    style={{width: 'fit-content'}}></IonImg>
                                            <h1 style={{marginTop: 14, marginLeft: 10}}>Estatísticas e
                                                listagens</h1>
                                        </div>
                                    </Link>
                                </IonCol>
                                <IonCol sizeLg='4'>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol>
                                                <Link to={'/organizacao'} onClick={() => {
                                                    setShowModal(false);
                                                }}>
                                                    <div style={{display: 'inline-flex'}}>
                                                        <IonImg className='ion-hide' src={'assets/images/temp.png'}
                                                                style={{width: 'fit-content'}}></IonImg>
                                                        <h5 style={{marginTop: 14, marginLeft: 10}}>Organização</h5>
                                                    </div>
                                                </Link>
                                            </IonCol>
                                        </IonRow>

                                        <IonRow>
                                            <IonCol>
                                                <Link to={'/local'} onClick={() => {
                                                    setShowModal(false);
                                                }}>
                                                    <div style={{display: 'inline-flex'}}>
                                                        <IonImg className='ion-hide' src={'assets/images/temp.png'}
                                                                style={{width: 'fit-content'}}></IonImg>
                                                        <h5 style={{marginTop: 14, marginLeft: 10}}>Local</h5>
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
                                <IonCol sizeLg='4' style={{alignSelf: 'center'}}>
                                    <Link to={'#'} onClick={() => {
                                        setShowModal(false);
                                    }}>
                                        <div style={{display: 'inline-flex'}}>
                                            <IonImg src={'assets/images/temp.png'}
                                                    style={{width: 'fit-content'}}></IonImg>
                                            <h1 style={{marginTop: 14, marginLeft: 10}}>Ofícios gerais</h1>
                                        </div>
                                    </Link>
                                </IonCol>

                                <IonCol sizeLg='4'>

                                    <IonGrid>
                                        <IonRow>
                                            <IonCol>
                                                <Link to={'/documento'} onClick={() => {
                                                    setShowModal(false);
                                                }}>
                                                    <div style={{display: 'inline-flex'}}>
                                                        <IonImg className='ion-hide' src={'assets/images/temp.png'}
                                                                style={{width: 'fit-content'}}></IonImg>
                                                        <h5 style={{marginTop: 44, marginLeft: 10}}>Documentos</h5>
                                                    </div>
                                                </Link>
                                            </IonCol>
                                        </IonRow>

                                        <IonRow>
                                            <IonCol>
                                                <Link to={'#'} onClick={() => {
                                                    setShowModal(false);
                                                }}>
                                                    <div style={{display: 'inline-flex'}}>
                                                        <IonImg className='ion-hide' src={'assets/images/temp.png'}
                                                                style={{width: 'fit-content'}}></IonImg>
                                                        <h5 style={{marginTop: 14, marginLeft: 10}}></h5>
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

            </IonModal>
            {/*END: MENU LATERAL ESQUERDA*/}

            {/*START: MENU LATERAL DIREITA*/}
            <IonPopover
                id='popoverMenu'
                isOpen={showPopover}
                className="menu"
                mode="md"
                showBackdrop={true}
                onDidDismiss={() => {
                    setShowPopover(false);
                }}>


                <IonHeader className="ion-no-border">
                    <IonToolbar>
                        <IonLabel slot='start'>

                            <h1>
                                <IonItem lines='none'>
                                    Aplicação
                                </IonItem>
                            </h1>

                        </IonLabel>
                        <IonButton slot="end" color="light" onClick={() => {
                            setShowPopover(false);
                        }}>
                            Fechar
                        </IonButton>

                    </IonToolbar>
                </IonHeader>

                <IonContent>

                    <IonItem className="ion-margin-top" style={{margin: 24}}>
                        <IonIcon slot="start" icon={moon}/>
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


                    <IonItem className="ion-margin-top" style={{margin: 24}} lines='none'>
                        <div style={{width: '-webkit-fill-available'}}>
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


                    <IonItem style={{padding: '0px 30px 0px 30px'}} lines='none'>
                        <div style={{
                            borderRadius: 10,
                            background: '#F0FFF6',
                            width: '100%',
                            padding: '0px 0px 20px 20px',
                            color: 'black',
                            border: 'groove'
                        }}>
                            <h1 style={{fontSize: 44}}>48</h1>
                            <IonLabel>
                                Autos disponíveis
                            </IonLabel>
                        </div>
                    </IonItem>

                    <IonItem style={{padding: '0px 30px 0px 30px', marginTop: 20}} lines='none'>
                        <div style={{
                            borderRadius: 10,
                            background: '#FFF0FA',
                            width: '100%',
                            padding: '0px 0px 20px 20px',
                            color: 'black',
                            border: 'groove'
                        }}>
                            <h1 style={{fontSize: 44}}>71</h1>
                            <IonLabel>
                                Processos disponíveis
                            </IonLabel>
                        </div>
                    </IonItem>

                </IonContent>
                <IonFooter>
                    <IonItem lines='none'>
                        <div id='imgModelosBarras' className='ion-text-center' style={{padding: 12}}>
                            <small>Copyright @ 2021 SCOT+. Todos os direitos reservados.</small><br/>
                            <IonImg className='ion-margin-top ion-margin-bottom'
                                    src={'assets/images/Group 4529.png'} style={{height: 40, marginTop: 36}}/>
                        </div>
                    </IonItem>

                </IonFooter>


            </IonPopover>
            {/*END: MENU LATERLA DIREITA*/}

        </IonHeader>
    );
};

export default React.memo(Menu);

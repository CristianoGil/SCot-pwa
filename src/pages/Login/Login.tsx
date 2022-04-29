import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonRow,
    IonIcon
} from '@ionic/react';

import {useContext, useState } from "react";

import {RouteComponentProps} from 'react-router-dom';
import './Login.scss';
import { UserContext } from '../../Context/UserContext';

const Login: React.FC<RouteComponentProps> = ({history}) => {

    //User Context
    const userContext = useContext<any>(UserContext);

    //State variables definition
    const [username, setUsername] = useState<any>('')
    const [password, setPassword] = useState<any>('')


    const handlerForm = (e: any) => {

        let temp = e.target.value;

        if (e.target.id === 'idusername') {
            setUsername(temp);
        }

        if (e.target.id === 'idpassword') {
            setPassword(temp);
        }

    }

    //Password
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleClickShowPassword = () => {
        setShowPassword((current) => {
            return !current
        })
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    return (
        <IonPage>
            <IonContent>
                {/* conteúdo */}
                <IonGrid className='ion-no-padding' id='gridLogin'>
                    <IonRow id='rowLogin'>

                        <IonCol sizeSm='7' id='colLeft' className='ion-hide-sm-down'>

                            <div id='imgPrimaria'/>

                            <div id='imgPrimaria-fx'></div>

                            <div id='colLeft_Interno' className='ion-align-items-center'>

                                <div id='formDadosDoSistema'>
                                    <div id='imgSecundaria'/>

                                    <div id='imgSecundaria-fx'></div>

                                    <IonImg id='imgLogoScot' src={'assets/images/logo.png'}/>
                                    <IonImg id='imgLogoANSR' src={'assets/images/Logo ANSR (Original).png'}/>
                                    <IonImg id='imgFX' src={'assets/images/login-img--fx.png'}/>

                                </div>

                            </div>

                        </IonCol>

                        <IonCol sizeSm='5' id='colRight' className='ion-align-items-center'>

                            {/* conteúdo da esquerda */}

                            <div id='formLogin'>

                                <h4>Bem-vindo,</h4>
                                <h6>Inicie a sua sessão.</h6>

                                <div id='inputs'>
                                    <form action="none" id="loginForm">
                                    <IonItem id='inputUtilizador'>
                                        <IonLabel position="floating">Utilizador</IonLabel>
                                        <IonInput id="idusername" className="login-input-username" type="text"></IonInput>
                                    </IonItem>

                                    <IonItem className='ion-margin-top'>
                                        <IonLabel  position="floating">Palavra-passe</IonLabel>
                                        <IonInput className="login-input-password" type={showPassword ? 'text' : 'password'}>
                                        </IonInput>
                                        <IonButton
                                            id="idpassword"
                                            className="btn-icon-password"
                                            size="small"
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            <IonIcon slot="end" src={showPassword ? "assets/icon/login/eye-off.svg" : "assets/icon/login/eye-outline.svg"}></IonIcon>
                                        </IonButton>
                                    </IonItem>
                                    </form>
                                    <IonButton onClick={e => {
                                        e.preventDefault();
                                        history.push('/dashboard')
                                    }} expand="block" className='ion-margin-top ion-margin-bottom'
                                               color='#003E7E'>Entrar</IonButton>

                                    <a target="_blank" className="recoverPasswordAnchor" href="#">Recuperar acesso</a>
                                    <IonItem lines='none'>
                                        <div className="ion-text-center">

                                            <IonImg className='ion-margin-top'
                                                    src={'assets/images/Modelos-Barras-FUNDOS-v04_3logos-FEEI.png'}/>

                                        </div>
                                    </IonItem>
                                </div>
                            </div>

                            {/* conteúdo da esquerda */}
                        </IonCol>

                    </IonRow>
                </IonGrid>
                {/* conteúdo */}
            </IonContent>
        </IonPage>
    );
};

export default Login;
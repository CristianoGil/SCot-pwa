import { IonButton, IonCol, IonContent, IonGrid, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import './Login.css';

const Login: React.FC<RouteComponentProps> = ({ match, history, location }) => {
    console.log('aqui');
    console.log(match);
    console.log(history);
    console.log(location);
    return (

            <IonContent>
                {/* conteúdo */}
                <IonGrid className='ion-no-padding'>
                    <IonRow>

                        <IonCol sizeSm='7' id='colLeft' className='ion-hide-sm-down'>

                            <IonImg id='imgPrimaria' src={'assets/images/img.png'} />

                            <div id='imgPrimaria-fx'></div>

                            <div id='colLeft_Interno' className='ion-align-items-center'>

                                <div id='formDadosDoSistema'>
                                    <IonImg id='imgSecundaria' src={'assets/images/img.png'} />

                                    <div id='imgSecundaria-fx'></div>

                                    <IonImg id='imgLogoScot' src={'assets/images/logo.png'} />
                                    <IonImg id='imgLogoANSR' src={'assets/images/Logo ANSR (Original).png'} />
                                    <IonImg id='imgFX' src={'assets/images/login-img--fx.png'} />

                                </div>

                            </div>

                        </IonCol>

                        <IonCol sizeSm='5' id='colRight' className='ion-align-items-center'>

                            {/* conteúdo da esquerda */}

                            <div id='formLogin'>
                                
                                <h4>Bem-vindo,</h4>
                                <h6>Inicie a sua sessão.</h6>

                                <div id='inputs'>
                                    <IonItem id='inputUtilizador'>
                                        <IonLabel position="floating">Utilizador</IonLabel>
                                        <IonInput></IonInput>
                                    </IonItem>

                                    <IonItem className='ion-margin-top'>
                                        <IonLabel position="floating">Palavra-passe</IonLabel>
                                        <IonInput type="password"></IonInput>
                                    </IonItem>

                                    <IonButton onClick={e => {
                                        e.preventDefault();
                                        history.push('/dashboard')
                                    }} expand="block" className='ion-margin-top ion-margin-bottom' color='#003E7E'>Entrar</IonButton>

                                    <a target="_blank" href="#">Recuperar acesso</a>

                                    <IonImg className='ion-margin-top' src={'assets/images/Modelos-Barras-FUNDOS-v04_3logos-FEEI.png'} />
                                </div>
                            </div>

                            {/* conteúdo da esquerda */}
                        </IonCol>

                    </IonRow>
                </IonGrid>
                {/* conteúdo */}
            </IonContent>
    );
};

export default Login;
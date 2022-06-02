import {Redirect, Route, useHistory, useParams} from 'react-router-dom';
import {
    IonApp,
    IonRouterOutlet,
    setupIonicReact,

} from '@ionic/react';

import {IonReactRouter} from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './App.css';

import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import {useContext, useEffect, useState} from 'react';
import {IResponseLogin} from './model/login';
import {UserContext} from './Context/UserContext';
import CoIndirecta from './pages/ContraOrdenacoes/Co-Indirecta/Co-Indirecta';
import CoDirecta from './pages/ContraOrdenacoes/Co-Directa/Co-Directa';
import Pessoa from './pages/RI-Catalogo/Pessoa/Pessoa';
import Veiculo from './pages/RI-Catalogo/Veiculo/Veiculo';
import Organizacao from './pages/RI-Catalogo/Organizacao/Organizacao';
import Local from './pages/RI-Catalogo/Local/Local';
import Documento from './pages/RI-Catalogo/Documento/Documento';
import EmissaoApreensaoDocumentos from './pages/EmissaoApreensaoDocumentos/EmissaoApreensaoDocumentos';
import EmissaoApresentacaoDocumentos from './pages/EmissaoApresentacaoDocumentos/EmissaoApresentacaoDocumentos';
import EmissaoApreensaoVeiculo from './pages/EmissaoApreensaoVeiculo/EmissaoApreensaoVeiculo';
import EmissaoTesteAlcoolemia from './pages/EmissaoTesteAlcoolemia/EmissaoTesteAlcoolemia';
import CODirectaSignPDFPreview from './pages/ContraOrdenacoes/Co-Directa/CO-SignPDFPreview';
import React from 'react';

interface IProtectedProps {
    isAllowed: boolean
    children: any
}

const ProtectedRoute: React.FC<IProtectedProps> = (props) => {
    const history = useHistory()

    const {isAllowed = false, children} = props;

    if (!isAllowed) {
        history.replace("/login")
        return (<Login/>)
    }
    return (children)
};


setupIonicReact();

const App: React.FC = () => {

    const userContext = useContext<any>(UserContext);
  
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>


                    <Route path={"/dashboard"} exact={true}>
                        <ProtectedRoute isAllowed={userContext.isAuthenticated()}>
                            <Dashboard/>
                        </ProtectedRoute>
                    </Route>
                    <Route path={"/coDirecta"} exact={true}>
                        <ProtectedRoute isAllowed={userContext.isAuthenticated()}>
                            <CoDirecta/>
                        </ProtectedRoute>
                    </Route>


                    <Route path={"/pessoa"} exact={true}>
                        <ProtectedRoute isAllowed={userContext.isAuthenticated()}>
                            <Pessoa/>
                        </ProtectedRoute>
                    </Route>

                    <Route path={"/veiculo"} exact={true}>
                        <ProtectedRoute isAllowed={userContext.isAuthenticated()}>
                            <Veiculo/>
                        </ProtectedRoute>
                    </Route>

                    <Route path={"/organizacao"} exact={true}>
                        <ProtectedRoute isAllowed={userContext.isAuthenticated()}>
                            <Organizacao/>
                        </ProtectedRoute>
                    </Route>

                    <Route path={"/local"} exact={true}>
                        <ProtectedRoute isAllowed={userContext.isAuthenticated()}>
                            <Local/>
                        </ProtectedRoute>
                    </Route>

                    <Route path={"/documento"} exact={true}>
                        <ProtectedRoute isAllowed={userContext.isAuthenticated()}>
                            <Documento/>
                        </ProtectedRoute>
                    </Route>

                    <Route path={"/emissaoApreensaoDocumentos"} exact={true}>
                        <ProtectedRoute isAllowed={userContext.isAuthenticated()}>
                            <EmissaoApreensaoDocumentos/>
                        </ProtectedRoute>
                    </Route>

                    <Route path={"/emissaoApresentacaoDocumentos"} exact={true}>
                        <ProtectedRoute isAllowed={userContext.isAuthenticated()}>
                            <EmissaoApresentacaoDocumentos/>
                        </ProtectedRoute>
                    </Route>

                    <Route path={"/emissaoApreensaoVeiculo"} exact={true}>
                        <ProtectedRoute isAllowed={userContext.isAuthenticated()}>
                            <EmissaoApreensaoVeiculo/>
                        </ProtectedRoute>
                    </Route>

                    <Route path={"/emissaoTesteAlcoolemia"} exact={true}>
                        <ProtectedRoute isAllowed={userContext.isAuthenticated()}>
                            <EmissaoTesteAlcoolemia/>
                        </ProtectedRoute>
                    </Route>


                    <Route path={"/CODirectaSignPDFPreview/:coData"} exact={true}>
                        <ProtectedRoute isAllowed={userContext.isAuthenticated()}>
                            <CODirectaSignPDFPreview/>
                        </ProtectedRoute>
                    </Route>

                    <Route path={"/coIndirecta"} exact={true}>
                        <ProtectedRoute isAllowed={userContext.isAuthenticated()}>
                            <CoIndirecta/>
                        </ProtectedRoute>
                    </Route>

                    <Route path={"/login"} exact={true}>
                        <Login/>
                    </Route>

                    <Redirect exact from="/" to="/dashboard"/>

                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>

    );
}

export default App;

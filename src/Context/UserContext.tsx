import {useState, createContext, useContext} from 'react';
import _ from 'underscore';
import Login from '../api/Login';
import {IResponseLogin} from '../model/login';


export interface IUserContex {
    login: any,
    logout: any,
    isAuthenticated: any,
    user: IResponseLogin
}
export const UserContext = createContext<any | null>(null);

export const UserProvider = (props: any) => {

    const instanceLogin = new Login();

    const [user, setUser] = useState<IResponseLogin>({
        userName: undefined,
        nomeUsuario: undefined,
        entidade: undefined,
        email: undefined,
        token: undefined,
        menu: undefined,
        isMobilidade: undefined,
        loggeDate: undefined
    })

    const loginUsuario = (username: string, password: string, cbSuccess: any = () => {}, cbError: any = () => {}) => {

        const requestLogin = {
            username: username,
            password: password
        };

        instanceLogin.authenticate(requestLogin).then((response: any) => {
            if (response && _.has(response, 'token')) {
                setUser({
                    userName: response.userName,
                    nomeUsuario: response.nomeUsuario,
                    entidade: response.entidade,
                    email: response.email,
                    token: response.token,
                    menu: response.menu,
                    isMobilidade: response.isMobilidade,
                    loggeDate: response.loggeDate
                });

                cbSuccess();
            }

        }).catch(() => {
            cbError()
        })

    }

    const logout = (cb: any) => {

        instanceLogin.logout();

        //clear context
        setUser({
            userName: undefined,
            nomeUsuario: undefined,
            entidade: undefined,
            email: undefined,
            token: undefined,
            menu: undefined,
            isMobilidade: undefined,
            loggeDate: undefined
        });

        //call callback function
        cb();
    }


    const isAuthenticated = (): boolean => {
        return instanceLogin.isAuthenticated()
    }

    return (
        <UserContext.Provider value={{
            login: loginUsuario,
            logout: logout,
            isAuthenticated: isAuthenticated,
            user: user
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

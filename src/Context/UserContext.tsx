import { useState, createContext, useContext } from 'react';
// import { login } from '../Services/login.service';
// import { BackdropContext } from "./BackdropContext";


export const UserContext = createContext<any | null>(null);

export const UserProvider = (props: any) => {

    //context
    // const backdrop = useContext<any>(BackdropContext);
    //
    // const [user, setUser] = useState<any>({
    //     username: "",
    //     email: "",
    //     entidade: {},
    //     menu: [],
    //     isMobilidade: null
    // })
    //
    //
    // const loginUsuario = (username: string, password: string, cb: any) => {
    //
    //     //set backdrop
    //     backdrop.backdropOpen(true)
    //
    //     const requestLogin = {
    //         username: username,
    //         password: password,
    //         email: ""
    //     };
    //
    //     // login(requestLogin).then((response: any) => {
    //     //     if (response) {
    //     //         setUser({
    //     //             username: response.username,
    //     //             email: response.email,
    //     //             entidade: response.entidade,
    //     //             menu: response.menu,
    //     //             isMobilidade: response.isMobilidade
    //     //         });
    //     //
    //     //         cb();
    //     //     }
    //     //
    //     // }).finally(() => {
    //     //     backdrop.backdropOpen(false)
    //     // });
    //
    // }
    //
    // const logout = (cb: any) => {
    //
    //     //clear context
    //     setUser({
    //         username: "",
    //         email: "",
    //         menu: [],
    //         isMobilidade: null
    //     });
    //
    //     //call callback function
    //     cb();
    // }
    //
    //
    // const isAuthenticated = () => {
    //
    //     if (user.username) {
    //         return true;
    //     } else {
    //         return false
    //     }
    //
    // }
    //
    // return (
    //     <UserContext.Provider value={{
    //         login: loginUsuario,
    //         logout: logout,
    //         isAuthenticated: isAuthenticated,
    //         user: user
    //     }}>
    //         {props.children}
    //     </UserContext.Provider>
    // );
}

import type {AxiosError, AxiosResponse} from "axios";
import {URL_API_SCOT, AUTH_LOCALSTORAGE} from "../utils/const";
import axios from "../config/axios.config";
import type {IRequestLogin, IResponseLogin} from "../model/login";
import _ from "underscore";


export default class Login {
    prefix_url: string = 'v1/login';

    public authenticate(request: IRequestLogin): Promise<IResponseLogin | null> {

        return new Promise((resolve, reject) => {

            axios.post(`${URL_API_SCOT}/${this.prefix_url}`, request).then((response: AxiosResponse) => {
                const dataUser: IResponseLogin = response.data;
                dataUser.loggeDate = new Date();
                localStorage.setItem(AUTH_LOCALSTORAGE, JSON.stringify(dataUser));
                resolve(dataUser);
            }).catch((error) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error("Login error: ", error)
                }
                reject();
            })
        })

    }

    public logout(): void{
        localStorage.setItem(AUTH_LOCALSTORAGE, '{}');
        localStorage.removeItem(AUTH_LOCALSTORAGE);
    }

    public isAuthenticated(): boolean {
        const dataUser = localStorage.getItem(AUTH_LOCALSTORAGE);
        if (dataUser) {
            const parse_dataUser: IResponseLogin = JSON.parse(dataUser);
            return _.has(parse_dataUser, 'token')
        }

        return false
    }

    public getUserData(): IResponseLogin | null {

        const dataUser = localStorage.getItem(AUTH_LOCALSTORAGE);

        if (dataUser) {
            const parse_dataUser: IResponseLogin = JSON.parse(dataUser);
            return parse_dataUser
        }

        return null
    }
}

import type {AxiosError, AxiosResponse} from "axios";
import {URL_API_SCOT, AUTH_LOCALSTORAGE} from "../utils/const";
import axios from "../config/axios.config";
import type {IRequestLogin, IResponseLogin} from "../model/login";
import _ from "underscore";


export class Login implements IRequestLogin {
    username?: string;
    password?: string;
    email?: string | undefined;

    prefix_url: string = 'v1/login';

    constructor(username?: string, password?: string, email?: string) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public auth(): Promise<void> {

        return new Promise((resolve, reject) => {

            const request: IRequestLogin = {
                username: this.username,
                password: this.password,
                email: this.email
            };

            axios.post(`${URL_API_SCOT}/${this.prefix_url}`, request).then((response: AxiosResponse) => {
                const dataUser: IResponseLogin = response.data;
                localStorage.setItem('AUTH_LOCALSTORAGE', JSON.stringify(dataUser));
                resolve();
            }).catch((error) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error("Login error: ", error)
                }
                reject();
            })
        })

    }

    public isAuthenticated(): boolean {
        const dataUser = localStorage.getItem('AUTH_LOCALSTORAGE');
        if (dataUser) {
            const parse_dataUser: IResponseLogin = JSON.parse(dataUser);
            return _.has(parse_dataUser, 'token') && _.has(parse_dataUser, 'userName')
        }

        return false
    }
}

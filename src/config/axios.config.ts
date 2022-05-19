import axios from 'axios'
import type {AxiosRequestConfig} from 'axios'
import {AUTH_LOCALSTORAGE, AXIOS_TIMEOUT, AUTH_AUTHENTICATION_TOKEN} from "../utils/const";
import _  from 'underscore';
import { isMatchRegex } from '../utils/apex-formatters';

axios.interceptors.request.use(async (config: AxiosRequestConfig | any) => {

    const listUrlRegex =  AUTH_AUTHENTICATION_TOKEN.map((a: string) => {
        return new RegExp(a.replaceAll('http://', '').replaceAll('https://', ''),  "i")
    })
    if (isMatchRegex(listUrlRegex, config.url)) {
        const dataUser = localStorage.getItem(AUTH_LOCALSTORAGE);
        if (dataUser) {
            const token = (JSON.parse(dataUser) || {token: 'null'}).token;
            config.headers.common['Authorization'] = `Bearer ${token}`
        }

    }
    return config
})

axios.defaults.timeout = AXIOS_TIMEOUT;
export default axios

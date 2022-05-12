import axios from 'axios'
import type {AxiosRequestConfig} from 'axios'
import {AUTH_LOCALSTORAGE, AXIOS_TIMEOUT, URL_AUTH_AUTHENTICATION_TOKEN} from "../utils/const";

axios.interceptors.request.use(async (config: AxiosRequestConfig | any) => {
    if ((config.url).search(`/${URL_AUTH_AUTHENTICATION_TOKEN.join(' ')}/i`) !== -1) {
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

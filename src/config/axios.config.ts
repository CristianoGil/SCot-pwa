import axios from 'axios'
import type {AxiosRequestConfig} from 'axios'
import {AUTH_TOKEN, AXIOS_TIMEOUT, URL_AUTH_AUTHENTICATION_TOKEN} from "../utils/const";



axios.interceptors.request.use(async (config: AxiosRequestConfig | any) => {
    if ((config.url).search(`/${URL_AUTH_AUTHENTICATION_TOKEN.join(' ')}/i`) !== -1) {
        config.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`
    }
    return config
})

axios.defaults.timeout = AXIOS_TIMEOUT;
export default axios

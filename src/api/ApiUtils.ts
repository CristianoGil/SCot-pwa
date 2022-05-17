import type {AxiosError, AxiosResponse} from "axios";
import {URL_API_SCOT} from "../utils/const";
import _ from "underscore";
import axios from "axios";

export class ApiUtils{

    public connectPostAPI(service_url: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .post(`${URL_API_SCOT}/${service_url}`, data)
                .then((response: AxiosResponse<any>) => {
                    resolve(response)
                })
                .catch((error: AxiosError) => {
                    reject(error)
                })
        })
    }
    public connectGetAPI(service_url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .get(`${URL_API_SCOT}/${service_url}`)
                .then((response: AxiosResponse<any>) => {
                    resolve(response)
                })
                .catch((error: AxiosError) => {
                    reject(error)
                })
        })
    }

}
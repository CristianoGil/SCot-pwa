import type {AxiosError, AxiosResponse} from "axios";
import type {IPesquisarPessoaRequest, IPesquisarPessoaResponse} from "../model/contraordenacao";
import {URL_API_SCOT} from "../utils/const";
import axios from '../config/axios.config';

export class Contraordenacao {

    prefix_url: string = 'v1/contraOrdenacao'

    private connectPostAPI(service_url: string, data: any): Promise<any> {

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

    private connectGetAPI(service_url: string): Promise<any> {

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


    public pesquisarPessoa(requestData: IPesquisarPessoaRequest): Promise<IPesquisarPessoaResponse> {   
        return new Promise((resolve, reject) => {

            const service_url = 'pesquisaNIF';
            this.connectPostAPI(`${this.prefix_url}/${service_url}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                console.error(`${this.prefix_url}/${service_url}:`, error)
                reject(error)
            })

        })
    }

}
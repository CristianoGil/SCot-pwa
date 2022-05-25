import type {AxiosError, AxiosResponse} from "axios";
import type {
    ICoDirecta,
    IPesquisarPessoaRequest,
    IPesquisarPessoaResponse,
    IPesquisarVeiculoResponse
} from "../model/contraordenacao";
import {URL_API_SCOT} from "../utils/const";
import axios from '../config/axios.config';
import {getPlatforms} from "@ionic/react";
import {LoadOfflineData} from "./LoadOfflineData";
import _ from "underscore";
import {IVeiculoRequest} from "../model/veiculo";
import {CarregarCombosApreensaoDocumento} from "../model/documentoapreendido";
import database from "../database";

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

    public async guardarCODirectaGeneric(requestData: ICoDirecta): Promise<ICoDirecta | null> {


        if (_.contains(getPlatforms(), 'desktop')) { // Is a desktop device
            return await this.guardarCODirecta(requestData);
        } else { // Is a mobile device

            if (navigator.onLine) { // Is Online
                return await this.guardarCODirecta(requestData);
            } else { // Is onfline

                const {insertOne} = database();

                return new Promise((resolve, reject) => {

                    insertOne('co_directa', 3, [JSON.stringify(requestData), false, (new Date().toDateString())], ['data', 'isSynchronized', 'createdAt']).then(() => {
                        reject(requestData);
                    }).catch((e) => {
                        reject(e);
                    })
                })

            }

        }


    }

    public guardarCODirecta(requestData: ICoDirecta): Promise<ICoDirecta | null> {
        return new Promise((resolve, reject) => {

            const service_url = 'salvarContraOrdenacao';
            this.connectPostAPI(`${this.prefix_url}/${service_url}`, {contraOrdenacao: requestData}).then((response) => {
                resolve(response.data as unknown as ICoDirecta);
            }).catch((error: AxiosError) => {
                console.error(`${this.prefix_url}/${service_url}:`, error)
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

    public pesquisarVeiculo(requestData: IVeiculoRequest): Promise<IPesquisarVeiculoResponse> {
        return new Promise((resolve, reject) => {

            const service_url = 'pesquisaMatricula';
            this.connectPostAPI(`${this.prefix_url}/${service_url}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                console.error(`${this.prefix_url}/${service_url}:`, error)
                reject(error)
            })

        })
    }


    public carregarCombosPessoa(entity: string): Promise<any> {
        return new Promise((resolve, reject) => {

            if (!_.contains(getPlatforms(), 'desktop')) { // Load offline data

                const instanceOfflineData = new LoadOfflineData();
                instanceOfflineData.fetch_combos('contraOrdenacao_carregarCombosPessoa'.toLowerCase()).then((data: any) => {
                    const combos = _.isObject(data) ? _.has(data, entity) ? data[entity] : null : data;
                    resolve(combos);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            } else { // Go to the internet for load data

                const service_url = 'carregarCombosPessoa';
                this.connectGetAPI(`${this.prefix_url}/${service_url}`).then((response) => {
                    const data = response.data;
                    const combos = _.isObject(data) ? _.has(data, entity) ? data[entity] : null : data;
                    resolve(combos);
                }).catch((error: AxiosError) => {
                    console.error(`${service_url}:`, error);
                    reject(error);
                })

            }
        })
    }


    public carregarCombosVeiculo(entity: string): Promise<any> {
        return new Promise((resolve, reject) => {

            if (!_.contains(getPlatforms(), 'desktop')) { // Load offline data

                const instanceOfflineData = new LoadOfflineData();
                instanceOfflineData.fetch_combos('contraOrdenacao_carregarCombosVeiculo'.toLowerCase()).then((data: any) => {
                    const combos = _.isObject(data) ? _.has(data, entity) ? data[entity] : null : data;
                    resolve(combos);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            } else { // Go to the internet for load data

                const service_url = 'carregarCombosVeiculo';
                this.connectGetAPI(`${this.prefix_url}/${service_url}`).then((response) => {
                    const data = response.data;
                    const combos = _.isObject(data) ? _.has(data, entity) ? data[entity] : null : data;
                    resolve(combos);
                }).catch((error: AxiosError) => {
                    console.error(`${service_url}:`, error);
                    reject(error);
                })

            }
        })
    }


    public carregarCombosAssinaturas(): Promise<any> {
        return new Promise((resolve, reject) => {

            if (!_.contains(getPlatforms(), 'desktop')) { // Load offline data

                const instanceOfflineData = new LoadOfflineData();
                instanceOfflineData.fetch_combos('contraOrdenacao_getCombosAssinaturas'.toLowerCase()).then((data: any) => {
                    resolve(data);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            } else { // Go to the internet for load data

                const service_url = 'getCombosAssinaturas';
                this.connectGetAPI(`${this.prefix_url}/${service_url}`).then((response) => {
                    const data = response.data;
                    resolve(data);
                }).catch((error: AxiosError) => {
                    console.error(`${service_url}:`, error);
                    reject(error);
                })

            }
        })
    }

    public carregarCombosMotivoApreensao(): Promise<CarregarCombosApreensaoDocumento> {
        return new Promise((resolve, reject) => {

            if (!_.contains(getPlatforms(), 'desktop')) { // Load offline data

                const instanceOfflineData = new LoadOfflineData();
                instanceOfflineData.fetch_combos('contraOrdenacao_carregarCombosApreensaoDocumentos'.toLowerCase()).then((data: any) => {
                    resolve(data);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            }
            else { // Go to the internet for load data

                const service_url = 'carregarCombosApreensaoDocumentos';
                this.connectGetAPI(`${this.prefix_url}/${service_url}`).then((response) => {
                    const data = response.data;
                    resolve(data);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            }
        })
    }


    public carregarCombosInfracao(): Promise<any> {
        return new Promise((resolve, reject) => {

            // if (!_.contains(getPlatforms(), 'desktop')) { // Load offline data

            //     const instanceOfflineData = new LoadOfflineData();
            //     instanceOfflineData.fetch_combos('contraOrdenacao_carregarCombosApreensaoDocumentos'.toLowerCase()).then((data: any) => {
            //         resolve(data);
            //     }).catch((error: AxiosError) => {
            //         reject(error);
            //     })

            // }
            // else { // Go to the internet for load data

                const service_url = 'carregarCombosInfracao';
                this.connectGetAPI(`${this.prefix_url}/${service_url}`).then((response) => {
                    const data = response.data;
                    resolve(data);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            // }
        })
    }



}

import type {AxiosError, AxiosResponse} from "axios";
import axios from "../config/axios.config";
import {URL_API_SCOT} from '../utils/const';
import {getPlatforms} from '@ionic/react';

import type {
    ICombosVeiculoResponse,
    IVeiculo, IVeiculoRequest, IVeiculoResponse
} from "../model/veiculo";
import {LoadOfflineData} from "./LoadOfflineData";
import _ from "underscore";

export class Veiculo implements IVeiculoRequest {
    matricula: string;
    chassi: string | undefined;
    ano: string | undefined;
    categoria: number | undefined;
    classe: number | undefined;
    subclasse: number | undefined;
    tipo: number | undefined;
    marca: number | undefined;
    modelo: number | undefined;
    cor: number | undefined;
    pais: number | undefined;

    prefix_url: string = 'v1/veiculos'

    constructor(veiculo: IVeiculoRequest) {
        this.matricula = veiculo.matricula;
        this.chassi = veiculo?.chassi;
        this.ano = veiculo?.ano;
        this.categoria = veiculo?.categoria;
        this.classe = veiculo?.classe;
        this.tipo = veiculo?.tipo;
        this.subclasse = veiculo?.subclasse;
        this.pais = veiculo?.pais;
        this.marca = veiculo?.marca;
        this.modelo = veiculo?.modelo;
        this.cor = veiculo?.cor;
    }

    private getRequestData(): IVeiculoRequest {
        return {
            matricula: this.matricula,
            chassi: this.chassi,
            ano: this.ano,
            categoria: this.categoria,
            classe: this.classe,
            tipo: this.tipo,
            subclasse: this.subclasse,
            pais: this.pais,
            marca: this.marca,
            modelo: this.modelo,
            cor: this.cor
        };
    }

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

    public pesquisarVeiculo(): Promise<IVeiculoResponse> {
        return new Promise((resolve, reject) => {

            const service_url = 'pesquisarVeiculo';
            this.connectPostAPI(`${this.prefix_url}/${service_url}`, this.getRequestData()).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                console.error(`${service_url}:`, error)
                reject(error)
            })

        })
    }

    public pesquisaMatricula(): Promise<IVeiculo> {
        return new Promise((resolve, reject) => {

            const service_url = 'pesquisaMatricula';
            this.connectPostAPI(`${this.prefix_url}/${service_url}`, this.getRequestData()).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                console.error(`${service_url}:`, error)
                reject(error)
            })

        })
    }

    public carregarCombosVeiculo(): Promise<ICombosVeiculoResponse> {
        return new Promise((resolve, reject) => {

            if (!_.contains(getPlatforms(), 'desktop')) { // Load offline data

                const instanceOfflineData = new LoadOfflineData();
                instanceOfflineData.fetch_combos('veiculos_carregarCombosVeiculo'.toLowerCase()).then((data) => {
                    resolve(data);
                }).catch((error) => {
                    reject(error);
                })

            } else { // Go to the internet for load data

                const service_url = 'carregarCombosVeiculo';
                this.connectGetAPI(`${this.prefix_url}/${service_url}`).then((response) => {
                    resolve(response.data);
                }).catch((error: AxiosError) => {
                    console.error(`${service_url}:`, error);
                    reject(error);
                })

            }
        })
    }

}
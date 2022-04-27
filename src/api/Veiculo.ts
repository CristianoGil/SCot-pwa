import type {AxiosError, AxiosResponse} from "axios";
import axios from "../config/axios.config";
import {URL_API_SCOT} from '../utils/const';

import type {
    ICategoriaVeiculo, IClasseVeiculo, ICoimaVeiculo, ICorVeiculo, IEstadoPolicial, IMarcaVeiculo,
    IModeloVeiculo, IPais, ISubclasseVeiculo, ITipoVeiculo, IVeiculo, IVeiculoRequest
} from "../model/veiculo";

export class Veiculo implements IVeiculoRequest {
    matricula: string;
    chassi: string;
    ano: string;
    categoria: number;
    classe: number;
    subclasse: number;
    tipo: number;
    marca: number;
    modelo: number;
    cor: number;
    pais: number;

    prefix_url: string = '/v1/veiculos/'

    constructor(veiculo: IVeiculoRequest) {
        this.matricula = veiculo.matricula;
        this.chassi = veiculo.chassi;
        this.ano = veiculo.ano;
        this.categoria = veiculo.categoria;
        this.classe = veiculo.classe;
        this.tipo = veiculo.tipo;
        this.subclasse = veiculo.subclasse;
        this.pais = veiculo.pais;
        this.marca = veiculo.marca;
        this.modelo = veiculo.modelo;
        this.cor = veiculo.cor;
    }

    private connectAPI(service_url: string): Promise<any> {
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

    public pesquisarVeiculo(overrider?: IVeiculoRequest): Promise<IVeiculo> {
        return new Promise((resolve, reject) => {

            let dataRequest: IVeiculoRequest = {
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
            
            dataRequest = Object.assign(dataRequest, overrider);

            const service_url = 'pesquisarVeiculo';
            this.connectAPI(`${this.prefix_url}/${service_url}`).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                console.error(`${service_url}:`, error)
                reject(error)
            })

        })
    }


}
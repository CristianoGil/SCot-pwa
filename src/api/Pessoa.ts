import type {AxiosError, AxiosResponse} from "axios";
import type {IPessoaNIFResponse, IPessoaRequest, IPessoaResponse} from "../model/person";
import {URL_API_SCOT} from "../utils/const";
import axios from "../config/axios.config";

export class Pessoa implements IPessoaRequest {
    nif: number;
    nome?: string | undefined;
    dataNascimento?: Date | undefined;
    idTipoDocumento?: number | undefined;
    numeroDocumento?: string | undefined;
    arruamento?: string | undefined;
    moradaZonaBairro?: string | undefined;
    loteNPolicia?: string | undefined;
    fraccao?: string | undefined;
    consultarWebService?: boolean | undefined;
    prefix_url: string = 'v1/pessoas'

    constructor(pessoa: IPessoaRequest) {
        this.nif = pessoa.nif;
        this.nome = pessoa?.nome;
        this.dataNascimento = pessoa?.dataNascimento;
        this.idTipoDocumento = pessoa?.idTipoDocumento;
        this.numeroDocumento = pessoa?.numeroDocumento;
        this.arruamento = pessoa?.arruamento;
        this.moradaZonaBairro = pessoa?.moradaZonaBairro;
        this.loteNPolicia = pessoa?.loteNPolicia;
        this.fraccao = pessoa?.fraccao;
        this.consultarWebService = pessoa?.consultarWebService;
    }

    private getRequestData(): IPessoaRequest {
        return {
            nif: this.nif,
            nome: this.nome,
            dataNascimento: this.dataNascimento,
            idTipoDocumento: this.idTipoDocumento,
            numeroDocumento: this.numeroDocumento,
            arruamento: this.arruamento,
            moradaZonaBairro: this.moradaZonaBairro,
            loteNPolicia: this.loteNPolicia,
            fraccao: this.fraccao,
            consultarWebService: this.consultarWebService
        }
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

    public pesquisarPessoa(): Promise<IPessoaResponse> {
        return new Promise((resolve, reject) => {

            const service_url = 'pesquisarPessoa';
            this.connectPostAPI(`${this.prefix_url}/${service_url}`, this.getRequestData()).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                console.error(`${service_url}:`, error)
                reject(error)
            })

        })
    }

    public pesquisarNIF(): Promise<IPessoaNIFResponse> {
        return new Promise((resolve, reject) => {

            const service_url = 'pesquisarNIF';
            this.connectPostAPI(`${this.prefix_url}/${service_url}`, this.getRequestData()).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                console.error(`${service_url}:`, error)
                reject(error)
            })

        })
    }
    
}
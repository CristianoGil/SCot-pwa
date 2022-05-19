import type {AxiosError, AxiosResponse} from "axios";
import {URL_ASSINATURAS} from "../utils/const";
import axios from "../config/axios.config";
import {ResponseSignature} from "../model/assinatura";

export default class Assinatura {
    private base64Pdf: string


    /**
     *
     * @param base64Pdf
     */
    constructor(base64Pdf: string) {
        this.base64Pdf = base64Pdf
    }

    /**
     *
     * @param service_url
     * @private
     */
    private connectGetAPI(service_url: string): Promise<any> {

        return new Promise((resolve, reject) => {

            axios
                .get(`${service_url}`)
                .then((response: AxiosResponse<any>) => {
                    resolve(response)
                })
                .catch((error: AxiosError) => {
                    reject(error)
                })
        })
    }


    /**
     *
     * @param posx
     * @param posy
     * @param idcord
     * @param isreduzida
     */
    public cc_sign(posx = 340, posy = 385, idcord = 0, isreduzida = 1): Promise<ResponseSignature> {
        return new Promise((resolve, reject) => {

            const service_url = `${URL_ASSINATURAS.CC}?base64=${this.base64Pdf}&posx=${posx}&posy=${posy}&idcord=${idcord}&isreduzida=${isreduzida}`
            this.connectGetAPI(`${service_url}`).then((response) => {
                resolve(response.data as unknown as ResponseSignature);
            }).catch((error: AxiosError) => {
                console.error(error)
                reject(error)
            })

        })
    }

    /**
     *
     * @param posx
     * @param posy
     * @param idcord
     * @param isreduzida
     */
    public ceger_sign(posx = 340, posy = 385, idcord = 0, isreduzida = 1): Promise<ResponseSignature> {
        return new Promise((resolve, reject) => {

            const service_url = `${URL_ASSINATURAS.CEGER}?base64=${this.base64Pdf}&posx=${posx}&posy=${posy}&idcord=${idcord}&isreduzida=${isreduzida}`
            this.connectGetAPI(`${service_url}`).then((response) => {
                resolve(response.data as unknown as ResponseSignature);
            }).catch((error: AxiosError) => {
                console.error(error)
                reject(error)
            })

        })
    }


    /**
     *
     * @param posx
     * @param posy
     * @param idcord
     * @param isreduzida
     * @param num
     */
    public cmd_sign(posx = 340, posy = 385, idcord = 0, isreduzida = 1, numeroTelefone:string ): Promise<ResponseSignature> {
        return new Promise((resolve, reject) => {
            const service_url = `${URL_ASSINATURAS.CMD}?base64=${this.base64Pdf}&posx=${posx}&posy=${posy}&idcord=${idcord}&numTlm=${numeroTelefone}&isreduzida=${isreduzida}`
            this.connectGetAPI(`${service_url}`).then((response) => {
                resolve(response.data as unknown as ResponseSignature);
            }).catch((error: AxiosError) => {
                console.error(error)
                reject(error)
            })

        })
    }
}

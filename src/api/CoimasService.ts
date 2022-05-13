import { ApiUtils } from "./ApiUtils";
import type {AxiosError} from "axios";
import { PESQUISAR_COIMAS_EM_ATRASO_ENDPOINT, PESQUISAR_COIMAS_VOLUNT_EM_ATRASO_ENDPOINT } from "../utils/const";
import { PesquisarCoimasEmAtrasoVoluntRequest, PesquisarCoimasEmAtrasoVoluntResponse } from "../model/Coimas";

export class CoimasService{
  private apiUtils = new ApiUtils();

    public pesquisarCoimasEmAtraso(requestData:any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${PESQUISAR_COIMAS_EM_ATRASO_ENDPOINT}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })

        }) 
       }  
     public  getCoimasVoluntEmAtraso(requestData:PesquisarCoimasEmAtrasoVoluntRequest): Promise<PesquisarCoimasEmAtrasoVoluntResponse> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${PESQUISAR_COIMAS_VOLUNT_EM_ATRASO_ENDPOINT}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })

        })
    }


}
import { ApiUtils } from "./ApiUtils";
import type {AxiosError} from "axios";
import {PESQUISAR_DEPOSITOS_EM_ATRASO_ENDPOINT} from "../utils/const";

export class Deposito48hrService{
  private apiUtils = new ApiUtils();

    public pesquisarDepositos48hrsEmAtraso(requestData:any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${PESQUISAR_DEPOSITOS_EM_ATRASO_ENDPOINT}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })
        }) 
       }  
  


}
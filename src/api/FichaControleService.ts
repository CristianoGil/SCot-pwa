import { ApiUtils } from "./ApiUtils";
import type {AxiosError} from "axios";
import {FICHA_CONTROLES_PREFIX} from "../utils/const";

export class FichaControleService{
  private apiUtils = new ApiUtils();

    public gravarFichaControle(requestData:any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${FICHA_CONTROLES_PREFIX}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })
        }) 
       }  
}
import { ApiUtils } from "./ApiUtils";
import type {AxiosError} from "axios";
import {FICHA_CONTROLES_PREFIX} from "../utils/const";
import { FichaControleRequest, FichaControleResponse } from "../model/fichacontrole";

export class FichaControleService{
  private apiUtils = new ApiUtils();

    public gravarFichaControle(requestData:FichaControleRequest): Promise<FichaControleResponse> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${FICHA_CONTROLES_PREFIX}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })
        }) 
       }  
}
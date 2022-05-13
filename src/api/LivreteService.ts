import { ApiUtils } from "./ApiUtils";
import type {AxiosError} from "axios";
import {LIVRETE_PREFIX} from "../utils/const";
import { LivreteRequest, LivreteResponse } from "../model/livrete";

export class LivreteService{
  private apiUtils = new ApiUtils();

    public obterInfoLivrete(requestData:LivreteRequest): Promise<LivreteResponse> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${LIVRETE_PREFIX}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })
        }) 
       }  
}
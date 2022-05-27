import { ApiUtils } from "./ApiUtils";
import type {AxiosError} from "axios";
import {SANCOES_PREFIX} from "../utils/const";
import { SancoesRequest, SancoesResponse, SancoesResponseList } from "../model/sancoes";

export class SancoesService{
  private apiUtils = new ApiUtils();

    public pesquisarSancoesAcessorias(requestData:SancoesRequest): Promise<SancoesResponseList> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${SANCOES_PREFIX}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })
        }) 
       }  
}
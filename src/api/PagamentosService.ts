import { ApiUtils } from "./ApiUtils";
import type {AxiosError} from "axios";
import {PAGAMENTO_EM_ATRASO_ENDPOINT, PAGAMENTO_TPA_ENDPOINT} from "../utils/const";
import { PagamentoAtrasoRequest, CommonResponse2Args, PagamentosPesquisarCoimasEmAtrasoRequest, PagamentosPesquisarCoimasEmAtrasoResponse, PagamentoTpaRequest } from "../model/pagamento";

export class PagamentosService{
  private apiUtils = new ApiUtils();

    public pagamentoAtraso(requestData:PagamentoAtrasoRequest): Promise<CommonResponse2Args> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${PAGAMENTO_EM_ATRASO_ENDPOINT}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })
        }) 
       }  

       public pesquisarCoimasEmAtraso(requestData:PagamentosPesquisarCoimasEmAtrasoRequest): Promise<PagamentosPesquisarCoimasEmAtrasoResponse> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${PAGAMENTO_EM_ATRASO_ENDPOINT}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })
        }) 
       }  

       public pagamentoTpa(requestData:PagamentoTpaRequest): Promise<CommonResponse2Args> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${PAGAMENTO_TPA_ENDPOINT}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })
        }) 
       } 
  


}
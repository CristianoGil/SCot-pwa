import { ApiUtils } from "./ApiUtils";
import type {AxiosError} from "axios";
import { 
     ANULAR_COBRANCA_ENDPOINT,
     ATUALIZAR_COBRANCA_ENDPOINT,
     OBTER_DADOS_PAGAMENTO_COBRANCA_ENDPOINT,
     OBTER_ESTADO_COBRANCA_ENDPOINT, 
     
     } 
     from "../utils/const";

export class CobrancaService{
  private apiUtils = new ApiUtils();

    public anularCobranca(requestData:any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${ANULAR_COBRANCA_ENDPOINT}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })
        }) 
       }  
  
       public obterDadosPagamentoCobranca(requestData:any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${OBTER_DADOS_PAGAMENTO_COBRANCA_ENDPOINT}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })
        }) 
       } 
       
       public obterEstadoCobranca(requestData:any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${OBTER_ESTADO_COBRANCA_ENDPOINT}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })
        }) 
       }  

       public atualizarCobranca(requestData:any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${ATUALIZAR_COBRANCA_ENDPOINT}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })
        }) 
       }  


}
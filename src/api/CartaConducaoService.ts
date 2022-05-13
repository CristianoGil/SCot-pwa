import { ApiUtils } from "./ApiUtils";
import type {AxiosError} from "axios";
import { OBTER_DADOS_CARTA_CONDUCAO} from "../utils/const";
import { CartaConducaoRequest, CartaConducaoResponse } from "../model/cartaconducao";

export class CartaConducaoService{
  private apiUtils = new ApiUtils();

    public obterDadosCartaConducao(requestData:CartaConducaoRequest): Promise<CartaConducaoResponse> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${OBTER_DADOS_CARTA_CONDUCAO}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })
        }) 
       }  
  


}
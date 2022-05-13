import { ApiUtils } from "./ApiUtils";
import type {AxiosError} from "axios";
import {SIBS_MULTIBANCO_ENDPOINT} from "../utils/const";

export class SibsService{
  private apiUtils = new ApiUtils();

    public multibanco(requestData:any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${SIBS_MULTIBANCO_ENDPOINT}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })
        }) 
       }  
  


}
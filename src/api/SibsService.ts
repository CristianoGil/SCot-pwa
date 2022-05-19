import { ApiUtils } from "./ApiUtils";
import type {AxiosError} from "axios";
import {SIBS_MULTIBANCO_ENDPOINT} from "../utils/const";
import { SibsRequest, SibsResponse } from "../model/sibs";

export class SibsService{
  private apiUtils = new ApiUtils();

    public multibanco(requestData:SibsRequest): Promise<SibsResponse> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${SIBS_MULTIBANCO_ENDPOINT}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })
        }) 
       }  
  


}
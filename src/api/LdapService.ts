import { ApiUtils } from "./ApiUtils";
import type {AxiosError} from "axios";
import { LDAP_AUTENTICA1_ENDPOINT, LDAP_AUTENTICA3_ENDPOINT, LDAP_AUTENTICA4_ENDPOINT} from "../utils/const";
import { LdapRequest, LdapAutentica1Response, LdapAutentica3Response, LdapAutentica4Response } from "../model/ldap";

export class LdapService{
  private apiUtils = new ApiUtils();

    public autentica_1(requestData:LdapRequest): Promise<LdapAutentica1Response> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${LDAP_AUTENTICA1_ENDPOINT}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })
        }) 
       }  
       public autentica_3(requestData:LdapRequest): Promise<LdapAutentica3Response> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${LDAP_AUTENTICA3_ENDPOINT}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })
        }) 
       } 

       public autentica_4(requestData:LdapRequest): Promise<LdapAutentica4Response> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${LDAP_AUTENTICA4_ENDPOINT}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })
        }) 
       } 
  


}
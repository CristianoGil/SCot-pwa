import { ApiUtils } from "./ApiUtils";
import type {AxiosError} from "axios";
import { CONSULTAR_DOCUMENTOS, DOCUMENTOS_APREENDIDOS_PREFIX} from "../utils/const";

export class DocumentoApreendido{
  private apiUtils = new ApiUtils();

    public consultaDocumentosApreendidos(requestData:any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${CONSULTAR_DOCUMENTOS}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })
        }) 
       }  

       public detalharDocumento(arg0:string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectGetAPI(`${DOCUMENTOS_APREENDIDOS_PREFIX}/${arg0}`).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })
        }) 
       }  
  


}
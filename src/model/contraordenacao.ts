import { IPerson } from "./person";

export interface IPesquisarPessoaRequest {
    "nif": number,
    "nome"?: string,
    "dataNascimento"?: Date,
    "idTipoDocumento"?: number,
    "numeroDocumento"?: string,
    "arruamento"?: string,
    "moradaZonaBairro"?: string,
    "loteNPolicia"?: string,
    "fraccao"?: string,
    "consultarWebService"?: boolean
}

export interface IPesquisarPessoaResponse {
    pessoa: IPerson
}
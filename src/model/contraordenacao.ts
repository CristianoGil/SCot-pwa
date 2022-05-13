import {IID_DESCRICAO} from "./extendable";
import {IPerson} from "./person";
import { IVeiculo } from "./veiculo";

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

export interface ICombosContraOrdenacaoPessoa {
    locaisEmissoes: IID_DESCRICAO[]
    documentosIdentificacoes: IID_DESCRICAO[]
    paises: IID_DESCRICAO[]
    titulosConducoes: IID_DESCRICAO[]
    entidadesEmissoras: IID_DESCRICAO[]
}


export interface IPesquisarVeiculoResponse {
    veiculo: IVeiculo
}

export interface ICombosAssinaturas {
    opcoesAssinaturas: IID_DESCRICAO[];
    opcoesAssinaturasQualificadas: IID_DESCRICAO[];
}

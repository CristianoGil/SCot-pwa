import {IID_DESCRICAO} from "./extendable";

export interface IPerson {
    id?: number
    nif : number
    nome: string 
    apelidos?: string 
    dataNascimento: Date 
    tipoPessoa: string 
    isCoimasEmAtraso: boolean 
    coimasEmAtraso: ICoimasEmAtraso[] 
    documentos: IDocumentoPessoa[] 
    historicoDocumentos: IDocumentoPessoa[] 
    moradas: IMoradaPessoa[] 
    historicoMoradas: IMoradaPessoa[] 
    representanteLegal: string 
    localNascimento?:string
}

export interface IPessoaResponse {
    msgQuantidaDeRegistro: string
    pessoas: IPerson[]
}

export interface IPessoaNIFResponse {
    pessoa: IPerson
}

export interface IPessoaRequest {
    nif: number
    nome?: string
    dataNascimento?: Date
    idTipoDocumento?: number
    numeroDocumento?: string
    arruamento?: string
    moradaZonaBairro?: string
    loteNPolicia?: string
    fraccao?: string
    consultarWebService?: boolean
}

export interface ICoimasEmAtraso {
    id?: number
    idVeiculo?: number
    idPessoa?: number | undefined
    data?: Date
    numeroAuto?: number
    codInfracao?: number
    valor?: number
    valorChecado?: boolean
    custas?: number
    custasChecada?: boolean
    total?: number
}

export interface IDocumentoPessoa {
    id?: number
    idPessoa?: number | undefined
    idOrganizacao?: number
    tipoDocumento?: ITipoDocumento
    isTituloConducao?: boolean
    numero?: string
    entidadeEmissao?: IEntidade
    paisEmissao?: IPais
    localEmissao?: IDestrito
    categoria?: string
    visualizado?: boolean
    principal?: boolean
    dataEmissao?: Date
    dataValidade?: Date
    dataEliminacao?: Date
}


export interface IDestrito extends IID_DESCRICAO {
}

export interface IPais extends IID_DESCRICAO {
}

export interface ITipoDocumento extends IID_DESCRICAO {
}

export interface IEntidade extends IID_DESCRICAO {
}

export interface IMoradaPessoa {
    id: number
    idPessoa: number
    idOrganizacao: number
    morada: string
    domicilioSede: string
    numeroPolicia: number
    local: IDestrito
    pais: IPais
    fracao: string
    localidade: string
    codigoPostal: number
    principal: boolean
    dataEliminacao: Date
}
 export interface pessoaAuthCredentials{
     username:string, password:string
 } 

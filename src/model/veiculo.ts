import type {IID_DESCRICAO} from "./extendable";

export interface IVeiculo {
    id: number
    matricula?: string
    chassi?: string
    ano?: number
    categoria?: ICategoriaVeiculo
    classe?: IClasseVeiculo
    tipo?: ITipoVeiculo
    subclasse?: ISubclasseVeiculo
    pais?: IPais
    marca?: IMarcaVeiculo
    modelo?: IModeloVeiculo
    cor?: ICorVeiculo
    estadoPolicial?: IEstadoPolicial
    isCoimasEmAtraso?: boolean
    coimasEmAtraso?: ICoimaVeiculo
    ipo?: boolean
}

export interface ICategoriaVeiculo extends IID_DESCRICAO {
}

export interface IClasseVeiculo extends IID_DESCRICAO {
}

export interface IClasseVeiculo extends IID_DESCRICAO {
}

export interface ITipoVeiculo extends IID_DESCRICAO {
}

export interface ISubclasseVeiculo extends IID_DESCRICAO {
}

export interface IPais extends IID_DESCRICAO {
}

export interface IMarcaVeiculo extends IID_DESCRICAO {
}

export interface IModeloVeiculo extends IID_DESCRICAO {
    idMarca: number
}

export interface ICorVeiculo extends IID_DESCRICAO {
}

export interface IEstadoPolicial extends IID_DESCRICAO {
}

export interface ICoimaVeiculo {
    id: number
    idVeiculo: number
    idPessoa: number
    data?: Date
    dataPrazo?: Date
    numeroAuto?: number
    codigoInfracao?: number
    valor?: number
    custas?: number
    valorChecado?: boolean
    custasChecada?: boolean
    isPago?: boolean
    sancaoAcessoria?: string

}

export interface IVeiculoRequest {
    matricula: string
    chassi?: string
    ano?: string
    categoria?: number
    classe?: number
    subclasse?: number
    tipo?: number
    marca?: number
    modelo?: number
    cor?: number
    pais?: number
}

export interface IVeiculoResponse {
    msgQuantidadeRegistro: string
    veiculos: IVeiculo[]
}

export interface ICombosVeiculoResponse {
    categorias?: ICategoriaVeiculo[]
    classes?: IClasseVeiculo[]
    subclasses?: ISubclasseVeiculo[]
    tipos?: ITipoVeiculo[]
    marcas?: IMarcaVeiculo[]
    modelos?: IModeloVeiculo[]
    cores?: ICorVeiculo[]
    paises?: IPais[]
}
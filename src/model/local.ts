import { IAnexosEletronicos } from "./anexoElectronico";
import { IID_DESCRICAO } from "./extendable";

export interface ICombosLocal {
    tipos: ITipoLocal[],
    tiposArruamento: ITipoArruamento[],
    subtipos: ISubtipo[],
    paises: IPais[],
    distritos: IDistrito[],
    concelhos: IConcelho[],
    localidades: ILocalidade[],
    freguesias: IFreguesia[]
}

export interface ITipoLocal extends IID_DESCRICAO {

}

export interface ISubtipo extends IID_DESCRICAO {
    idTipoLocal: number
}

export interface ITipoArruamento extends IID_DESCRICAO {

}

export interface IPais extends IID_DESCRICAO {

}

export interface IDistrito extends IID_DESCRICAO {

}

export interface IConcelho extends IID_DESCRICAO {
    idDistrito: number,
    idComarca: number
}

export interface IFreguesia extends IID_DESCRICAO {
    idConcelho: number
}

export interface ILocalidade extends IID_DESCRICAO {
    idFreguesia: number,
}

export interface ILocal {
    id: string | null;
    tipo: ITipoLocal | null;
    tipoArruamento: ITipoArruamento | null,
    subtipo: ISubtipo | null;
    designacao: string | null;
    pais: IPais | null;
    distrito: IDistrito | null;
    concelho: IConcelho | null;
    freguesia: IFreguesia | null;
    localidade: ILocalidade | null;
    arruamento: string | null;
    numeroPolicia: string | null;
    zonaBairro: string | null;
    observacoes: string | null;
    anexosEletronicos: IAnexosEletronicos | null;
}

import { IPesquisarPessoaRequest } from "./contraordenacao";
import { IID_DESCRICAO } from "./extendable";
import { ILocal } from "./local";
import { IVeiculo } from "./veiculo";


export interface ICombosAlcool {

    marcaModelo: IID_DESCRICAO[],
    serie: IID_DESCRICAO[],
    tipoVerificacao: IID_DESCRICAO[],
    marcaModeloContraProva: IID_DESCRICAO[],
    serieContraProva: IID_DESCRICAO[],
    tipoVerificacaoContraProva: IID_DESCRICAO[]

}

export interface IAlcool {
    id: number | null,
    dataHora: string | null,
    isPunivelTas: boolean | null,
    tipoTeste: string | null,
    marcaModelo: IID_DESCRICAO | null,
    serie: IID_DESCRICAO | null,
    tipoVerificacao: IID_DESCRICAO | null,
    numero: string | null,
    dataVerificacao: string | null,
    numeroTalao: string | null,
    valorRegistado: string | null,
    valorApurado: string | null,

    //contraprova
    contraProva: string | null, //naopretende, arexpirado, analisesangue
    marcaModeloContraProva: IID_DESCRICAO | null,
    serieContraProva: IID_DESCRICAO | null,
    tipoVerificacaoContraProva: IID_DESCRICAO | null,
    numeroContraProva: string | null,
    dataVerificacaoContraProva: string | null,
    numeroTalaoContraProva: string | null,
    valorRegistadoContraProva: string | null,
    valorApuradoContraProva: string | null,
}

export interface IAlcoolemia {
    id: number | null,
    alcool: IAlcool | null,
    veiculo: IVeiculo | null;
    arguido: IPesquisarPessoaRequest | null;
    localInfracao: ILocal | null;
    isEmitida: boolean | null;
    hasContraOrdenacao: boolean | null;
    contraordenacaoId: number | null;
    numeroDocumento: string | null
}

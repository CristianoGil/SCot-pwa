import { IEntidade } from "./person";

export interface IInfracaoAdicional {
    id: number;
    entidade: IEntidade;
    descricao: string;
}

export interface IInfracao {
    dataInfracao: any,
    numeroAuto: any,
    numeroTalao: any,

    
    isPresenciadaAutuante: any,
    isConduzidoArguido: boolean ,
    nomeAutuante: any,
    localInfracao: any,
    infracao: any,


    comando: any, //Unidade
    comarca: any, //distrito ou concelho
    entidade: any,
    divisao: any,
    esquadra: any,
    destacamento: any,
    subDestacamento: any,


}
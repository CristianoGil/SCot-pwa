import { IEntidade } from "./person";

export interface IInfracaoAdicional {
    id: number;
    entidade: IEntidade;
    descricao: string;
}

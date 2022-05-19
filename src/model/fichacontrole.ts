export interface FichaControleRequest {
    arg0: number;
    arg1: Arg1[];
  }
  
  export interface Arg1 {
    anfetaminas: number;
    canabis: number;
    circunstanciaAlcool: number;
    circunstanciaEstupefacientes: number;
    cocaina: number;
    concelho: number;
    data: string;
    dataAtualizacao: string;
    distrito: number;
    idUtilizador: string;
    idade: number;
    matricula: number;
    metanfetaminas: number;
    numDocumento: string;
    opio: number;
    qualidade: number;
    recusaAlcool: number;
    recusaEstupefacientes: number;
    sexo: number;
    taxaAlcool: number;
    taxaAlcoolContra: number;
    tipoLocal: number;
    tipoVeiculo: number;
    tipoVia: number;
    via: string;
  }

  export interface FichaControleResponse {
    errorMessage: string;
    resultado: boolean;
  }
  
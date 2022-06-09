export interface FichaControleRequest {
    arg0: number;
    arg1: Arg1[];
  }
  
  export interface Arg1 {
    anfetaminas?: number | undefined | string;
    canabis?: number | undefined | string;
    circunstanciaAlcool?: number | undefined | string;
    circunstanciaEstupefacientes?: number | undefined | string;
    cocaina?: number | undefined | string;
    concelho?: number | undefined | string;
    data?: number | undefined | string;
    dataAtualizacao?: number | undefined | string;
    distrito?: number | undefined | string;
    idUtilizador?: number | undefined | string;
    idade?: number | undefined | string;
    matricula?: number | undefined | string;
    metanfetaminas?: number | undefined | string;
    numDocumento?: number | undefined | string;
    opio?: number | undefined | string;
    qualidade?: number | undefined | string;
    recusaAlcool?: number | undefined | string;
    recusaEstupefacientes?: number | undefined | string;
    sexo?: number | undefined | string;
    taxaAlcool?: number | undefined | string;
    taxaAlcoolContra?: number | undefined | string;
    tipoLocal: number | undefined | string;
    tipoVeiculo?: number | undefined | string;
    tipoVia?: number | undefined | string;
    via?: number | undefined | string;
  }

  export interface FichaControleResponse {
    errorMessage: string;
    resultado: boolean;
  }
  
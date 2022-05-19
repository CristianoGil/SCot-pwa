export interface PagamentoTpaRequest{
    anonpp: number;
    dataOperacao: string;
    entidade: number;
    matricula: string;
    meioPagamento: number;
    modoPagamento: number;
    montante: number;
    npp: number;
    pagamentoManual: string;
    referencia: number;
    tipoPagamento: number;
    tpaId: string;

}

export interface PagamentoTpaResponse{
    errorMessage: string;
    resultado: boolean;
}


export interface PagamentosPesquisarCoimasEmAtrasoRequest {
    numDocumento: string;
    tipoDocumento: number;
    forca: number;
  }

  export interface PagamentosPesquisarCoimasEmAtrasoResponse {
    coimasListSiga: CoimasListSiga[];
    dtOperacao: string;
    entidade: number;
    errorCode: string;
    errorMessage: string;
    idBanco: number;
    idTerminal: number;
    idutilizador: string;
    meioPagamento: number;
    modoPagamento: number;
    nome: string;
    numCheque: string;
    numCo: string;
    referencia: number;
    resultado: boolean;
    sansaoAce: string;
    total: number;
  }

interface CoimasListSiga {
    auto: string;
    codInfr: string;
    data: string;
    valor: number;
  }

  export interface PagamentoAtrasoRequest {
    auto: string;
    codInfr: string;
    data: string;
    valor: number;
    dtOperacao: string;
    entidade: number;
    errorCode: string;
    errorMessage: string;
    forca: number;
    idBanco: number;
    idTerminal: number;
    idutilizador: string;
    meioPagamento: number;
    modoPagamento: number;
    nome: string;
    numCheque: string;
    numCo: string;
    numDocumento: string;
    referencia: number;
    resultado: boolean;
    sansaoAce: string;
    tipoDocumento: number;
    total: number;
  }

  export interface PagamentoAtrasoResponse {
    errorMessage: string;
    resultado: boolean;
  }

  export interface CommonResponse2Args{
    errorMessage: string;
    resultado: boolean;
  }
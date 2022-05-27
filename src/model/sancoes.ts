export interface SancoesRequest {
    countryId: string;
    entityCode: string;
    entityType: string;
    forca: string;
    idUtilizador: string;
    numeroDocumento: string;
    tipoDocumento: string;
  }

  export interface SancoesResponse {
    cartaEntregue: string;
    codigoAuto: string;
    codigoProcesso: string;
    dataFimCump: string;
    dataIniCump: string;
    dataLimiteEntrega: string;
    juizo: string;
    nome: string;
    totalDiasInibicao: string;
    tribunal: string;
  }

  export interface SancoesResponseList {
    acessoriasResponses:SancoesResponse[]
  }


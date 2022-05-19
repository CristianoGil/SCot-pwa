export interface DepositoRequest {
    forca: string;
    idUtilizador: string;
    numDocumento: string;
    tipoDocumento: string;
  }


  export interface DepositoResponse {
    depositosNaoPagos: DepositosNaoPago[];
    errorMessage: string;
    resultado: boolean;
  }

  interface DepositosNaoPago {
    ano: string;
    descritivo: string;
    inSIGA: string;
    infratorId: number;
    infratorNome: string;
    infratorTipo: number;
    numeroAuto: string;
    numeroProcesso: string;
    procId: string;
    tipoId: string;
    unidadeOrganica: string;
  }
  
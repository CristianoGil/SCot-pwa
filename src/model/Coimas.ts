

  export interface PesquisarCoimasEmAtrasoVoluntRequest {
    companyId: string;
    userId: string;
    password: string;
    docType: string;
    docId: string;
    sibs: string;
    entId: string;
    valPag: string;
    countryId: string;
  }

  
  export interface PesquisarCoimasEmAtrasoVoluntResponse {
    errorCode: string;
    errorDesc: string;
    name: string;
    nrOcurrs: string;
    occurs: Occur[];
  }
  
  export interface Occur {
    debtValue: string;
    infrctCod: string;
    lawsuitCod: string;
    notifDate: string;
  }
  export interface ICoima {
    id: number | null;
    idPessoa: number | null;
    idVeiculo: number | null;
    data: string | null;
    dataPrazo: string | null;
    numeroAuto: string | null;
    codigoInfracao: string | null;
    valor: number | null;
    custas: number | null;
    total: number | null;
    valorChecado: boolean | null;
    custasChecada: boolean | null;
    isPago: boolean | null;
    sancaoAcessoria: string | null;
  }

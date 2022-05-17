

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
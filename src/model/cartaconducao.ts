export interface CartaConducaoRequest {
    idSistema: number;
    codPaisNIF: string;
    numNIF: string;
    idTipoDocumento: number;
    codPaisDocumento: string;
    numDocumento: string;
    flObterImagensExterno: string;
  }
 export  interface CartaConducaoResponse {
    apelidos: string;
    nomesProprios: string;
    localNascimento: string;
    dataNascimento: string;
    dataEmissao: string;
    entidadeEmissora: string;
    numeroCarta: string;
    digitoControloNumCarta: string;
    digitoControloNumControlo: string;
    categoria: Categoria2;
    dscSituacao: string;
    codRetorno: string;
    msgRetorno: string;
  }
  
  export interface Categoria2 {
    categoria: Categoria[];
  }
  
  export interface Categoria {
    codCategoria: string;
    dscCategoria: string;
    dataInicio: string;
    dataValidade: string;
    restricoes: Restricoes;
  }
  
 export  interface Restricoes {
    restricao: Restricao[];
  }
  
 export  interface Restricao {
    codRestricao: string;
    dscRestricao: string;
    txAnotacao: string;
  }
export interface ObterEstadoCobrancaRequest {
    pesquisa: Pesquisa[];
}

export interface Pesquisa {
    tipoEntidadeAutuante: string;
    codigoEntidadeAutuante: string;
    referenciaPagamento: string;
    numDocumentoPagamento: string;
    referenciaLote: string;
}


export interface ObterEstadoCobrancaResponse {
    codigo: number;
    mensagem: string;
    dadosEstadoCobranca: DadosEstadoCobranca[];
}

interface DadosEstadoCobranca {
    codigo: number;
    mensagem: string;
    referenciaPagamento: string;
    numDocumentoPagamento: string;
    referenciaLote: string;
    codigoEstado: string;
    descricaoEstado: string;
    dataEstado: string;
}



export interface ObterDadosPagamentoCobrancaRequest {
    tipoEntidadeAutuante: string;
    codigoEntidadeAutuante: string;
    referenciaLote: string;
    referenciaPagamentoAtual: string;
    data: string;
    valorTotal: number;
    detalheCobranca: DetalheCobranca[];
    indReemissao: string;
    indPagamentoEntAutuante: string;
}

interface DetalheCobranca {
    numDocumentoPagamento: string;
    dataCobranca: string;
    valorCobranca: number;
}


export interface ObterDadosPagamentoCobrancaResponse {
    codigo: number;
    mensagem: string;
    referenciaPagamento: string;
    referenciaCodigoBarras: string;
    dataEmissao: string;
    dataLimite: string;

}




export interface AtualizarCobrancaRequest {
    estadoCobranca: EstadoCobranca[];
}

interface EstadoCobranca {
    referenciaPagamento: string;
    numAuto: string;
    idGuia: number;
    codigoEstado: string;
    dataEstado: string;
    motivo: string;
}


export interface AtualizarCobrancaResponse {
    codigo: number;
    mensagem: string;
    listaRespostaDetalhada: ListaRespostaDetalhada[];

}
interface ListaRespostaDetalhada {
    referenciaPagamento: string;
    numAuto: string;
    idGuia: number;
    codigo: number;
    mensagem: string;
}


export interface AnularCobrancaRequest {
    indPagamentoEntAutuante: string;
    tipoEntidadeAutuante: string;
    codigoEntidadeAutuante: string;
    referenciaLote: string;
    referenciaPagamentoAtual: string;
    data: string;
    valorTotal: number;
    detalheCobranca: DetalheCobranca[];
  }
  

  export interface AnularCobrancaResponse {
    codigo: number;
    mensagem: string;
    codigoEstado: string;
    descricaoEstado: string;
    dataEstado: string;
  }
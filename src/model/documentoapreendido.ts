export interface DocumentoApreendidoRequest {
    entidade: string;
    nomeUtilizador: string;
    sistema: string;
    utilizador: string;
    designacao: string;
    numeroDocumento: string;
    paisDocumento: string;
    tipoDocumento: number;
    tipoContribuinte: number;
  }

  export interface DocumentoApreendidoResponse{
        indActivo: string;
        idItem: number;
        descTipo: string;
        textoLocal: string;
  }

  export interface DetalheDocumentResponse {
    historico: string[];
    identidade: number;
    descEntidade: string;
    idUnidade: number;
    morada: string;
    descCodigoPostal: string;
    descHorarioAtend: string;
  }
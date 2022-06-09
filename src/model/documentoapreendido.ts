import { IPesquisarPessoaRequest } from "./contraordenacao";
import { IID_DESCRICAO } from "./extendable";
import { ILocal } from "./local";
import { IVeiculo } from "./veiculo";

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

 export interface CarregarCombosApreensaoDocumento {
    motivosApreensao: MotivosApreensao[];
    documentosDadosApreensao: MotivosApreensao[];
    pagamentoIntegralAcoesAssociadas: MotivosApreensao[];
    entidadeAcoesAssociadas: MotivosApreensao[];
  }
  
  export interface MotivosApreensao {
    id: number;
    descricao: string;
  }


export interface IComboApreensaoDocumento {
    id: number | null,
    documento: IID_DESCRICAO | null,
    numero: string | null
}

export interface ISubstituicaoDocumento {
    id?: number | null;
    legislacaoAssociada?: IID_DESCRICAO | null;
    numeroGuiaSubstituicaoDocumento?: string | null;

    //certificado de matricula
    substituirVeiculo: boolean | null;
    numeroSubstituicaoDocumento: string | null;
    tipoDocumento: IID_DESCRICAO | null;
    numeroDocumento: string | null;
    numeroChassi: string | null;
    combustivel: IID_DESCRICAO | null;
    pesoBruto: string | null;
    taxa: string | null;
    lotacao: string | null;
    cilindrada: string | null;
    pneumaticaFrente: string | null;
    pneumaticaRetaguarda: string | null;
    dataValidadeGuiaVeiculo: string | null;
    localValidadeGuiaVeiculo: string | null;

    //titulo conducao
    substituirTituloConducao: boolean | null;
    documento: IID_DESCRICAO | null;
    dataEmissao: string | null;
    grupo2: boolean | null;
    categorias?: IID_DESCRICAO[] | null;
    dataValidadeGuiaTituloConducao: string | null;
    localValidadeGuiaTituloConducao: string | null;
    observacoes: string | null;

}

export interface IApreensaoDocumento {
    id?: number | null;
    motivosApreensao?: IID_DESCRICAO[] | null;
    apreensaoSancaoAcessoria?: boolean | null;
    numeroApreensaoDocumentos?: string | null;
    dadosApreensaoDocumento?: IComboApreensaoDocumento[] | null;
    localApresentacao?: string | null;
    localRegularizacao?: string | null;
    localLevantarDocumentos?: string | null;
    documentoPagamentoIntegral?: IID_DESCRICAO | null;
    localCamaraMunicipal?: IID_DESCRICAO | null;
    localLevantarTituloConducao?: string | null;
    documentoPagamentoIntegralTituloConducao?: IID_DESCRICAO | null;
    localCamaraMunicipalTituloConducao?: IID_DESCRICAO | null;
    conducaoVeiculoArtigo?: string | null;
    numeroDocumento?: string | null;
}


export interface IApreensaoDocumentoIsolado {

    id: number | null;
    isTerminada: boolean | null;
    semVeiculo: boolean | null;
    veiculo: IVeiculo | null;
    arguido: IPesquisarPessoaRequest | null;
    dataInfracao: string | null;
    numeroAuto: string | null;
    numeroTalao: string | null;
    isConduzidoArguido: boolean | null;
    nomeAutuante: string | null;
    localInfracao: ILocal | null;

    comando: IID_DESCRICAO | null; //Unidade
    comarca: IID_DESCRICAO | null; //distrito ou concelho
    entidade: IID_DESCRICAO | null;
    divisao: IID_DESCRICAO | null;
    esquadra: IID_DESCRICAO | null;
    destacamento: IID_DESCRICAO | null;
    subDestacamento: IID_DESCRICAO | null;

    //dados complementares
    arguidoOuCondutorAssinouNotificacao: boolean | null
    proprietario: string | null; //arguido, condutor, outro
    refArquivo: string | null;
    apreensaoDocumento: IApreensaoDocumento | null;
    substituicaoDocumento: ISubstituicaoDocumento | null;


}

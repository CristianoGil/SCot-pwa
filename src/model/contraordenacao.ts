import {IAlcoolemia} from "./alcoolemia";
import {IApreensaoVeiculo, IBloqueamentoRemocaoVeiculo} from "./apreensaoVeiculo";
import {IApresentacaoDocumento} from "./apresentacaoDocumento";
import {IApreensaoDocumento, ISubstituicaoDocumento} from "./documentoapreendido";
import {IID_DESCRICAO} from "./extendable";
import {IInfracaoAdicional} from "./infracaoAdicional";
import {ILocal} from "./local";
import {IPagamento} from "./pagamento";
import {IPerson} from "./person";
import {IVeiculo} from "./veiculo";

export interface IPesquisarPessoaRequest {
    "nif": number,
    "nome"?: string,
    "dataNascimento"?: Date,
    "idTipoDocumento"?: number,
    "numeroDocumento"?: string,
    "arruamento"?: string,
    "moradaZonaBairro"?: string,
    "loteNPolicia"?: string,
    "fraccao"?: string,
    "consultarWebService"?: boolean
}

export interface IPesquisarPessoaResponse {
    pessoa: IPerson
}

export interface ICombosContraOrdenacaoPessoa {
    locaisEmissoes: IID_DESCRICAO[]
    documentosIdentificacoes: IID_DESCRICAO[]
    paises: IID_DESCRICAO[]
    titulosConducoes: IID_DESCRICAO[]
    entidadesEmissoras: IID_DESCRICAO[]
}


export interface IPesquisarVeiculoResponse {
    veiculo: IVeiculo
}

export interface ITipificacao extends IID_DESCRICAO {
}


//infracao = subtipificacao
export interface IInfraccao {
    id?: number | null;
    descricao?: string | null;
    codigoDgv: string | null;
    tipificacao: ITipificacao | null;
    normaInfringida: string | null;
    descricaoSumaria: string | null;
    montanteDaCoimaMaxima: string | null;
    montanteDaCoimaMinima: string | null;
    normaQuePreveContraOrdenacao: string | null;
    sancaoAcessoria: string | null;
    normaQuePreveSancaoAcessoria: string | null;
    observacoes: string | null;
    recaiSobreProprietario?: boolean | null;
    valorAberto?: number | null;
}

export interface ICombosAssinaturas {
    opcoesAssinaturas: IID_DESCRICAO[];
    opcoesAssinaturasQualificadas: IID_DESCRICAO[];
}


export interface ICoDirecta {
    id?: number | null;
    localId?: any;
    tipoContraordenacao: string | null;
    isTerminada: boolean | null;
    isEmitida: boolean | null;
    montanteDaCoimaEscolhido: string | null;
    possuiElementoIdentificacaoArguido: boolean | null;
    semVeiculo: boolean | null;
    veiculo: IVeiculo | null;
    arguido: IPerson | null;
    condutor: IPerson | null;
    dataInfracao: string | null;
    numeroAuto: string | null;
    numeroTalao: string | null;
    isPresenciadaAutuante: boolean | null;
    isConduzidoArguido: boolean | null;
    nomeAutuante: string | null;
    localInfracao: ILocal | null;
    infracao: IInfraccao | null;


    comando: IID_DESCRICAO | null; //Unidade
    comarca: IID_DESCRICAO | null; //distrito ou concelho
    entidade: IID_DESCRICAO | null;
    divisao: IID_DESCRICAO | null;
    esquadra: IID_DESCRICAO | null;
    destacamento: IID_DESCRICAO | null;
    subDestacamento: IID_DESCRICAO | null;

    //dados complementares
    proprietario: string | null; //arguido, condutor, outro
    refArquivo: string | null;
    pagamento: IPagamento | null;
    apreensaoDocumento: IApreensaoDocumento | null;
    apreensaoVeiculo: IApreensaoVeiculo | null;
    bloqueamentoRemocaoVeiculo: IBloqueamentoRemocaoVeiculo | null;
    substituicaoDocumento: ISubstituicaoDocumento | null;
    apresentacaoDocumento: IApresentacaoDocumento | null;
    infracoesAdicionais: IInfracaoAdicional[] | null;

    //alcool
    alcoolemia: IAlcoolemia | null;

    //assinatura agente
    tipoAssinaturaOpcaoAgente: IID_DESCRICAO | null;
    tipoAssinaturaFormatoAgente: IID_DESCRICAO | null;
    chaveMovelAgente: string | null;
    base64AssinaturaManuscritoAgente: string | null;
    //assinatura arguido
    arguidoNaoAssinouNotificacao: boolean | null;
    tipoAssinaturaOpcaoArguido: IID_DESCRICAO | null;
    tipoAssinaturaFormatoArguido: IID_DESCRICAO | null;
    chaveMovelArguido: string | null;
    base64AssinaturaManuscritoArguido: string | null;
    //assinatura condutor
    condutorNaoAssinouNotificacao: boolean | null;
    tipoAssinaturaOpcaoCondutor: IID_DESCRICAO | null;
    tipoAssinaturaFormatoCondutor: IID_DESCRICAO | null;
    chaveMovelCondutor: string | null;
    base64AssinaturaManuscritoCondutor: string | null;
    //assinatura testemunha 1
    tipoAssinaturaOpcaoTestemunha1: IID_DESCRICAO | null;
    tipoAssinaturaFormatoTestemunha1: IID_DESCRICAO | null;
    chaveMovelTestemunha1: string | null;
    base64AssinaturaManuscritoTestemunha1: string | null;
    //assinatura testemunha 2
    tipoAssinaturaOpcaoTestemunha2: IID_DESCRICAO | null;
    tipoAssinaturaFormatoTestemunha2: IID_DESCRICAO | null;
    chaveMovelTestemunha2: string | null;
    base64AssinaturaManuscritoTestemunha2: string | null;

    base64Assinatura: string | null;
}

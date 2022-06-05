import { IPesquisarPessoaRequest } from "./contraordenacao";
import { IID_DESCRICAO } from "./extendable";
import { ILocal } from "./local";
import { IVeiculo } from "./veiculo";


export interface IBloqueamentoRemocaoVeiculo {
    id: number | null;
    houveBloqueamento: boolean | null;
    houveRemocao: boolean | null;
    numeroBloqueamentoRemocaoVeiculo: string | null;
    legislacaoAssociada: IID_DESCRICAO | null;
    legislacaoAssociadaRemocao: IID_DESCRICAO | null;
    dataHora: string | null;
    localDestino: string | null;
    motivoNaoRemocao: string | null;
    meioPagamento: IID_DESCRICAO | null;
    numeroCheque: string | null;
    bancoEmissor: IID_DESCRICAO | null;
    valorBloqueamento: string | null;
    valorRemocao: string | null;
    valorTotal: string | null;
    numeroNotaCobranca: string | null;
}

export interface IApreensaoVeiculo {
    id?: number | null;
    motivosApreensao: IID_DESCRICAO[] | null;

    //fiel depositario
    tipoFielDepositario: string | null;
    numeroApreensaoVeiculo: string | null;
    nomeFielDepositario: string | null;
    moradaFielDepositario: string | null;
    documentoFielDepositario: IID_DESCRICAO | null;
    numeroFielDepositario: string | null;

    //dados apreensao veiculo
    dadosApreensaoKm: string | null;
    dadosApreensaoLocalDeposito: string | null;

    //acoes associadas
    documentoVeiculoNaoFoiApreendidoEmVirtude: string | null;
    documentoApreensao: IID_DESCRICAO | null;
    numeroDocumentoApreensao: string | null;
    arguidoPoderaLevantarDocumentoNoServicoIMTT: IID_DESCRICAO | null;
    foiPassadoAvisoApreensaoDocumentos: boolean | null;
    dataEfeitoApreensaoVeiculo: string | null;

}

export interface IApreensaoVeiculoIsolado {
    id: number | null;
    isTerminada: boolean | null;
    semVeiculo: boolean | null;
    veiculo: IVeiculo | null;
    condutor: IPesquisarPessoaRequest | null;
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
    apreensaoVeiculo: IApreensaoVeiculo | null;
    bloqueamentoRemocaoVeiculo: IBloqueamentoRemocaoVeiculo | null;
}

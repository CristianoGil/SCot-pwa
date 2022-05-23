import {IInfraccao, IPesquisarPessoaRequest } from "./contraordenacao";
import { IID_DESCRICAO } from "./extendable";
import { ILocal } from "./local";
import { IVeiculo } from "./veiculo";


export interface IApresentacaoDocumento {
  id: number | null;
  numeroApresentacaoDocumentos: string | null;
  tituloConducao: boolean | null;
  certificadoMatricula: boolean | null;
  inspeccaoVeiculo: boolean | null;
  certificadoSeguro: boolean | null;
  bilheteIdentidade: boolean | null;
  cartaoCidadao: boolean | null;
  passaporte: boolean | null;
  tituloResidencia: boolean | null;
  outros: string | null;
  localApresentacao: string | null;
  numeroProcessoLocalApresentacao: string | null;
  emailLocalApresentacao: string | null;
  nomeProprietario: string | null;
  moradaProprietario: string | null;
  documentoProprietario: IID_DESCRICAO | null;
  numeroProprietario: string | null;
  numeroDocumento: string | null;
}

export interface IApresentacaoDocumentoIsolado {
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
  apresentacaoDocumento: IApresentacaoDocumento | null;
}

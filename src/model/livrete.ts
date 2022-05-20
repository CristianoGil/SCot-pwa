export interface LivreteRequest {
    idSistema: number;
    matricula: string;
    numQuadro: string;
  }

  export interface LivreteResponse {
    codRetorno: string;
    msgRetorno: string;
    b1MatriculaAnterior: string;
    d1Marca: string;
    d2Modelo: string;
    d2Variante: string;
    d2Versao: string;
    d3ModeloComercial: string;
    f1PesoBruto: string;
    f2PesoBrutoTotal: string;
    f3PesoBrutoConjunto: string;
    k1NumHomologacaoNacional: string;
    p1Cilindrada: string;
    p2PotenciaEfetiva: string;
    p3TipoCombustivel: string;
    p4PotenciaRpm: string;
    s1NumLugares: string;
    s2LotacaoEmPe: string;
    j1CategoriaNacional: string;
    j2Tipo: string;
    j3TipoCaixa: string;
    o1PesoBrutoRebComTravao: string;
    o2PesoBrutoRebSemTravao: string;
    u1NivelSonoroEstacionario: string;
    u2NivelSonoroRpm: string;
    v1EmissoesCoTipoi: string;
    v5EmissaoParticulas: string;
    v7Co2Combinado: string;
    x1MedidaPneusFrente: string;
    x2MedidaPneusRetaguarda: string;
    z1ComprimentoCaixa: string;
    z2PoderElevacao: string;
    z3AnotacoesEspeciais: string;
    dscSituacao: string;
    dscMotivo: string;
    amatricula: string;
    adigitoMatricula: string;
    bdtPrimeiraMatricula: string;
    enumQuadro: string;
    gtaraTotal: string;
    hdtValidade: string;
    idtMatricula: string;
    knrHomologacaoCe: string;
    qfracaoPotefetivaTaratotal: string;
    jcategoriaCe: string;
    mdistanciaEntreEixos: string;
    npesoMaxAdmimissivel1: string;
    npesoMaxAdmimissivel2: string;
    npesoMaxAdmimissivel3: string;
    npesoMaxAdmimissivel4: string;
    npesoMaxAdmimissivel5: string;
    rcores: string;
  }
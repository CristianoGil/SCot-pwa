export const URL_API_SCOT = "http://localhost:8081/scot-plus-bff";
export const URL_API_SCOT_SIGNATURE = 'https://e2d5dbff-3214-48af-8723-08f30182335c.mock.pstmn.io/signpdf';
export const AXIOS_TIMEOUT = 3000;
export const AUTH_LOCALSTORAGE = 'AUTH_USER';
export const URL_AUTH_AUTHENTICATION_TOKEN = [URL_API_SCOT];
export const LOAD_COMBOS_PATH = [
    'alcoolemia/carregarCombosAlcool',
    'contraOrdenacao/carregarCombosPessoa',
    'contraOrdenacao/carregarCombosPagamento',
    'contraOrdenacao/carregarCombosApreensaoDocumentos',
    'contraOrdenacao/carregarCombosApreensaoVeiculos',
    'contraOrdenacao/carregarCombosVeiculo',
    'contraOrdenacao/carregarCombosUnidade',
    'contraOrdenacao/carregarCombosInfracao',
    'contraOrdenacao/carregarCombosVeiculo',
    'contraOrdenacao/carregarCombosAutoBloqueamentoRemocaoVeiculos',
    'documentos/carregarCombosDocumento',
    'locais/carregarCombosLocal',
    'organizacoes/carregarCombosOrganizacoes',
    'veiculos/carregarCombosVeiculo'
];  

export const COIMAS_PREFIX='v1/coimas'
export const PESQUISAR_COIMAS_EM_ATRASO_ENDPOINT= `${COIMAS_PREFIX}/pesquisarCoimasEmAtraso`
export const PESQUISAR_COIMAS_VOLUNT_EM_ATRASO_ENDPOINT=`${COIMAS_PREFIX}/pesquisarCoimasVoluntEmAtraso`

export const CARTA_CONDUCAO_PREFIX='v1/cartaconducao'
export const OBTER_DADOS_CARTA_CONDUCAO=`${CARTA_CONDUCAO_PREFIX}/obterInformacao`

export const DOCUMENTOS_APREENDIDOS_PREFIX='v1/documentosapreendidos'
export const CONSULTAR_DOCUMENTOS=`${DOCUMENTOS_APREENDIDOS_PREFIX}/obterInformacao`

export const FICHA_CONTROLES_PREFIX='v1/fichactrl'

export const SANCOES_PREFIX='v1/pesquisaSancoesAcessorias'

export const LIVRETE_PREFIX='v1/consultainfolivrete'



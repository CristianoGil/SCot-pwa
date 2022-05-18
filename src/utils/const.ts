export const URL_API_SCOT = "http://localhost:8081/scot-plus-bff";
export const URL_ASSINATURAS = {
    CC: 'http://localhost:8081/LoadSCOT', // Cartao do cidadao
    CEGER: 'http://localhost:8081/LoadCeger', //Cartao CEGER
    CMD: 'http://localhost:8081/LoadCMD' // cartao movel digital
}
export const URL_API_SCOT_SIGNATURE = 'https://e2d5dbff-3214-48af-8723-08f30182335c.mock.pstmn.io/signpdf';
export const AXIOS_TIMEOUT = 3000;
export const AUTH_LOCALSTORAGE = 'AUTH_USER';
export const AUTH_AUTHENTICATION_TOKEN = [URL_API_SCOT];
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
    'contraOrdenacao/getCombosAssinaturas',
    'documentos/carregarCombosDocumento',
    'locais/carregarCombosLocal',
    'organizacoes/carregarCombosOrganizacoes',
    'veiculos/carregarCombosVeiculo'
];  

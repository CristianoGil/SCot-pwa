export const URL_API_SCOT = "http://localhost:8081/scot-plus-bff";
// export const URL_API_SCOT = "http://10.0.30.90:8080/scot-plus-bff";
export const URL_ASSINATURAS = {
    CC: 'http://localhost:8081/LoadSCOT', // Cartao do cidadao
    CEGER: 'http://localhost:8081/LoadCeger', //Cartao CEGER
    CMD: 'http://localhost:8081/LoadCMD' // cartao movel digital
}
export const URL_API_SCOT_SIGNATURE = 'https://e2d5dbff-3214-48af-8723-08f30182335c.mock.pstmn.io/signpdf';
export const AXIOS_TIMEOUT = 30000;
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

export const VEICULOS_SEMELHANTES='v1/veiculos/pesquisarVeiculo'
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


export const COBRANCA_PREFIX='v1/cobranca'
export const ANULAR_COBRANCA_ENDPOINT=`${COBRANCA_PREFIX}/anularCobranca`
export const OBTER_DADOS_PAGAMENTO_COBRANCA_ENDPOINT=`${COBRANCA_PREFIX}/obterDadosPagamentoCobranca`
export const OBTER_ESTADO_COBRANCA_ENDPOINT=`${COBRANCA_PREFIX}/obterEstadoCobranca`
export const ATUALIZAR_COBRANCA_ENDPOINT=`${COBRANCA_PREFIX}/atualizarCobranca`


export const PAGAMENTO_PREFIX='v1/pagamento'
export const PAGAMENTO_EM_ATRASO_ENDPOINT=`${PAGAMENTO_PREFIX}/atraso`
export const PAGAMENTO_PESQUISAR_COIMAS_EM_ATRASO_ENDPOINT=`${PAGAMENTO_PREFIX}/pesquisarCoimasEmAtraso`
export const PAGAMENTO_TPA_ENDPOINT=`${PAGAMENTO_PREFIX}/tpa`


export const SIBS_PREFIX='v1/sibs'
export const SIBS_MULTIBANCO_ENDPOINT=`${SIBS_PREFIX}/multibanco`


export const DEPOSITO48HRS_PREFIX='v1/depositos48hrs'
export const PESQUISAR_DEPOSITOS_EM_ATRASO_ENDPOINT=`${DEPOSITO48HRS_PREFIX}/pesquisarAtraso`

export const LDAP_PREFIX='v1/ldap'
export const LDAP_AUTENTICA1_ENDPOINT=`${LDAP_PREFIX}/autentica`
export const LDAP_AUTENTICA3_ENDPOINT=`${LDAP_PREFIX}/autentica3`
export const LDAP_AUTENTICA4_ENDPOINT=`${LDAP_PREFIX}/autentica4`




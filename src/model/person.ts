export interface IPerson {
    id: number
    nif: number
    dt_nascimento: Date
}

interface IDocument {
    id: number
    id_pessoa: number
    tipo: string
    numero: number
    entidade: string
    local_emissao: string
    dt_emissao: string
    dt_validade: Date
    categoria: string
    visualizado: number
    principal: number
    dt_eliminacao: Date
}

interface IMorada {
    id: number
    id_pessoa: number
    principal: number
    dt_eliminacao: Date
}
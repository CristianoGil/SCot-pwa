export interface IResponseLogin {
    userName?: string
    nomeUsuario?: string
    email?: string
    token?: string
    entidade?: IEntidadeLogin
    menu?: ImenuLogin[]
    isMobilidade?: boolean
    loggeDate?: Date
}

interface IEntidadeLogin {
    id: number
    descricao: string
}

interface ImenuLogin {
    id: string
    nome: string
    online: boolean
    path: string
}

export interface IRequestLogin {
    username?: string
    password?: string
}

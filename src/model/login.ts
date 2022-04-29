export interface IResponseLogin {
    userName: string | null
    nomeUsuario: string | null
    entidade: IEntidadeLogin | null
    email: string | null
    token: string | null
    menu: ImenuLogin[] | null
    isMobilidade?: boolean
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
    email?: string
}

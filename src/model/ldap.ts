export interface LdapRequest {
    arg0: string;
    arg1: string;
    arg2: string;
    arg3: number;
    arg4: number;
    arg5: string;
    arg6: string;
  }

export interface LdapAutentica1Response {
    errorMessage: string;
    forca: string;

    
    idunidpolicial: string;
    idutilizador: string;
    matricula: string;
    nome: string;
    password: string;
    posto: string;
    resultado: boolean;
    versaoActualizada: boolean;
  }

  export interface LdapAutentica3Response {
    errorMessage: string;
    forca: string;
    idunidpolicial: string;
    idutilizador: string;
    matricula: string;
    nome: string;
    password: string;
    posto: string;
    resultado: boolean;
    versaoActualizada: boolean;
    idTerminal: number;
  }

  export interface LdapAutentica4Response {
    errorMessage: string;
    forca: string;
    idunidpolicial: string;
    idutilizador: string;
    matricula: string;
    nome: string;
    password: string;
    posto: string;
    resultado: boolean;
    versaoActualizada: boolean;
    idTerminal: number;
    grupos: Grupo[];
    listaPermissoes: Grupo[];
  }
  
  export interface Grupo {
  }

  
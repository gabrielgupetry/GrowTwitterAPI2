export interface CadastrarUsuarioDto {
    nome: string;
    email: string;
    userName: string;
    senha: string;
}

export interface ListarUsuarioDto {
    nome?: string;
}

export type AtualizarUsuarioDto = Partial<CadastrarUsuarioDto> & { id: number };
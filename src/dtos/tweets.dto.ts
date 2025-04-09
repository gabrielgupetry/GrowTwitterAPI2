export interface CadastrarTweetDto {
    conteudo?: string;
    tipo: "tweet" | "retweet";
    usuarioId: number;
}

export interface ListarTweetDto {
    tipo?: "tweet" | "retweet";
}

export type AtualizarTweetDto = Partial<CadastrarTweetDto> & { id: number };
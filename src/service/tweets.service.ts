import { Tweet } from "@prisma/client";
import { prismaClient } from "../database/prisma.client";
import { CadastrarTweetDto, ListarTweetDto, AtualizarTweetDto } from "../dtos/tweets.dto"
import { HTTPError } from "../utils/http.error";
import { error } from "console";

type tweetParcial = Omit<Tweet, " ">;

export class TweetService {
    
    public async cadastrar({
        conteudo,
        tipo,
        usuarioId,
    }: CadastrarTweetDto): Promise<tweetParcial> {
        const novoTweet = await prismaClient.tweet.create({
            data: {
                conteudo,
                tipo,
                usuarioId,
            },
        });

        return novoTweet;
    }

    public async listar({ tipo }: ListarTweetDto): Promise<tweetParcial[]> {
        const tweets = await prismaClient.tweet.findMany({
            where: {
                tipo,
            },
            include: {
                usuario: true,
            },
        });

        return tweets;
    }

    public async listarPorId(id: number): Promise<tweetParcial> {
        const tweet = await prismaClient.tweet.findUnique({
            where: { id },
            include: {
                usuario: true,
            },
        });

        if (!tweet) {
            throw new HTTPError(404, "Tweet não encontrado.")
        }

        return tweet;
    }

    public async atualizar({
        id,
        conteudo,
        tipo,
    }: AtualizarTweetDto): Promise<tweetParcial> {
        const tweetAtualizado = await prismaClient.tweet.update({
            where: { id },
            data: {
                conteudo,
                tipo,
            },
        });

        return tweetAtualizado;
    }

    public async excluir(id: number): Promise<tweetParcial> {
        const tweetExcluido = await prismaClient.tweet.delete({
            where: { id },
        });

        return tweetExcluido;
    }
}
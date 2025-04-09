import { prismaClient } from "../database/prisma.client";
import { toggleRetweetDto } from "../dtos/retweet.dto";

export class RetweetService {

    public async toggleRetweet({
        usuarioId,
        tweetId,
    }: toggleRetweetDto): Promise<string> {
        const retweetFeito = await prismaClient.retweet.findUnique({
            where : {
                usuarioId_tweetId: {
                    usuarioId,
                    tweetId,
                },
            },
        });

        if (retweetFeito) {
            await prismaClient.retweet.delete({
                where: {
                    usuarioId_tweetId: {
                        usuarioId,
                        tweetId,
                    },
                },
            });
            
            return "Retweet desfeito.";
        }

        await prismaClient.retweet.create({
            data: {
                usuarioId,
                tweetId,
            },
        });

        return "Retweet realizado."
    }
}
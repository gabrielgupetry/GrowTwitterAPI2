import { prismaClient } from "../database/prisma.client";
import { toggleLikeDto } from "../dtos/likes.dto";

export class LikesService {

    public async toggleLike({ usuarioId, tweetId }: toggleLikeDto): Promise<string> {
        const likeExistente = await prismaClient.like.findUnique({
            where: {
                usuarioId_tweetId: {
                    usuarioId,
                    tweetId,
                },
            },
        });

        if (likeExistente) {
            await prismaClient.like.delete({
                where: {
                    usuarioId_tweetId: {
                        usuarioId,
                        tweetId,
                    },
                },
            });

            return "Deslike.";
        }

        await prismaClient.like.create({
            data: {
                usuarioId,
                tweetId,
            },
        });

        return "Like."
    }
}
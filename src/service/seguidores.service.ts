import { threadId } from "worker_threads";
import { prismaClient } from "../database/prisma.client";
import { toggleSeguidoresDto } from "../dtos/seguidores.dto";
import { HTTPError } from "../utils/http.error";

export class SeguidoresService {

    public async toggleSeguidores({
        usuarioId,
        seguidorId,
    }: toggleSeguidoresDto): Promise<string> {
        if (usuarioId === seguidorId) {
            throw new HTTPError(409, "Bloqueado de se seguir.");
        }
        const seguindoUsuario = await prismaClient.seguidor.findUnique({
            where: {
                usuarioId_seguidorId: {
                    usuarioId,
                    seguidorId,
                },
            },
        });

        if (seguindoUsuario) {
            await prismaClient.seguidor.delete({
                where: {
                    usuarioId_seguidorId: {
                        usuarioId,
                        seguidorId,
                    },
                },
            });

            return "Deixou de seguir.";
        }

        await prismaClient.seguidor.create({
            data: {
                usuarioId,
                seguidorId
            },
        });

        return "Seguindo."
    }
}
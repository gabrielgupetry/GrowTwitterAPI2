import { prismaClient } from "../database/prisma.client";
import { authTokenDto } from "../dtos/authtoken.dto";
import { v4 as uuid } from "uuid";
import { HTTPError } from "../utils/http.error";

export class AuthtokenService {

    public async loginUsuario({ email, senha }: authTokenDto): Promise<string> {
        const usuarioEncontrado = await prismaClient.usuario.findUnique({
            where: { email, senha },
        });

        if (!usuarioEncontrado) {
            throw new HTTPError(401, "Dados inválidos.");
        }

        const token = uuid();
        await prismaClient.usuario.update({
            where: {
                id: usuarioEncontrado.id
            },
            data: {
                authToken: token
            },
        });

        return token;
    }

    public async logoutUsuario(usuarioId: number): Promise<void> {
        await prismaClient.usuario.update({
            where: {
                id: usuarioId
            },
            data: {
                authToken: null
            },
        });
    }
}
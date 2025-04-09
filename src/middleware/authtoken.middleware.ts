import { NextFunction, Request, Response} from "express";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";
import { prismaClient } from "../database/prisma.client";
import { validate as isValidUuid } from "uuid";

export async function authtokenMiddleware(
    req: Request, res: Response, next: NextFunction
) {
    try {
        const bearerToken = req.headers.authorization;

        if (!bearerToken) {
            throw new HTTPError(401, "Token não autorizado.");
        }

        const [, token] = bearerToken.split(" ");

        if (!isValidUuid(token)) {
            throw new HTTPError(400, "Token com formato inválido.");
        }

        const usuarioEncontrado = await prismaClient.usuario.findFirst({
            where: { authToken: token },
        });
        if (!usuarioEncontrado) {
            throw new HTTPError(401, "Usuário não encontrado.");
        }

        req.usuarioLogado = {
            id: usuarioEncontrado.id,
            email: usuarioEncontrado.email,
            nome: usuarioEncontrado.nome,
        };
        next();
    } catch (error) {
        onError(error, res);
    }
}
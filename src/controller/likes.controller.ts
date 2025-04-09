import { Request, Response } from "express";
import { LikesService } from "../service/likes.service";
import { onError } from "../utils/on-error";

export class LikesController {

    public async toggle(req: Request, res: Response): Promise<void> {
        try {
            const usuarioId = req.usuarioLogado.id;
            const { tweetId } = req.body;

            const service = new LikesService();
            const resultado = await service.toggleLike({ usuarioId, tweetId });

            res.status(200).json({
                sucesso: true,
                mensagem: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }
}
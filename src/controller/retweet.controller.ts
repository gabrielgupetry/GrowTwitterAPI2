import { Request, Response } from "express";
import { RetweetService } from "../service/retweets.service";
import { onError } from "../utils/on-error";

export class RetweetController {

    public async toggle(req: Request, res: Response): Promise<void> {
        try {
            const usuarioId = req.usuarioLogado.id;
            const { tweetId } = req.body;

            const service = new RetweetService();
            const resultado = await service.toggleRetweet({ usuarioId, tweetId });

            res.status(200).json({
                sucesso: true,
                mensagem: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }
}
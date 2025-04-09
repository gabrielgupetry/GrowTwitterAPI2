import { Request, Response } from "express";
import { SeguidoresService } from "../service/seguidores.service";
import { onError } from "../utils/on-error";

export class SeguidoresController {

    public async toggle(req: Request, res: Response): Promise<void> {
        try {
            const usuarioId = req.usuarioLogado.id;
            const { usuarioId: seguidorId } = req.body;

            const service = new SeguidoresService();
            const resultado = await service.toggleSeguidores({
                usuarioId,
                seguidorId: Number(seguidorId),
            });

            res.status(200).json({
                sucesso: true,
                mensagem: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }
}
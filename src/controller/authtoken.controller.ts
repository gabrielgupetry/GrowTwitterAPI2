import { Request, Response } from "express";
import { AuthtokenService } from "../service/authtoken.service";
import { onError } from "../utils/on-error";

export class AuthtokenController {

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, senha } = req.body;

            const service = new AuthtokenService();
            const resultado = await service.loginUsuario({ email, senha });

            res.status(200).json({
                sucesso: true,
                mensagem: "Login de usuário.",
                dados: {
                    token: resultado,
                },
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async logout(req: Request, res: Response): Promise<void> {
        try {
            const service = new AuthtokenService();
            const resultado = await service.logoutUsuario(req.usuarioLogado.id);

            res.status(200).json({
                sucesso: true,
                mensagem: "Logout de usuário.",
            });
        } catch (error) {
            onError(error, res);
        }
    }
}
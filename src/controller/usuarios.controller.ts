import { Request, Response } from "express";
import { UsuariosService } from "../service/usuarios.service";
import { onError } from "../utils/on-error";

export class UsuariosController {
    
    public async listar(req: Request, res: Response): Promise<void> {
        try {
            const { nome } = req.query;

            const service = new UsuariosService();
            const resultado = await service.listar({
                nome: nome as string | undefined,
            });

            res.status(200).json({
                sucesso: true,
                mensagem: "Usuários listados.",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async listarPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const service = new UsuariosService();
            const resultado = await service.listarPorId(Number(id));

            res.status(200).json({
                sucesso: true,
                mensagem: "Usuário encontrado.",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async cadastrar(req: Request, res: Response): Promise<void> {
        try {
            const { nome, email, userName, senha } = req.body;

            const service = new UsuariosService();
            const resultado = await service.cadastrar({
                nome,
                email,
                userName,
                senha,
            });

            res.status(201).json({
                sucesso: true,
                mensagem: "Novo usuário cadastrado.",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async atualizarPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { nome, email, userName, senha } = req.body;

            const service = new UsuariosService();
            const resultado = await service.atualizar({
                id: Number(id),
                nome,
                email,
                userName,
                senha,
            });

            res.status(200).json({
                sucesso: true,
                mensagem: "Usuário atualizado.",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async excluir(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const service = new UsuariosService();
            const resultado = await service.excluir(Number(id));

            res.status(200).json({
                sucesso: true,
                mensagem: "Usuário excluido.",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }
}
import { Router } from "express";
import { UsuariosController } from "../controller/usuarios.controller";
import { authtokenMiddleware } from "../middleware/authtoken.middleware";

export class UsuariosRoutes {
    public static bind(): Router {
        const router = Router();
        const usuarioController = new UsuariosController();

        router.get("/usuarios", authtokenMiddleware, usuarioController.listar);
        router.get("/usuarios/:id", authtokenMiddleware, usuarioController.listarPorId);
        router.post("/usuarios", usuarioController.cadastrar);
        router.put("/usuarios/:id", authtokenMiddleware, usuarioController.atualizarPorId);
        router.delete("/usuarios/:id", authtokenMiddleware, usuarioController.excluir);

        return router;
    }
}
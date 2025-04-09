import { Router } from "express";
import { TweetsController } from "../controller/tweets.controller";
import { authtokenMiddleware } from "../middleware/authtoken.middleware";

export class TweetsRoutes {
    public static bind(): Router {
        const router = Router();
        const tweetController = new TweetsController();

        router.get("/tweets", authtokenMiddleware, tweetController.listar);
        router.get("/tweets/:id", authtokenMiddleware, tweetController.listarPorId);
        router.post("/tweets", authtokenMiddleware, tweetController.cadastrar);
        router.put("/tweets/:id", authtokenMiddleware, tweetController.atualizar);
        router.delete("/tweets/:id", authtokenMiddleware, tweetController.excluir);

        return router;
    }
}
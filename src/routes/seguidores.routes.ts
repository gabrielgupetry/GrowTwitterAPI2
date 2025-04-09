import { Router } from "express";
import { SeguidoresController } from "../controller/seguidores.controller";
import { authtokenMiddleware } from "../middleware/authtoken.middleware";

export class SeguidoresRoutes {
    
    public static bind(): Router {
        const router = Router();

        const seguidoresController = new SeguidoresController();

        router.patch("/seguidores", authtokenMiddleware, seguidoresController.toggle);

        return router;
    }
}
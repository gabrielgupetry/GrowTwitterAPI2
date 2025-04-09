import { Router } from "express";
import { LikesController } from "../controller/likes.controller";
import { authtokenMiddleware } from "../middleware/authtoken.middleware";

export class LikesRoutes {

    public static bind(): Router {
        const router = Router();
        const likesController = new LikesController();

        router.patch("/likes", authtokenMiddleware, likesController.toggle);

        return router;
    }
}
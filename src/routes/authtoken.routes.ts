import { Router } from "express";
import { AuthtokenController } from "../controller/authtoken.controller";
import { authtokenMiddleware } from "../middleware/authtoken.middleware";

export class AuthtokenRoutes {

    public static bind(): Router {
        const router = Router();
        const authtokenController = new AuthtokenController();

        router.post("/login", authtokenController.login);
        router.post("/logout", authtokenMiddleware, authtokenController.logout);

        return router;
    }
}
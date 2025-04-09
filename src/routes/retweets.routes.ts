import { Router } from "express";
import { RetweetController } from "../controller/retweet.controller";
import { authtokenMiddleware } from "../middleware/authtoken.middleware";

export class RetweetsRoutes {

    public static bind(): Router {
        const router = Router();
        const retweetsController = new RetweetController();

        router.patch("/retweets", authtokenMiddleware, retweetsController.toggle);

        return router;
    }
}
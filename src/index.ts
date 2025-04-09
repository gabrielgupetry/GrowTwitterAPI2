import express from "express";
import { envs } from "./envs";
import { UsuariosRoutes } from "./routes/usuarios.routes";
import { TweetsRoutes } from "./routes/tweets.routes";
import { RetweetsRoutes } from "./routes/retweets.routes";
import { LikesRoutes } from "./routes/likes.routes";
import { SeguidoresRoutes } from "./routes/seguidores.routes";
import { AuthtokenRoutes } from "./routes/authtoken.routes";

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
    res.status(200).json({
        sucesso: true,
        mensagem: "API is running",
    });
});

app.use(UsuariosRoutes.bind());
app.use(TweetsRoutes.bind());
app.use(RetweetsRoutes.bind());
app.use(LikesRoutes.bind());
app.use(SeguidoresRoutes.bind());
app.use(AuthtokenRoutes.bind());


app.listen(envs.PORT, () => console.log("Server is running"));
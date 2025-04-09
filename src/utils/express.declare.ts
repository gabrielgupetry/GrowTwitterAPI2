declare namespace Express {
    interface Request {
        usuarioLogado: {
            id: number;
            nome: string;
            email: string;
        };
    }
}
import { Usuario } from "@prisma/client";
import { prismaClient } from "../database/prisma.client";
import { AtualizarUsuarioDto, CadastrarUsuarioDto, ListarUsuarioDto } from "../dtos/usuarios.dto"
import { HTTPError } from "../utils/http.error";

type usuarioParcial = Omit<Usuario, "authToken" | "senha">;

export class UsuariosService {
    
    public async cadastrar({
        nome,
        email,
        userName,
        senha,
    }: CadastrarUsuarioDto): Promise<usuarioParcial> {
        const emailJaCadastrado = await prismaClient.usuario.findUnique({
            where: { email },
        });

        if (emailJaCadastrado) {
            throw new HTTPError(409, "E-mail já cadastrado.");
        }

        const novoUsuario = await prismaClient.usuario.create({
            data: {
                nome,
                email,
                userName,
                senha,
            },
            omit: {
                authToken: true,
                senha: true,
            },
        });

        return novoUsuario;
    }

    public async listar({ nome }: ListarUsuarioDto): Promise<usuarioParcial[]> {
        const usuarios = await prismaClient.usuario.findMany({
            where: {
                nome: {
                    contains: nome,
                    mode: "insensitive",
                },
            },
            omit: {
                authToken: true,
                senha: true,
            },
        });

        return usuarios;
    }

    public async listarPorId(id: number): Promise<usuarioParcial> {
        const usuario = await prismaClient.usuario.findUnique({
            where: { id },
            omit: {
                authToken: true,
                senha: true,
            },
        });

        if (!usuario) {
            throw new HTTPError(404, "Usuário não encontrado.");
        }

        return usuario;
    }

    public async atualizar({
        id,
        nome,
        email,
        userName,
        senha,
    }: AtualizarUsuarioDto): Promise<usuarioParcial> {
        await this.listarPorId(id);

        const usuarioAtualizado = await prismaClient.usuario.update({
            where: { id },
            data: {
                nome,
                email,
                userName,
                senha,
            },
            omit: {
                authToken: true,
                senha: true,
            },
        });

        return usuarioAtualizado;
    }

    public async excluir(id: number): Promise<usuarioParcial> {
        await this.listarPorId(id);

        const usuarioExcluido = await prismaClient.usuario.delete({
            where: { id },
            omit: {
                authToken: true,
                senha: true,
            },
        });

        return usuarioExcluido;
    }
}
const bcrypt = require('bcrypt');
const { prisma } = require('../services');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

async function buscarusuarios() {
    try {
        return await prisma.usuarios.findMany();
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
    // return await executarSQL("SELECT * FROM usuarios;");
}

async function buscarUmusuario(id) {
    try {
        return await prisma.usuarios.findFirst({
            where: {
                usuario_id: Number(id)
            }
        });
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}
async function criarUsuario(dados) {
    try {
        let senhaCriptografada = await bcrypt.hash(dados.usuario_senha, saltRounds);
        dados = { ...dados, usuario_senha: senhaCriptografada };
        return await prisma.usuarios.create({
            data: dados
        });
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function editarusuario(id, dados) {
    try {
        let senhaCriptografada = await bcrypt.hash(dados.usuario_senha, saltRounds);
        dados = { ...dados, usuario_senha: senhaCriptografada };
        return await prisma.usuarios.update({
            where: { usuario_id: Number(id) },
            data: dados
        })
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}



async function apagarusuario(id) {
    try {
        return await prisma.usuarios.delete({
            where: {
                usuario_id: Number(id)
            }
        });

    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function login(dados) {
    try {
        let usuario = await prisma.usuarios.findFirst({
            where: {
                usuario_email: dados.usuario_email
            }
        });
        if (usuario) {
            let senhaComparada = await bcrypt.compare(dados.usuario_senha, usuario.usuario_senha);
            if (senhaComparada) {
                let token = jwt.sign({ data: usuario.usuario_senha }, process.env.SEGREDO, {
                    expiresIn: '1h'
                });
                // Define o tempo de expiração do token
                return {
                    tipo: "sucess",
                    mensagem: "Usuario logado!",
                    token
                }
            }
        }
        return {
            tipo: "warning",
            mensagem: "usuario ou senha incorretos"
        }
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

module.exports = {
    buscarusuarios,
    buscarUmusuario,
    criarUsuario,
    apagarusuario,
    editarusuario,
    login
}



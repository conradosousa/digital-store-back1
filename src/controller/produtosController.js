const { executarSQL } = require("../services");
const { PrismaClient } = require("../generated/prisma")
const prisma = new PrismaClient();

async function buscarProdutos() {
    try {
        return await prisma.produtos.findMany();
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
    // return await executarSQL("SELECT * FROM produtos;");
}

async function buscarUmProduto(id) {
    try {
        return await prisma.produtos.findFirst({
            where: {
                produto_id: Number(id)
            }
        });
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}
async function criarProduto(dados) {
    try {
        return await prisma.produtos.create({
            data: dados
        });


    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function editarProduto(id, dados) {
    try {
        return await prisma.produtos.update({
            where: { produto_id: Number(id) },
            data: dados
        })
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}



async function apagarProduto(id) {
    try {
        return await prisma.produtos.delete({
            where: {
                produto_id: Number(id)
            }
        });

    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

module.exports = {
    buscarProdutos,
    buscarUmProduto,
    criarProduto,
    apagarProduto,
    editarProduto
}
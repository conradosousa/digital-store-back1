function rotaProtegida(req, res, next){
    if(!req.headers.authorization){
        res.send ({
            tipo: "warning",
            mensagem: "Não autorizado"
        });
    }
}

module.exports = {
    rotaProtegida
}
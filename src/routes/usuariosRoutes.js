const { criarusuario } = require("../controller/usuariosController");
const { executarSQL } = require("../services");

const router = require("express").Router();

router.get("/", async (req, res) => {
    res.send( await executarSQL("SELECT * FROM produtos;") );
});
router.get("/:id", (req, res) => {
    res.send(`Busca o usuario com o id: ${req.params.id}`);
});
router.post("/", async (req, res) => {
    res.send(await criarusuario(req.body));
});
router.put("/:id", (req, res) => {
    res.send(`Edita um usuario com o id: ${req.params.id}`);
});
router.delete("/:id", (req, res) => {
    res.send(`Apaga um usuario com o id: ${req.params.id}`);
});

module.exports = router;
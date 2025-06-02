const { criarUsuario, buscarusuarios, buscarUmusuario, editarusuario, apagarusuario } = require("../controller/usuariosController");


const router = require("express").Router();

router.get("/", async (req, res) => {
    res.send(await buscarusuarios());
});
router.get("/:id", async (req, res) => {
    res.send(await buscarUmusuario(req.params.id));
});
router.post("/", async (req, res) => {
    res.send(await criarUsuario(req.body));
});
router.put("/:id", async (req, res) => {
    res.send(await editarusuario(req.params.id, req.body));
});
router.delete("/:id", async (req, res) => {
    res.send(await apagarusuario(req.params.id));
});

module.exports = router;
var controller = require("../controllers/postagens.controller");
var express = require('express');
var router = express.Router();

router.get("/artigos", controller.artigos);

router.get("/postagem/:id", controller.postagem);

router.get("/postagens/:tipo/:limite", controller.postagens);

router.get("/paginacao/:tipo/:pagina", controller.postagensPagina);

module.exports = router;
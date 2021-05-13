var controller = require("../controllers/postagens.controller");
var express = require('express');
var router = express.Router();

router.get("/artigos", controller.artigos);

router.get("/postagem/:id", controller.postagem);

router.get("/postagens/:tipo", controller.postagens);

module.exports = router;
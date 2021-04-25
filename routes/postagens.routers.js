var controller = require("../controllers/postagens.controller");
var express = require('express');
var router = express.Router();

router.get("/postagem/:id", controller.postagem);
router.get("/artigos", controller.artigos);

module.exports = router;
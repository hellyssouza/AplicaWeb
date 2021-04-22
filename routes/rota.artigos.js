var controller = require("../controllers/artigos.controller");
var express = require('express');
var router = express.Router();

router.get("/artigos", controller.artigos);

module.exports = router;
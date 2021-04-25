var controller = require("../controllers/index.controller");
var express = require('express');
var router = express.Router();

router.get("/", controller.index);
router.get("/index", controller.index);
router.get("/index.html", controller.index);
router.get("/index.ejs", controller.index);

module.exports = router;

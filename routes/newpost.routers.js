var controller = require("../controllers/newpost.controller");
var express = require('express');
var router = express.Router();

router.get("/newpost", controller.newpost);

router.get("/newpost.html", controller.newpost);

router.get("/newpost.ejs", controller.newpost);

router.post("/novo", controller.novo);

module.exports = router;
var express = require("express");
var router = express.Router();
var conf = require("../conf").titles;

router.get("/", function(req, res, next) {
	res.render("catalogue", {title:conf.prefix+conf.catalogue});
});

module.exports = router;

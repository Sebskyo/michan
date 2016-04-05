var express = require("express");
var router = express.Router();
var conf = require("../conf");
var emotes = JSON.stringify(conf.emotes);
var conf = conf.titles;

router.get("/", function(req, res) {
	res.redirect("/catalogue");
});
router.get("/:id", function(req, res) {
	res.render("thread", {title:conf.prefix+conf.thread+" "+req.params.id, emotes:emotes});
});

module.exports = router;

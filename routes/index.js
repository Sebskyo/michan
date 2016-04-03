var express = require("express");
var router = express.Router();
var conf = require("../conf").titles;

var users = require("./users");
var catalogue = require("./catalogue");
var threads = require("./threads");

router.get("/", function(req, res) {
	res.render("index", {title:conf.main});
});
router.get("/faq", function(req, res) {
	res.render("faq", {title:conf.faq});
});

router.use("/users", users);
router.use("/catalogue", catalogue);
router.use("/thread", threads);

module.exports = router;

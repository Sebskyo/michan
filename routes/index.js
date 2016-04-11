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
router.get("/admin", function(req, res) {
	if(req.session.user_id == 1) res.render("admin");
	else res.redirect("/");
});

router.use("/users", users);
router.use("/catalogue", catalogue);
router.use("/thread", threads);

module.exports = router;

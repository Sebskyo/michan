var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res) {
	res.render("user/list");
});
router.get("/login", function(req, res) {
	if(req.session.user)
		res.redirect("/users");
	else
		res.render("user/login");
});
router.get("/signup", function(req, res) {
	if(req.session.user) res.redirect("/users");
	else res.render("user/new");
});1
router.get("/logout", function(req, res) {
	req.session.user = null;
	req.session.id = null;
	res.redirect("/users");
});

router.get("/:id", function(req, res) {
	res.status(501).send("501 bitch: haha dicks this aint done");
});

module.exports = router;

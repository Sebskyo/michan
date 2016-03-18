var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res) {
	res.render("user/list");
});
router.get("/profile/:id", function(req, res) {
	res.send("gets data about user");
});
router.get("/login", function(req, res) {
	if(req.session.user)
		res.redirect("/users");
	else
		res.render("user/login");
});
/*router.post("/login", function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var conn = require("../db");
	var hash = require("password-hash");
	conn.query("select password from users where username='"+username+"'", function(err, rows) {
		if(!err) {
			var stored = rows[0].password;
			var verified = hash.verify(password, stored);
			console.log(username+" "+password+" "+stored+" "+verified);
			if(verified) {
				req.session.user=username;
				console.log(req.session);
				console.log("it successededed");
				res.end("done");
			}
		}
		else console.log(err);
	});
});*/

router.get("/signup", function(req, res) {
	if(req.session.user) res.redirect("/users");
	else res.render("user/new");
});1

router.get("/logout", function(req, res) {
	req.session.user = null;
	res.redirect("/users");
});

module.exports = router;

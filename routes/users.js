var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res) {
	res.render("user/list");
});
router.get("/:id", function(req, res) {
	res.send("gets data about user");
});
router.post("/", function(req, res) {
	res.send("creates users");
});
router.put("/:id", function(req, res) {
	res.send("updates users");
})
router.delete("/:id", function(req,res) {
	res.send("deletes users");
})

/*router.get("/viewall", function(req, res, next) {
	var user = require("../models/user");
	user.readAll(function(err, rows) {
		if(!err) res.send(rows);
		else res.send("Error");
	});
});
router.get("/view", function(req, res, next) {
	var conn = require("../db");
	conn.query("select * from Users where Username=\"Sebskyo\"", function(err, rows) {
		if(!err) console.log(rows);
		else console.log("shit son");
	});
	res.send("will be implemented after user session");
})
router.get("/view/:username", function(req, res, next) {
	var user = require("../models/user");
	user.read({value: req.params.username, column: "username"}, function(err, rows) {
		if(!err) res.send(rows);
		else res.send("Error");
	})
});

router.delete("/delete", function(req, res, next) {
	// uses session to delete logged in user
});

router.get("/new", function(req, res, next) {
	res.render("user/new");
});
router.post("/new", function(req, res, next) {
	var user = require("../models/user");
	user.create({username: req.body.username, name: req.body.irlname}, function(err) {
		if(!err) res.redirect("/users/view");
		else res.send("failure");
	});
});

router.put("/edit", function(req, res, next) {
	var user = require("../models/user");
	user.update({column: req.body.column, value: req.body.value, updates: req.body.updates}, function(err) {
		if(!err) res.send("success");
		else res.send("error");
	});
});*/

module.exports = router;

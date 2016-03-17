var express = require("express");
var router = express.Router();
var model = require("../../models/user");

// GET all users (id, username, name)
router.get("/", function(req, res) {
	model.readAll(function(err, data) {
		if(!err) res.send(data);
		else res.send("err");
	});
});
// GET specific user data (id, username, name, # of posts, # of threads
router.get("/:id", function(req, res) {
	model.read(req.params.id, function(err, data) {
		if(!err) res.send(data);
		else res.send("err");
	});
});
// POST data to create a new user (username, name, password)
router.post("/", function(req, res) {
	model.create({username: req.body.username, name: req.body.name, password: req.body.password}, function(err, data) {
		if(!err) res.send(""+data+"");
		else res.send("err");
	})
});
// PUT new data into a specific user (username, name, password)
router.put("/:id", function(req, res) {
	model.update({id: req.params.id, username: req.body.username, name: req.body.name, password: req.body.password}, function(err) {
		if(!err) res.send("success!");
		else res.send("err");
	});
});
// DELETE a user
router.delete("/:id", function(req,res) {
	model.delete(req.params.id, function(err) {
		if(!err) res.send("success!");
		else res.send("err");
	});
});

module.exports = router;
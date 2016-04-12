var express = require("express");
var router = express.Router();
var model = require("../../models/user");

// GET all users
router.get("/", function (req, res) {
	model.readAll(function (err, data) {
		if (!err) res.send({you: req.session.user, data: data});
		else res.status(500).end("An error occurred");
	});
});
// GET specific user data including no. of posts
router.get("/:id", function (req, res) {
	model.read(req.params.id, function (err, data) {
		var session = req.session.user_id ? true : false;
		if (!err) {
			data.session = session;
			res.send(data);
		}
		else res.status(500).end("An error occurred");
	});
});

// POST data to create a new user (username, name, password)
router.post("/", function (req, res) {
	model.create({username: req.body.username, name: req.body.name, password: req.body.password}, function (err, data) {
		if (!err) res.send("" + data + "");
		else res.status(500).end("An error occurred");
	})
});
// POST data required to login, also set session data
router.post("/:user", function (req, res) {
	req.params.user = req.params.user.toLowerCase();
	model.getID(req.params.user, function (err, data) {
		if (!err)
			model.pwVerify({user: req.params.user, password: req.body.password}, function (err) {
				if (!err) {
					req.session.user = req.params.user;
					req.session.user_id = data;
					res.end("logged in");
				}
				else res.status(500).end("An error occurred");
			});
		else res.status(500).end("An error occurred");
	});
});

// There was not enough time to implement updating/deleting users

module.exports = router;

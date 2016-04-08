var express = require("express");
var router = express.Router();
var model = require("../../models/thread");

// GET a list of threads (id, last_active)
router.get("/", function(req, res) {
	model.readAll(function(err, data) {
		if(!err) res.send(data);
		else res.status(500).end("An error occurred");
	});
});
router.get("/:id", function(req, res) {
	model.read(req.params.id, function(err, data) {
		if(!err) res.send(data);
		else res.status(500).end("An error occurred");
	});
});
// POST data to create a new thread
router.post("/", function(req, res) {
	model.create(function(err, data) {
		if(!err) res.send(""+data+"");
		else res.status(500).end("An error occurred");
	});
});

module.exports = router;

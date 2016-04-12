var express = require("express");
var router = express.Router();
var model = require("../../models/thread");

// GET a list of threads
router.get("/", function(req, res) {
	model.readAll(function(err, data) {
		if(!err) res.send(data);
		else res.status(500).end("An error occurred");
	});
});
// GET all posts with specified id
router.get("/:id", function(req, res) {
	model.read(req.params.id, function(err, data) {
		if(!err) res.send(data);
		else res.status(500).end("An error occurred");
	});
});

// DELETE a thread and its posts
router.delete("/:id", function(req, res) {
	if(req.session.user_id == 1) {
		model.delete(req.params.id, function(err) {
			if(!err) res.end("Success");
			else res.status(500).end("An error occurred");
		});
	}
	else res.status(403).end("Forbidden");
});

module.exports = router;

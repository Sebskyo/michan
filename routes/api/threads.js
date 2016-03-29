var express = require("express");
var router = express.Router();
var model = require("../../models/thread");
var multer = require("multer");

// GET a list of threads (id, last_active)
router.get("/", function(req, res) {
	model.readAll(function(err, data) {
		if(!err) res.send(data);
		else res.send(err);
	});
});
// GET specific information about a thread (id, last_active, subject, image, # of replies, # of image replies)
router.get("/:id", function(req, res) {
	model.read(req.params.id, function(err, data) {
		if(!err) res.send(data);
		else res.send(err);
	});
});
// POST data to create a new thread
router.post("/", function(req, res) {
	model.create(function(err, data) {
		if(!err) res.send(""+data+"");
		else res.send(err);
	});
});
// DELETE a thread (id)
router.delete("/:id", function(req, res) {
	model.delete(req.params.id, function(err) {
		if(!err) res.send("Thread deleted");
		else res.send("err");
	})
});

module.exports = router;
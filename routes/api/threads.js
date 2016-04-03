var express = require("express");
var router = express.Router();
var model = require("../../models/thread");

// GET a list of threads (id, last_active)
router.get("/", function(req, res) {
	model.read(function(err, data) {
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

module.exports = router;

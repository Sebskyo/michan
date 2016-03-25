var express = require("express");
var router = express.Router();
var model = require("../../models/post");

// GET all posts
router.get("/", function(req, res) {
	model.read(function(err, data) {
		if(!err) res.send(data);
		else res.send(err);
	})
});
// GET all posts matching the given thread id
router.get("/:thread_id", function(req, res) {
	model.readThread(req.params.thread_id, function(err, data) {
		if(!err) res.send(data);
		else res.send(err);
	})
});
// POST data to create a new post linked to a thread (thread_id, user_id, subject, content, )
router.post("/", function(req, res) {
	var data = {
		"thread_id":req.body.thread_id,
		"user_id":req.session.id,
		"subject":req.body.subject,
		"content":req.body.content.trim(),
		"image":null,
		"anon":req.body.anon,
		"date":"'"+new Date().toISOString().slice(0, 19).replace("T", " ")+"'"
	};
	data.subject = data.subject == "" ? null : data.subject;
	data.thread_id = data.thread_id == undefined || "" ? null : data.thread_id;
	data.anon = data.anon == "true" ? 1 : 0;

	model.create(data, function(err, data) {
		if(!err) res.send(""+data+"");
		else res.send(""+err+"");
	});
});

module.exports = router;

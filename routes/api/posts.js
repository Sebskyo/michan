var express = require("express");
var router = express.Router();
var model = require("../../models/post");
var multer = require("multer");
// Define storage of images
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "./public/images");
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + "." + file.mimetype.replace("image/", ""));
	}
});
var upload = multer({
	storage: storage,
	// Define limits of images
	limits:{fileSize:5243000, files:1},
	fileFilter:function(req, file, cb) {
		if(file.mimetype.startsWith("image/")) cb(null, true);
		else cb(null, false);
	}
});

// GET all posts
router.get("/", function(req, res) {
	model.readAll(function(err, data) {
		if(!err) res.send(data);
		else res.status(500).end("An error occurred");
	})
});
// GET specific post
router.get("/:id", function(req, res) {
	model.read(req.params.id, function(err, data) {
		if(!err) res.send(data);
		else res.status(500).end("An error occurred");
	});
});

// POST data to create a new post, model handles creation of thread if no thread id is given
router.post("/", upload.single("image"), function(req, res) {
	if(req.session.user_id) {
		var data = {
			"thread_id":req.body.thread_id,
			"user_id":req.session.user_id,
			"subject":req.body.subject,
			"content":req.body.content.trim().replace(/\n+/g, "\n"),
			"image":null,
			"anon":req.body.anon
		};
		if(data.content != "") {
			data.thread_id = data.thread_id == undefined || "" ? null : data.thread_id;
			data.subject = data.subject == "" ? null : data.subject;
			data.image = req.file == undefined ? null : req.file.filename;
			data.anon = data.anon == "true" ? 1 : 0;

			if(!(data.thread_id == null && data.image == null))
				model.create(data, function(err, data) {
					if(!err) res.send(""+data+"");
					else res.send(""+err+"");
				});
			else res.status(400).end("You cannot create a new thread without an image");
		}
		else {
			res.status(400).end("No content");
		}
	}
	else {
		res.status(400).end("Not logged in");
	}
});

// DELETE a post
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

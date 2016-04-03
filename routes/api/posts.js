var express = require("express");
var router = express.Router();
var model = require("../../models/post");
var multer = require("multer");
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "./public/images");
	},
	filename: function(req, file, cb) {
		cb(null, Math.floor(Date.now()/1000) + "." + file.mimetype.replace("image/", ""));
	}
});
var upload = multer({storage: storage});

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
router.post("/", upload.single("image"), function(req, res) {
	if(req.session.id) {
		var data = {
			"thread_id":req.body.thread_id,
			"user_id":req.session.id,
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

			model.create(data, function(err, data) {
				if(!err) res.send(""+data+"");
				else res.send(""+err+"");
			});
		}
		else {
			res.status(400).end("No content");
		}
	}
	else {
		res.status(400).end("Not logged in");
	}
});

module.exports = router;

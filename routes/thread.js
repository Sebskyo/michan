var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
	res.render("thread", {content: ["test", "lol"]});
});

router.post("/post", function(req, res, next) {
	res.send("post request made");
});

module.exports = router;
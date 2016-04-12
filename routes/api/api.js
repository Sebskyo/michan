var express = require("express");
var router = express.Router();

var users = require("./users");
var threads = require("./threads");
var posts = require("./posts");

router.get("/", function(req, res) {
	res.send("API root");
});

router.use("/users", users);
router.use("/threads", threads);
router.use("/posts", posts);

module.exports = router;

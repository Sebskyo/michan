var express = require("express");
var router = express.Router();

var users = require("./users");
var catalogue = require("./catalogue");
var threads = require("./threads");

router.get("/", function(req, res, next) {
	res.render("index", { title: "Express" });
});

router.use("/users", users);
router.use("/catalogue", catalogue);
router.use("/thread", threads);

module.exports = router;

var express = require("express");
var router = express.Router();
var conf = require("../conf").titles;

var users = require("./users");
var catalogue = require("./catalogue");
var threads = require("./threads");

router.get("/", function(req, res, next) {
	res.render("index", {title:conf.main});
});

router.use("/users", users);
router.use("/catalogue", catalogue);
router.use("/thread", threads);

module.exports = router;

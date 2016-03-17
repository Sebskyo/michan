var express = require("express");
var router = express.Router();

var users = require("./users");

router.get("/", function(req, res, next) {
	res.render("index", { title: "Express" });
});

router.use("/users", users);

module.exports = router;

var express = require("express");
var router = express.Router();

var users = require("./users");
var catalogue = require("./catalogue");

router.get("/", function(req, res, next) {
	res.render("index", { title: "Express" });
});

router.use("/users", users);
router.use("/catalogue", catalogue);

module.exports = router;

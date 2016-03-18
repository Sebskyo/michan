var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
	res.redirect("/catalogue");
});
router.get("/:id", function(req, res) {
	res.render("thread");
});

module.exports = router;
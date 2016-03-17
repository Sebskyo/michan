var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
	res.render("catalogue", {content: ["test", "lol"]});
});

module.exports = router;